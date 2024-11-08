const CryptoJS = require("crypto-js");

async function initialize_checkout(x_iyzi_rnd, conversationId, price) {
  return await new Promise((resolve, reject) => {
    var apiKey = process.env.IYZICO_API_KEY;
    var secretKey = process.env.IYZICO_SECRET_KEY;

    var requestBody = {
      locale: "tr",
      conversationId: conversationId,
      price: price,
      basketId: "B67832",
      paymentGroup: "PRODUCT",
      buyer: {
        id: "BY789",
        name: "John",
        surname: "Doe",
        identityNumber: "74300864791",
        email: "email@email.com",
        gsmNumber: "+905350000000",
        registrationDate: "2013-04-21 15:12:09",
        lastLoginDate: "2015-10-05 12:43:35",
        registrationAddress:
          "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34732",
        ip: "85.34.78.112",
      },
      shippingAddress: {
        address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34742",
        contactName: "Jane Doe",
        city: "Istanbul",
        country: "Turkey",
      },
      billingAddress: {
        address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34742",
        contactName: "Jane Doe",
        city: "Istanbul",
        country: "Turkey",
      },
      basketItems: [
        {
          id: "BI101",
          price: price,
          name: "Binocular",
          category1: "Collectibles",
          category2: "Accessories",
          itemType: "PHYSICAL",
        },
      ],
      enabledInstallments: [1, 2, 3, 6, 9],
      callbackUrl: "https://irec.ist/",
      currency: "USD",
      paidPrice: price,
    };

    function nullClear(obj) {
      for (var member in obj) {
        if (obj[member] === null) {
          delete obj[member];
        } else if (typeof obj[member] === "object") {
          obj[member] = nullClear(obj[member]);
          if (Object.keys(obj[member]).length === 0) {
            delete obj[member];
          }
        }
      }

      return obj;
    }

    function BasketItem() {
      this.id = null;
      this.price = null;
      this.name = null;
      this.category1 = null;
      this.category2 = null;
      (this.itemType = null), (this.subMerchantKey = null);
      this.subMerchantPrice = null;
    }

    //Set json string to model
    function jsonToObj(jsonString, obj) {
      var parsedJsonString = JSON.parse(jsonString);
      for (var key in parsedJsonString) {
        if (parsedJsonString.hasOwnProperty(key)) {
          if (typeof parsedJsonString[key] === "object") {
            if (Array.isArray(parsedJsonString[key])) {
              for (var i = 0; i < parsedJsonString[key].length; i++) {
                if (key == "basketItems") {
                  obj[key].push(new BasketItem());
                  obj[key][i] = jsonToObj(
                    JSON.stringify(parsedJsonString[key][i]),
                    obj[key][i]
                  );
                } else {
                  obj[key][i] = parsedJsonString[key][i];
                }
              }
            } else {
              obj[key] = jsonToObj(
                JSON.stringify(parsedJsonString[key]),
                obj[key]
              );
            }
          } else {
            obj[key] = parsedJsonString[key];
          }
        }
      }
      obj = nullClear(obj);

      return obj;
    }

    //generate pki string of object
    function generateRequestString(obj) {
      var requestString = "[";

      // Belirli sıraya göre alanları manuel olarak ekliyoruz
      requestString += "locale=" + obj.locale + ",";
      requestString += "conversationId=" + obj.conversationId + ",";
      requestString += "price=" + obj.price + ",";
      requestString += "basketId=" + obj.basketId + ",";
      requestString += "paymentGroup=" + obj.paymentGroup + ",";

      // buyer alanı
      requestString += "buyer=[";
      requestString += "id=" + obj.buyer.id + ",";
      requestString += "name=" + obj.buyer.name + ",";
      requestString += "surname=" + obj.buyer.surname + ",";
      requestString += "identityNumber=" + obj.buyer.identityNumber + ",";
      requestString += "email=" + obj.buyer.email + ",";
      requestString += "gsmNumber=" + obj.buyer.gsmNumber + ",";
      requestString += "registrationDate=" + obj.buyer.registrationDate + ",";
      requestString += "lastLoginDate=" + obj.buyer.lastLoginDate + ",";
      requestString +=
        "registrationAddress=" + obj.buyer.registrationAddress + ",";
      requestString += "city=" + obj.buyer.city + ",";
      requestString += "country=" + obj.buyer.country + ",";
      requestString += "zipCode=" + obj.buyer.zipCode + ",";
      requestString += "ip=" + obj.buyer.ip;
      requestString += "],";

      // shippingAddress alanı
      requestString += "shippingAddress=[";
      requestString += "address=" + obj.shippingAddress.address + ",";
      requestString += "zipCode=" + obj.shippingAddress.zipCode + ",";
      requestString += "contactName=" + obj.shippingAddress.contactName + ",";
      requestString += "city=" + obj.shippingAddress.city + ",";
      requestString += "country=" + obj.shippingAddress.country;
      requestString += "],";

      // billingAddress alanı
      requestString += "billingAddress=[";
      requestString += "address=" + obj.billingAddress.address + ",";
      requestString += "zipCode=" + obj.billingAddress.zipCode + ",";
      requestString += "contactName=" + obj.billingAddress.contactName + ",";
      requestString += "city=" + obj.billingAddress.city + ",";
      requestString += "country=" + obj.billingAddress.country;
      requestString += "],";

      // basketItems alanı
      requestString += "basketItems=[";
      for (var i = 0; i < obj.basketItems.length; i++) {
        var item = obj.basketItems[i];
        requestString += "[";
        requestString += "id=" + item.id + ",";
        requestString += "price=" + item.price + ",";
        requestString += "name=" + item.name + ",";
        requestString += "category1=" + item.category1 + ",";
        requestString += "category2=" + item.category2 + ",";
        requestString += "itemType=" + item.itemType;
        requestString += "]";
        if (i !== obj.basketItems.length - 1) {
          requestString += ", ";
        }
      }
      requestString += "],";

      // Diğer alanlar
      requestString += "callbackUrl=" + obj.callbackUrl + ",";
      requestString += "currency=" + obj.currency + ",";
      requestString += "paidPrice=" + obj.paidPrice + ",";
      requestString += "enabledInstallments=[";
      for (var i = 0; i < obj.enabledInstallments.length; i++) {
        requestString += obj.enabledInstallments[i];
        if (i !== obj.enabledInstallments.length - 1) {
          requestString += ", ";
        }
      }
      requestString += "]";

      requestString += "]";

      return requestString;
    }

    //generate authorization string
    function generateAuthorizationString(obj) {
      var requestString = generateRequestString(obj);

      console.log("Request String: ", requestString);
      console.log("Secret Key: ", secretKey);

      var hashSha1 = CryptoJS.SHA1(
        apiKey + x_iyzi_rnd + secretKey + requestString
      );
      var hashInBase64 = CryptoJS.enc.Base64.stringify(hashSha1);
      var authorization = "IYZWS" + " " + apiKey + ":" + hashInBase64;

      return authorization;
    }

    var requestModel = requestBody;
    var authorization = generateAuthorizationString(requestModel);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", authorization);
    myHeaders.append("x-iyzi-rnd", x_iyzi_rnd);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(requestModel);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      process.env.IYZICO_CHECKOUTFORM_INIT_URL,
      // @ts-ignore
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        resolve({
          response: result,
          authorization: authorization,
        });
      })
      .catch((error) => {
        resolve(false);
      });
  });
}

