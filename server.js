const http = require("http");
const fs = require("fs");

const PORT = 3000;

// BOT TOKENINGNI SHU YERGA YOZ
const BOT_TOKEN = "8697852107:AAGYjsXnTH-UvgC2cJDfymYayygLBP31qyo";

// CHAT IDINGNI SHU YERGA YOZ
const CHAT_ID = "8922592621";

function sendTelegram(message) {
    const url =
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage` +
        `?chat_id=${CHAT_ID}` +
        `&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => console.log("Telegram:", data))
        .catch(err => console.log("Xato:", err));
}

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("index.html topilmadi");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            res.end(data);
        });

        return;
    }

    if (req.url === "/yes") {
        sendTelegram("Sevinch ❤️ HA tugmasini bosdi!");
        res.writeHead(200);
        res.end("OK");
        return;
    }

    if (req.url === "/think") {
        sendTelegram("Sevinch O'YLAB KO'RAMAN tugmasini bosdi.");
        res.writeHead(200);
        res.end("OK");
        return;
    }

    res.writeHead(404);
    res.end("Topilmadi");
});

server.listen(PORT, () => {
    console.log(`Sayt ishga tushdi: http://localhost:${PORT}`);
});