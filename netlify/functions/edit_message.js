// netlify/functions/edit_message.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const { chat_id, message_id, text } = JSON.parse(event.body);

    // Netlify environment variables orqali tokenni olish
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`;

    const data = {
        chat_id,
        message_id,
        text: text || "Qabul qilindi"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                statusCode: 400,
                body: JSON.stringify({ error: errorData.description })
            };
        }

        const responseData = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(responseData)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.toString() })
        };
    }
};