async function retrieve_payment(
  authorization,
  x_iyzi_rnd,
  token,
  conversationId
) {
  return await new Promise((resolve, reject) => {
    var apiKey = process.env.IYZICO_API_KEY;
    var secretKey = process.env.IYZICO_SECRET_KEY;

    function nullClear(obj) {
      for (var member in obj) {
        if (obj[member] === null) {
          delete obj[member];
        } else if (typeof obj[member] === "object") {
          obj[member] = nullClear(obj[member]);
          if (Object.keys(obj[member]).length === 0) {
            delete obj[member];
          }
        }
      }

      return obj;
    }

    //Set json string to model
    function jsonToObj(jsonString, obj) {
      var parsedJsonString = JSON.parse(jsonString);
      for (var key in parsedJsonString) {
        if (parsedJsonString.hasOwnProperty(key)) {
          if (typeof parsedJsonString[key] === "object") {
            if (Array.isArray(parsedJsonString[key])) {
              for (var i = 0; i < parsedJsonString[key].length; i++) {
                if (key == "basketItems") {
                  // obj[key].push(new BasketItem());
                  obj[key][i] = jsonToObj(
                    JSON.stringify(parsedJsonString[key][i]),
                    obj[key][i]
                  );
                } else {
                  obj[key][i] = parsedJsonString[key][i];
                }
              }
            } else {
              obj[key] = jsonToObj(
                JSON.stringify(parsedJsonString[key]),
                obj[key]
              );
            }
          } else {
            obj[key] = parsedJsonString[key];
          }
        }
      }
      obj = nullClear(obj);

      return obj;
    }

    //generate pki string of object
    function generateRequestString(obj) {
      var isArray = Array.isArray(obj);

      var requestString = "[";
      for (var i in obj) {
        var val = obj[i];
        if (!isArray) {
          requestString += i + "=";
        }
        if (typeof val === "object") {
          requestString += generateRequestString(val);
        } else {
          requestString += val;
        }
        requestString += isArray ? ", " : ",";
      }
      requestString = requestString.slice(0, isArray ? -2 : -1);
      requestString += "]";
      return requestString;
    }

    //generate authorization string
    function generateAuthorizationString(obj) {
      var requestString = generateRequestString(obj);
      var hashSha1 = CryptoJS.SHA1(
        apiKey + x_iyzi_rnd + secretKey + requestString
      );
      var hashInBase64 = CryptoJS.enc.Base64.stringify(hashSha1);
      var authorization = "IYZWS" + " " + apiKey + ":" + hashInBase64;
      console.log(requestString);
      return authorization;
    }

    var bodyJSON = {
      locale: "tr",
      conversationId: conversationId,
      token: token,
    };

    var authorization = generateAuthorizationString(bodyJSON);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authorization);
    myHeaders.append("x-iyzi-rnd", x_iyzi_rnd);

    const raw = JSON.stringify(bodyJSON);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      process.env.IYZICO_CHECKOUTFORM_RETRIEVE_URL,
      // @ts-ignore
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Retrieve Result: ", result);
        resolve(result);
      })
      .catch((error) => {
        console.log("Retrieve Error: ", error);
        resolve(false);
      });
  });
}

module.exports = { initialize_checkout, retrieve_payment };
