import { OAuth2Strategy } from 'passport-google-oauth';
import passport from 'passport';

import { Injectable } from '../../infrastructure/framework';
import { UsersRepository } from '../../infrastructure/persistence/repositories/users.repository';
import { User } from './user';

@Injectable()
export class AuthService {

  constructor(
    private usersRepository: UsersRepository
  ) { }

  configAuth() {
    this.configGoogleAuth();
  }

  private configGoogleAuth() {
    const GoogleStrategy = OAuth2Strategy;

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
    passport.use(
      new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      (token, refreshToken, profile, done) => {
        this.upsertUser(profile, done);
      }
    ));
  }

  private async upsertUser(profile: passport.Profile, done: (err: Error, user: User) => void) {
    try {
      const user = await this.usersRepository.findOne({
        googleProfileId: profile.id
      });

      if (user) {
        user.displayName = profile.displayName;
        user.email = profile.emails ? profile.emails[0].value : user.email;
        user.photoUrl = profile.photos ? profile.photos[0].value : user.photoUrl;

        const updatedUser = await this.usersRepository.save(user);
        return done(null, updatedUser);
      }

      const newUser = new User(
        profile.id,
        profile.displayName,
        profile.photos ? profile.photos[0].value : null,
        profile.emails ? profile.emails[0].value : null
      );

      await newUser.validate();
      const savedUser = await this.usersRepository.save(newUser);

      return done(null, savedUser);
    } catch (err) {
      done(err, null);
    }
  }
}
