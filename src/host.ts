import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import { OAuth2Strategy } from 'passport-google-oauth';

import { Application } from './app/app';
import { errorHandler } from './app/api/middleware/error-handler';
import { logger } from './app/api/middleware/logger';

dotenv.config();

Application
  .server
  .config(
    app => app
      .use(cors())
      .use(helmet())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(session({
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
      }))
      .use(cookieParser())
      .use(passport.initialize())
      .use(passport.session())
      .use(logger)
  )
  .errorConfig(
    app => app
      .use(errorHandler)
  )
  .build()
  .start();
