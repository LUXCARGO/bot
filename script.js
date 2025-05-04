async function sendData() {
    const fio = document.getElementById('fio').value;
    const phone = document.getElementById('phone').value;
    const location = document.querySelector('input[name="location"]:checked').value;

    if (!fio || phone.length !== 9) {
        alert('Пожалуйста, заполните все поля корректно.');
        return;
    }

    const now = new Date();
    const date = now.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    const message = `🔮 Новый клиент пришёл за адресом в ${location} в 📆 ${date} ⏰ ${time}. Вот его данные:\n👥 ФИО: ${fio}\n📟 Номер телефона: +992${phone}`;

    const botToken = '7828663970:AAGf4Ji_j3GMXZpGH-AO04-dxajdJXDtzRk'; // Замените на ваш токен бота
    const chatId = '2522714082'; // Замените на ваш chat ID
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        if (response.ok) {
            alert('Данные успешно отправлены!');
            document.getElementById('fio').value = '';
            document.getElementById('phone').value = '';
        } else {
            alert('Ошибка при отправке данных.');
        }
    } catch (error) {
        alert('Произошла ошибка: ' + error.message);
    }
}