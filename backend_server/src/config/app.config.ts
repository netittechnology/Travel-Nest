export default () => ({
    PORT: parseInt(process.env.PORT ?? '5000', 10),
    APP_NAME: process.env.APP_NAME ?? 'travel-nest',
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    JWT_SECRET: process.env.JWT_SECRET,

    database: {
        host: process.env.DB_HOST ?? '127.0.0.1',
        port: parseInt(process.env.DB_PORT ?? '3306', 10),
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? '',
        name: process.env.DB_NAME ?? 'test',
    },
    
    origins: {
        production: {
            admin_panel: process.env.PRODUCTION_ADMIN_PANEL_WEB_URL || undefined,
            client_panel: process.env.PRODUCTION_CLIENT_PANEL_WEB_URL || undefined,
        },
        development: {
            admin_panel: process.env.DEVELOPMENT_ADMIN_PANEL_WEB_URL || 'http://localhost:5173',
            client_panel: process.env.DEVELOPMENT_CLIENT_PANEL_WEB_URL || 'http://localhost:5174',
        },
    },

    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        client_redirect_url: process.env.GOOGLE_REDIRECT_URL,
    },

    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },

    smtp: {
        host: process.env.MAIL_HOST ,
        port: parseInt(process.env.MAIL_PORT ?? '587'),
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        from: process.env.MAIL_FROM ,
    },

    admin: {
        name: process.env.ADMIN_NAME ?? 'Default Admin',
        email: process.env.ADMIN_EMAIL ?? 'admin@gmail.com',
        password: process.env.ADMIN_PASSWORD ?? 'ChangeMe@123'
    },
})
