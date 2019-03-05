import bodyParser from 'body-parser';

import { Application } from './app/app';
import { Container } from './infrastructure/framework';
import { AgreementsController } from './app/api/controllers/agreements.controller';
import { UsersController } from './app/api/controllers/users.controller';

Container
  .bind(AgreementsController)
  .bind(UsersController)
  .get(Application)
  .server
  .config(
    app => app
      .set('port', process.env.PORT || 9000)
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))
  )
  .build()
  .start();
