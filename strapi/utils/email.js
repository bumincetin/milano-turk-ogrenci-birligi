const { EmailClient } = require("@azure/communication-email");

async function send_email(subject, plainText) {
  const connectionString = process.env.CONNECTION_STRING;
  const senderAddress = process.env.FALLBACK_EMAIL;
  const emailClient = new EmailClient(connectionString);

  // console.log("result", result);
  console.log("Sender Address", senderAddress);

  const message = {
    senderAddress: senderAddress ? senderAddress : "support@irec.ist",
    content: {
      subject: subject,
      plainText: plainText,
    },
    recipients: {
      to: [
        // { address: senderAddress ? senderAddress : "support@irec.ist" },
        { address: "durmusikartci@gmail.com" },
      ],
    },
  };

  const poller = await emailClient.beginSend(message);
  const response = await poller.pollUntilDone();

  console.log("EMAIL RESPONSE: ", response);

  return response;
}

module.exports = { send_email };
