const config = {
    session: {
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 6000
        }
    },
    port: 8000
}

module.exports = config;