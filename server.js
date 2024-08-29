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

    // Отправляем информацию о местоположении пользователю
    if (geo) {
        res.send(`Ваше местоположение: ${geo.city}, ${geo.region}, ${geo.country}`);
    } else {
        res.send('Не удалось определить местоположение');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
