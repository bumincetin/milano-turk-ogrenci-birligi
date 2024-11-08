const iyzico = require("../utils/iyzico");

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  myJob: {
    task: async ({ strapi }) => {
      // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).

      // En son oluşturulan "credit card" ödeme yöntemine sahip satın almayı almak için sorgu
      const purchases = await strapi.db
        .query("api::purchase.purchase")
        .findMany({
          where: {
            payment_progress: "in-progress",
            payment_method: "credit-card", // Ödeme yöntemi "credit-card" olan
          },
          sort: { date: "desc" },
          select: "*",
          populate: {
            tickets: true,
            user_baskets: true,
            user: true,
          },
        });

      for (let i = 0; i < purchases.length; i++) {
        const purchase = purchases[i];

        if (purchase.iyzico_init_res) {
          let curr_iyzico_init_res = purchase.iyzico_init_res;

          const payment = await iyzico.retrieve_payment(
            purchase.iyzico_authorization,
            purchase.iyzico_x_iyzi_rnd,
            curr_iyzico_init_res.token,
            curr_iyzico_init_res.conversationId
          );

          if (payment.paymentStatus == "SUCCESS") {
            let basket = await strapi
              .service("api::user-basket.user-basket")
              .findAll({
                filters: {
                  id: purchase.user_baskets.map((a) => a.id),
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
              let curr_basket = basket.results[i];
              let curr_ticket_type = curr_basket.ticket_type;
              let curr_ticket_price = curr_basket.ticket_price;
              for (let j = 0; j < curr_basket.count; j++) {
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
                      owner: purchase.user.id,
                      status: "done",
                    },
                  });

                created_tickets.push(curr_ticket);
              }
              await strapi
                .service("api::user-basket.user-basket")
                .update(curr_basket.id, {
                  data: {
                    active: false,
                  },
                });
              price += curr_ticket_price.price * curr_basket.count;
            }

            await strapi.service("api::purchase.purchase").update(purchase.id, {
              data: {
                tickets: created_tickets,
                status: "paid",
                payment_progress: "done",
                // published_at: nowDate.toLocaleString("th-TH", { timeZone: "UTC" }),
                // date: nowDate.toLocaleString("th-TH", { timeZone: "UTC" }),
              },
            });
          }

          console.log(purchase);

          const oneHourInMilliseconds = 1000 * 60 * 60; // 1 saat

          if (
            new Date(purchase.createdAt) <
            new Date(Date.now() - oneHourInMilliseconds)
          ) {
            await strapi.service("api::purchase.purchase").update(purchase.id, {
              data: {
                status: "canceled",
                payment_progress: "canceled",
              },
            });
          }
        }
      }
    },
    options: {
      rule: process.env.PURCHASE_CRON_TIMER || "*/5 * * * * *",
    },
  },
};
