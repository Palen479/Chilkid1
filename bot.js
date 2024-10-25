const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Ganti 'YOUR_BOT_TOKEN' dengan token bot Telegram Anda
const bot = new TelegramBot('7533008158:AAH_podyXC8aUtveOeCuBiUwmdKVnyVZNQc', {polling: true});
// Tambahkan ID Telegram di sini
const telegramId = '774955908'; // Ganti dengan ID Telegram Anda
const groupId = '-1002422472069'; // Ganti dengan ID grup Telegram Anda

const urls = [
  'https://precise.gli.id:5007/precise-proxy/get-confirmation-email?token=b7a4d2f10e3d0410ad3d1dc10619fd56&id=51DC7C1746984447A0CB95886427E4B2',
  
];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Cek apakah chatId ada dalam daftar ID yang diizinkan
  if (chatId.toString() === telegramId || chatId.toString() === groupId) {
    bot.sendMessage(chatId, 'Bot telah dimulai. Memeriksa URL setiap 5 detik...');
    checkURLs(chatId);
  } else {
    bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk mengakses bot ini.');
  }
});

function checkURLs(chatId) {
  setInterval(async () => {
    for (let i = 0; i < urls.length; i++) {
      try {
        const response = await axios.get(urls[i]);
        if (response.data.includes('Mohon maaf, Anda sudah mendapatkan voucher')) {
          bot.sendMessage(chatId, `Voucher susu Chil Kids ${i === 0 ? '400' : '200'} gram sudah siap untuk diklaim!`);
        }
      } catch (error) {
        console.error(`Error saat memeriksa URL ${i + 1}:`, error);
      }
    }
  }, 5000); // Periksa setiap 5 detik
}
