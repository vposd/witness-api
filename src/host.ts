import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { Application } from './app/app';
import { errorHandler } from './app/api/middleware/error-handler';
import { logger } from './app/api/middleware/logger';

dotenv.config();

Application
  .server
  .config(
    app => app
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(logger)
  )
  .errorConfig(
    app => app
      .use(errorHandler)
  )
  .build()
  .start();
