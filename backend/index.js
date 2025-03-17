const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5000

// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware для аутентификации (пример)
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Bearer secret-token") {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};

// Эндпоинт для чтения файла (асинхронно)
app.get("/read-file", (req, res) => {
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "File read error" });
    }
    res.json({ content: data });
  });
});

// Защищенный маршрут
app.get("/secure", authMiddleware, (req, res) => {
  res.json({ message: "You have access!" });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



