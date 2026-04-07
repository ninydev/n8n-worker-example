# n8n Worker Demo

Демонстраційний проект для запуску n8n у режимі черги (queue mode) з використанням Postgres, Redis та PM2.

## Склад проекту
- **n8n-main**: Основний процес n8n (панель керування та виконання синхронних задач).
- **n8n-worker-1, n8n-worker-2**: Воркери для фонової обробки черг задач.
- **n8n-monitor**: Панель моніторингу черг Redis (BullBoard) для візуального контролю задач.
- **docker-compose.yaml**: Інфраструктурні сервіси (Postgres та Redis) у контейнерах.

## Вимоги
- **Node.js**: Версія 18 або новіша.
- **Docker & Docker Compose**: Для запуску бази даних та системи черг.
- **PM2**: Менеджер процесів Node.js (встановлюється автоматично скриптом інсталяції).

## Швидкий старт

1. **Клонуйте проект та перейдіть до робочої директорії.**
2. **Налаштуйте змінні середовища:**
   ```bash
   cp .env.example .env
   ```
   Відкрийте `.env` та змініть паролі та `N8N_ENCRYPTION_KEY` для безпеки.
3. **Запустіть автоматичне налаштування:**
   ```bash
   chmod +x install-first.sh
   ./install-first.sh
   ```

## Моніторинг
- **Інтерфейс n8n**: [http://localhost:5678](http://localhost:5678)
- **Моніторинг черг (BullBoard)**: [http://localhost:3000/admin/queues](http://localhost:3000/admin/queues)

## Керування процесами
PM2 дозволяє легко керувати вашими сервісами:

- **Перевірити статус**: `pm2 list`
- **Переглянути логи**: `pm2 logs`
- **Зупинити все**: `pm2 stop ecosystem.config.js`
- **Перезапустити все**: `pm2 restart ecosystem.config.js`
- **Видалити з PM2**: `pm2 delete ecosystem.config.js`

## Автор та Партнери
- **Автор**: Nykytin Oleksandr
- **Партнери**: [itstep.org](https://itstep.org), [gerc.ua](https://gerc.ua)

## Ліцензія
Цей репозиторій є освітнім і надається для навчальних цілей.
