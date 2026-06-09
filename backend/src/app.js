const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const messageModel = require('./modules/message/message.routes');
const skillModel = require('./modules/skill/skill.routes');
const projectModel = require('./modules/project/project.routes');
const profileModel = require('./modules/profile/profile.routes');
const getPortfolio = require('./Public/getPorfolio')

const authModel = require('./auth/auth.routes');
const authMiddleware = require('./auth/auth.middleware');
const allowedOrigins = process.env.CLIENT_URLS.split(",");

const app = express();

app.use(cookieParser());
app.use(express.json());


app.use(
  cors({
    origin: function (origin, callback) {

      // allow Postman/server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }

    },
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/messages',authMiddleware, messageModel)
app.use('/skills',authMiddleware, skillModel)
app.use('/projects',authMiddleware, projectModel)
app.use('/profile',authMiddleware, profileModel)
app.use('/public',getPortfolio)
app.use('/auth',authModel)

module.exports = app;
