#!/bin/bash

echo "🚀 Початок розгортання n8n Engine..."

# 1. Перевірка та встановлення системних залежностей
command -v node >/dev/null 2>&1 || { echo >&2 "❌ Помилка: Node.js не встановлено. Будь ласка, встановіть Node.js."; exit 1; }
command -v docker compose >/dev/null 2>&1 || { echo >&2 "❌ Помилка: Docker Compose не встановлено. Будь ласка, встановіть Docker."; exit 1; }

# Встановлення PM2 глобально, якщо його немає
if ! command -v pm2 >/dev/null 2>&1; then
    echo "📦 PM2 не знайдено. Встановлення PM2..."
    npm install -g pm2 || { echo "❌ Помилка: Не вдалося встановити PM2. Спробуйте запустити з sudo або перевірте права доступу."; exit 1; }
fi

# 2. Встановлення залежностей проекту
echo "📦 Встановлення локальних залежностей (n8n, bullmq, express...)..."
npm install

# 3. Запуск інфраструктури (Postgres, Redis)
echo "🐳 Запуск контейнерів Postgres та Redis..."
docker compose up -d

echo "⏳ Очікування готовності бази даних (10 сек)..."
sleep 10

# 4. Запуск процесів через PM2
echo "🔄 Запуск n8n, воркерів та моніторингу через PM2..."
pm2 start ecosystem.config.js

echo "✅ Готово! n8n Main, Workers та Monitor запущені."
echo "🔗 Інтерфейс n8n: http://localhost:5678"
echo "🔗 Моніторинг черг: http://localhost:3000/admin/queues"
pm2 list
