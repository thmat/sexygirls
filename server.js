const express = require('express');
const geoip = require('geoip-lite');
const app = express();

// Функция для получения IP-адреса клиента
function getClientIp(req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    return ip.split(',')[0].trim();
}

app.get('/', (req, res) => {
    // Получаем IP-адрес клиента
    const userIp = getClientIp(req);

    // Получаем информацию о местоположении
    const geo = geoip.lookup(userIp);

    // Логируем IP-адрес и информацию о местоположении
    console.log(`User IP: ${userIp}`);
    console.log(`Location: ${JSON.stringify(geo)}`);

    // Проверяем, что местоположение определено
    if (geo) {
        // Если страна - Беларусь (код страны BY)
        if (geo.country === 'BY') {
            // Перенаправляем пользователя на Telegram-канал
            res.redirect('https://t.me/sweetie_foxh'); // Замените на ваш URL Telegram-канала
        } else {
            // Если пользователь не из Беларуси, отправляем информацию о местоположении
            res.send(`Ваше местоположение: ${geo.city}, ${geo.region}, ${geo.country}`);
        }
    } else {
        // Если местоположение не удалось определить
        res.send('Не удалось определить местоположение');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
