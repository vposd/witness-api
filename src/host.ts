import bodyParser from 'body-parser';

import { Application } from './app/app';
import { Injector } from './infrastructure/framework';
import { AgreementsController } from './app/api/controllers/agreements.controller';
import { UsersController } from './app/api/controllers/users.controller';
import { errorHandler } from './app/api/middleware/error-handler';
import { logger } from './app/api/middleware/logger';

Injector
  .init(AgreementsController)
  .init(UsersController)
  .get(Application)
  .server
  .config(
    app => app
      .set('port', process.env.PORT || 9000)
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
