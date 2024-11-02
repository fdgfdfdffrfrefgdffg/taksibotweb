// netlify/functions/edit_message.js
const axios = require('axios');

exports.handler = async function (event, context) {
    const { chat_id, message_id, text } = JSON.parse(event.body);

    // Environment variables orqali tokenni olish
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`;

    const data = {
        chat_id,
        message_id,
        text: text || "Qabul qilindi"
    };

    try {
        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json' }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };

    } catch (error) {
        const errorMessage = error.response ? error.response.data.description : error.toString();
        return {
            statusCode: 500,
            body: JSON.stringify({ error: errorMessage })
        };
    }
};
