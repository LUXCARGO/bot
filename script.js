async function sendData() {
    const fioInput = document.getElementById('fio');
    const phoneInput = document.getElementById('phone');
    const locationInput = document.querySelector('input[name="location"]:checked');

    const fio = fioInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!fio || !phone || phone.length !== 9 || !/^\d{9}$/.test(phone)) {
        alert('Пожалуйста, введите ФИО и корректный номер (9 цифр без +992).');
        return;
    }

    if (!locationInput) {
        alert('Пожалуйста, выберите локацию.');
        return;
    }

    const location = locationInput.value;

    const now = new Date();
    const date = now.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    const message = `🔮 Новый клиент пришёл за адресом в ${location} в 📆 ${date} ⏰ ${time}. Вот его данные:\n👥 ФИО: ${fio}\n📟 Номер телефона: +992${phone}`;

    const botToken = 'YOUR_BOT_TOKEN'; // Замените на ваш токен бота
    const chatId = 'YOUR_CHAT_ID'; // Замените на ваш chat ID
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
            fioInput.value = '';
            phoneInput.value = '';
            if (locationInput) locationInput.checked = false;
        } else {
            alert('Ошибка при отправке данных. Статус: ' + response.status);
        }
    } catch (error) {
        alert('Произошла ошибка: ' + error.message);
    }
}
