// monitor.js
require('dotenv').config();
const express = require('express');
const { Queue } = require('bullmq');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

// Настройка на основе твоего скриншота Redis
const n8nQueue = new Queue('jobs', { // Имя очереди из скрина - "jobs"
    connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379
    },
    prefix: 'bull' // Префикс из скрина - "bull"
});

createBullBoard({
    queues: [new BullMQAdapter(n8nQueue)],
    serverAdapter: serverAdapter,
});

const app = express();
app.use('/admin/queues', serverAdapter.getRouter());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ BullBoard настроен на очередь 'jobs' с префиксом 'bull'`);
    console.log(`🔗 http://localhost:${PORT}/admin/queues`);
});