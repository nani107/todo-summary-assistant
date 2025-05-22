const axios = require("axios");

exports.sendToSlack = async (message) => {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!slackWebhookUrl) {
    throw new Error("SLACK_WEBHOOK_URL is not set");
  }

  await axios.post(slackWebhookUrl, { text: message });
};
