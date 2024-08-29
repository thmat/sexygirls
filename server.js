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
        // Список стран СНГ и Украины
        const targetCountries = ['AM', 'AZ', 'BY', 'KZ', 'KG', 'MD', 'RU', 'TJ', 'TM', 'UZ', 'UA'];

        // Если страна входит в список стран СНГ или Украины
        if (targetCountries.includes(geo.country)) {
            // Перенаправляем пользователя на Telegram-канал
            res.redirect('https://t.me/+r8clWlKWgecyNTA6'); // Замените на ваш URL Telegram-канала
        } else {
            // Если пользователь не из стран СНГ или Украины, перенаправляем на другую ссылку
            res.redirect(`https://sweet-charmdating.life/?u=ntq8kww&o=a7kkp4a`);
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
