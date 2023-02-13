module.exports = {
  "host": "localhost",
  "port": 3030,
  "public": "./public/",
  "origins": [
    "http://localhost:3030"
  ],
  "paginate": {
    "default": 10,
    "max": 50
  },
  "mysql": {
    "client": "mysql2",
    "connection": process.env.DATABASE_URL,
  },
  "authentication": {
    "entity": "user",
    "service": "users",
    "secret": "1ywqf//E0OWMXhBerUWG49g0Ja/RxzXV",
    "authStrategies": [
      "jwt",
      "local"
    ],
    "jwtOptions": {
      "header": {
        "typ": "access"
      },
      "audience": "https://yourdomain.com",
      "algorithm": "HS256",
      "expiresIn": "1d"
    },
    "local": {
      "usernameField": "email",
      "passwordField": "password"
    }
  }
}
