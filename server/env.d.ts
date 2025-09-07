declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        SESSION_SECRET: string;
        URL: string;
        PORT: string;
        DB_HOST: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_NAME: string;
    }
}