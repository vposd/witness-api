import Express from 'express';
import { authenticate } from 'passport';
import { popupResponse } from 'popup-tools';

import { Get, Controller, Post, Authorize, Middleware, BaseController } from '../../../infrastructure/framework';

const googleAuthHandler = authenticate('google', {
  scope: ['email']
});

const googleAuthCallbackHandler = authenticate('google', {
  failureRedirect: '/',
  session: true
});

@Controller()
export class AuthController extends BaseController {

  @Middleware(googleAuthHandler)
  @Get('/api/auth/google')
  authenticateRequest() {}

  @Middleware(googleAuthCallbackHandler)
  @Get('/api/auth/google/callback')
  authenticate(req: Express.Request, res: Express.Response) {
    req.session.token = req.user.token;
    res.set({ 'content-type': 'text/html; charset=utf-8' });
    res.end(popupResponse(req.user));
  }

  @Authorize
  @Get('/api/auth/user')
  getUser(req: Express.Request, res: Express.Response) {
    this.ok(res, req.user);
  }

  @Post('/api/logout')
  logout(req: Express.Request, res: Express.Response) {
    req.logout();
    req.session = null;
    res.redirect('/');
  }

}
