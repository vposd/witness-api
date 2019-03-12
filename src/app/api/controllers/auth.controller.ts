import Express from 'express';
import { authenticate } from 'passport';
import { popupResponse } from 'popup-tools';

import { Get, Controller, Post, Authorize } from '../../../infrastructure/framework';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @Get('/api/auth/google', authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
  }))
  authenticateRequest() { }

  @Get('/api/auth/google/callback', authenticate('google', {
    failureRedirect: '/',
    session: true
  }))
  authenticate(req: Express.Request, res: Express.Response) {
    req.session.token = req.user.token;
    res.set({ 'content-type': 'text/html; charset=utf-8' });
    res.end(popupResponse(req.user));
  }

  @Authorize
  @Get('/api/auth/user')
  getUser(req: Express.Request, res: Express.Response) {
    res.status(200).json({auth: req.session});
  }

  @Post('/api/logout')
  logout(req: Express.Request, res: Express.Response) {
    req.logout();
    req.session = null;
    res.redirect('/');
  }

}
