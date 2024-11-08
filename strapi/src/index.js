"use strict";

const CryptoJS = require("crypto-js");
const admin = require("../config/admin");
const iyzico = require("../utils/iyzico");
const emailSender = require("../utils/email");
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["api::purchase.purchase"],
      populate: {
        user: true,
        user_baskets: true,
        admin_check: true,
        tickets: true,
        billing_information: true,
        createdBy: true,
        updatedBy: true,
      },
      afterCreate: async (entry) => {
        let data = entry.params.data;
        // console.log("USER: ", data.user);
        let user = null;
        if (data.user.connect) {
          user = data.user.connect[0].id;
        } else {
          user = data.user;
        }
        let purchase = {
          id: entry.result.id,
          user: user,
          user_baskets: data.user_baskets,
          date: data.date,
          admin_check: data.admin_check,
          tickets: data.tickets,
          code: data.code,
          status: data.status,
          for_personal_invoice: data.for_personal_invoice,
          billing_information: data.billing_information
            ? data.billing_information
            : null,
          payment_method: data.payment_method,
        };
        // // console.log(entry);
        // console.log("purchase : ", purchase);
        let basket = await strapi
          .service("api::user-basket.user-basket")
          .findAll({
            filters: {
              id: purchase.user_baskets,
            },
            populate: {
              ticket_type: true,
              ticket_price: true,
              user: true,
            },
            // where: {
            // id: purchase.user_baskets.connect[0].id,
            // },
          });
        // console.log("BASKET: ", basket);
        let ticket_number = basket.results
          .map((basket_item) => basket_item.count)
          .reduce((partialSum, a) => partialSum + a, 0);
        let new_purchase_count = purchase.id.toString().padStart(3, "0");
        let new_purchase_code =
          "2025-" + new_purchase_count + "-" + ticket_number;
        let created_tickets = [];
        let ticket_counter = 0;
        let price = 0;
        for (let i = 0; i < basket.results.length; i++) {
          // console.log("İ : ", i);
          let curr_basket = basket.results[i];
          let curr_ticket_type = curr_basket.ticket_type;
          let curr_ticket_price = curr_basket.ticket_price;
          for (let j = 0; j < curr_basket.count; j++) {
            ticket_counter++;
          }
          price += curr_ticket_price.price * curr_basket.count;
        }
        // strapi.PurchaseEntity
        // console.log("created_tickets: ", created_tickets);
        let nowDate = new Date();
        let iyzico_init_res = null;
        let iyzico_x_iyzi_rnd = null;
        let iyzico_authorization = null;
        if (purchase.payment_method == "credit-card") {
          let conversationId = purchase.id.toString().padStart(9, "0");
          iyzico_x_iyzi_rnd = Math.floor(Math.random() * 1000000000).toString();
          // console.log("PRICE: ", price.toFixed(1).toString());
          iyzico_init_res = await iyzico.initialize_checkout(
            iyzico_x_iyzi_rnd,
            conversationId,
            price.toFixed(1).toString()
          );
          iyzico_authorization = iyzico_init_res.authorization;
          iyzico_init_res = iyzico_init_res.response;
          if (
            iyzico_init_res.token == undefined ||
            iyzico_init_res.token == null
          ) {
            iyzico_init_res = null;
            iyzico_x_iyzi_rnd = null;
            iyzico_authorization = null;
          }
          console.log("RES: ", iyzico_init_res);
          await strapi.service("api::purchase.purchase").update(purchase.id, {
            data: {
              code: new_purchase_code,
              tickets: [],
              iyzico_init_res: iyzico_init_res,
              payment_progress: "in-progress",
              iyzico_x_iyzi_rnd: iyzico_x_iyzi_rnd,
              iyzico_authorization: iyzico_authorization,
              // published_at: nowDate.toLocaleString("th-TH", { timeZone: "UTC" }),
              // date: nowDate.toLocaleString("th-TH", { timeZone: "UTC" }),
            },
          });
          return;
        } else if (purchase.payment_method == "bank-transfer") {
          ticket_counter = 0;
          for (let i = 0; i < basket.results.length; i++) {
            // console.log("İ : ", i);
            let curr_basket = basket.results[i];
            let curr_ticket_type = curr_basket.ticket_type;
            let curr_ticket_price = curr_basket.ticket_price;
            for (let j = 0; j < curr_basket.count; j++) {
              // console.log("J : ", j);
              // console.log("COUNTER: ", ticket_counter);
              ticket_counter++;
              let curr_ticket = await strapi
                .service("api::ticket.ticket")
                .create({
                  data: {
                    purchase: purchase.id,
                    code:
                      new_purchase_code +
                      "-" +
                      ticket_counter.toString().padStart(2, "0"),
                    ticket_type: curr_ticket_type,
                    owner: user,
                    status: "waiting",
                  },
                });
              created_tickets.push(curr_ticket.id);
            }
            await strapi
              .service("api::user-basket.user-basket")
              .update(curr_basket.id, {
                data: {
                  active: false,
                },
              });
          }
          await emailSender.send_email(
            ticket_counter + " Adet Banka Transferiyle Bilet Satın Alındı",
            "Biletleri onaylamak için Bizzly Admin sayfasına giriş yapınız."
          );
          await strapi.service("api::purchase.purchase").update(purchase.id, {
            data: {
              code: new_purchase_code,
              tickets: created_tickets,
              payment_progress: "in-progress",
              // published_at: nowDate.toLocaleString("th-TH", { timeZone: "UTC" }),
              // date: nowDate.toLocaleString("th-TH", { timeZone: "UTC" }),
            },
          });
        }
      },
    });
    strapi.db.lifecycles.subscribe({
      models: ["api::ticket.ticket"],
      beforeUpdate: async (entry) => {
        console.log("TICKET UPDATED: ", entry);
        console.log(entry.params.data.purchase.connect);
        let prev_ticket = await strapi
          .service("api::ticket.ticket")
          .findOne(entry.params.where.id, { populate: "*" });
        console.log("PREV TICKET: ", prev_ticket);

        let description = "";

        if (entry.params.data.code) {
          if (entry.params.data.code !== prev_ticket.code) {
            description += "code\n";
            description +=
              "\t" + prev_ticket.code + " -> " + entry.params.data.code + "\n";
          }
        }

        if (entry.params.data.status) {
          if (entry.params.data.status !== prev_ticket.status) {
            description += "status\n";
            description +=
              "\t" +
              prev_ticket.status +
              " -> " +
              entry.params.data.status +
              "\n";
          }
        }

        if (entry.params.data.purchase) {
          if (entry.params.data.purchase.connect) {
            if (
              entry.params.data.purchase.connect[0].id !==
              prev_ticket.purchase.id
            ) {
              description += "purchase\n";
              description +=
                "\t" +
                prev_ticket.purchase.id +
                " -> " +
                entry.params.data.purchase.connect[0].id +
                "\n";
            }
          } else {
            if (entry.params.data.purchase !== prev_ticket.purchase.id) {
              description += "purchase\n";
              description +=
                "\t" +
                prev_ticket.purchase.id +
                " -> " +
                entry.params.data.purchase +
                "\n";
            }
          }
        }

        if (entry.params.data.ticket_type) {
          if (entry.params.data.ticket_type.connect) {
            if (
              entry.params.data.ticket_type.connect[0].id !==
              prev_ticket.ticket_type.id
            ) {
              description += "ticket_type\n";
              description +=
                "\t" +
                prev_ticket.ticket_type.id +
                " -> " +
                entry.params.data.ticket_type.connect[0].id +
                "\n";
            }
          } else {
            if (entry.params.data.ticket_type !== prev_ticket.ticket_type.id) {
              description += "ticket_type\n";
              description +=
                "\t" +
                prev_ticket.ticket_type.id +
                " -> " +
                entry.params.data.ticket_type +
                "\n";
            }
          }
        }

        if (entry.params.data.owner) {
          if (entry.params.data.owner.connect) {
            if (
              entry.params.data.owner.connect[0].id !== prev_ticket.owner.id
            ) {
              description += "owner\n";
              description +=
                "\t" +
                prev_ticket.owner.id +
                " -> " +
                entry.params.data.owner.connect[0].id +
                "\n";
            }
          } else {
            if (entry.params.data.owner !== prev_ticket.owner.id) {
              description += "owner\n";
              description +=
                "\t" +
                prev_ticket.owner.id +
                " -> " +
                entry.params.data.owner +
                "\n";
            }
          }
        }

        if (entry.params.data.redemption_user) {
          if (entry.params.data.redemption_user.connect) {
            if (
              entry.params.data.redemption_user.connect[0].id !==
              prev_ticket.redemption_user.id
            ) {
              description += "redemption_user\n";
              description +=
                "\t" +
                prev_ticket.redemption_user.id +
                " -> " +
                entry.params.data.redemption_user.connect[0].id +
                "\n";
            }
          } else {
            if (
              entry.params.data.redemption_user !==
              prev_ticket.redemption_user.id
            ) {
              description += "redemption_user\n";
              description +=
                "\t" +
                prev_ticket.redemption_user.id +
                " -> " +
                entry.params.data.redemption_user +
                "\n";
            }
          }
        }

        let new_ticket_history = await strapi
          .service("api::ticket-history.ticket-history")
          .create({
            data: {
              purchase:
                prev_ticket.purchase == null ? null : prev_ticket.purchase.id,
              code: prev_ticket.code == null ? null : prev_ticket.code,
              ticket_type:
                prev_ticket.ticket_type == null
                  ? null
                  : prev_ticket.ticket_type.id,
              owner: prev_ticket.owner == null ? null : prev_ticket.owner.id,
              redemption_user:
                prev_ticket.redemption_user == null
                  ? null
                  : prev_ticket.redemption_user.id,
              status: prev_ticket.status == null ? null : prev_ticket.status,
              date: new Date(),
              description: description,
            },
          });

        console.log("new_ticket_history: ", new_ticket_history);
      },
    });
  },
};
