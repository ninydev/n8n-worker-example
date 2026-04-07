require('dotenv').config();
const path = require('path');

const commonEnv = {
    DB_TYPE: 'postgresdb',
    DB_POSTGRESDB_HOST: process.env.POSTGRES_HOST,
    DB_POSTGRESDB_PORT: process.env.POSTGRES_PORT,
    DB_POSTGRESDB_DATABASE: process.env.POSTGRES_DB,
    DB_POSTGRESDB_USER: process.env.POSTGRES_USER,
    DB_POSTGRESDB_PASSWORD: process.env.POSTGRES_PASSWORD,
    EXECUTIONS_MODE: 'queue',
    QUEUE_BULL_REDIS_HOST: process.env.REDIS_HOST,
    QUEUE_BULL_REDIS_PORT: process.env.REDIS_PORT,
    N8N_ENCRYPTION_KEY: process.env.N8N_ENCRYPTION_KEY,
    N8N_USER_FOLDER: path.resolve(process.env.N8N_USER_FOLDER),
    GENERIC_TIMEZONE: process.env.GENERIC_TIMEZONE,
    TZ: process.env.TZ
};

module.exports = {
    apps: [
        // ГОЛОВНИЙ МОДУЛЬ (N8N MAIN)
        {
            name: 'n8n-main',
            script: './node_modules/.bin/n8n',
            args: 'start',
            env: {
                ...commonEnv,
                WEBHOOK_URL: process.env.WEBHOOK_URL,
                N8N_PORT: process.env.N8N_PORT,
                N8N_METRICS: true,
                N8N_METRICS_INCLUDE_QUEUE_METRICS: true,
            }
        },
        // МОНІТОРИНГ ЧЕРГ (BULL BOARD)
        {
            name: 'n8n-monitor',
            script: './monitor.js',
            env: {
                REDIS_HOST: process.env.REDIS_HOST,
                REDIS_PORT: process.env.REDIS_PORT
            }
        },
        // ВОРКЕР №1 (QUEUE WORKER)
        {
            name: 'n8n-worker-1',
            script: './node_modules/.bin/n8n',
            args: 'worker',
            env: {
                ...commonEnv,
                N8N_RUNNERS_BROKER_PORT: 5681,
            }
        },
        // ВОРКЕР №2 (QUEUE WORKER)
        {
            name: 'n8n-worker-2',
            script: './node_modules/.bin/n8n',
            args: 'worker',
            env: {
                ...commonEnv,
                N8N_RUNNERS_BROKER_PORT: 5683,
            }
        }
    ]
};