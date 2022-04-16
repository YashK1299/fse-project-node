import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthenticationController = (app: Express) => {
  
  const userDao: UserDao = UserDao.getInstance();

  const signup = async (req: Request, res: Response) => {
    const newUser = req.body;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;

    const existingUser = await userDao
        .findUserByUsername(req.body.username);
    if (existingUser) {
       res.sendStatus(403);
       return;
    } else {
      const insertedUser = await userDao
          .createUser(newUser);
      insertedUser.password = '';
      //@ts-ignore
      req.session['profile'] = insertedUser;
      res.json(insertedUser);
    }
  }

  const reset = async (req: Request, res: Response) => {
    const user = req.body;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltRounds);
    user.password = hash;

    const existingUser = await userDao
        .findUserByUsername(user.username);
    if (existingUser) {
      const insertedUser = await userDao
          .updateUserPasswordByUsername(existingUser._id, password);
      insertedUser.password = '';
      //@ts-ignore
      req.session['profile'] = insertedUser;
      res.json(insertedUser);
    } else {
      res.sendStatus(403);
      return;
    }
  }
  
  const profile = (req: Request, res: Response) => {
    //@ts-ignore
    const profile = req.session['profile'];
    if (profile) {
      profile.password = "";
      res.json(profile);
    } else {
      res.sendStatus(403);
    }
  }
  
  const logout = (req: Request, res: Response) => {
    //@ts-ignore
     req.session.destroy();
     res.sendStatus(200);
  }
  
  const login = async (req: Request, res: Response) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const existingUser = await userDao
      .findUserByUsername(username);
  
    if (!existingUser) {
      res.sendStatus(403);
      return;
    }
  
    const match = await bcrypt
      .compare(password, existingUser.password);
  
    if (match) {
      existingUser.password = '*****';
      //@ts-ignore
      req.session['profile'] = existingUser;
      res.json(existingUser);
    } else {
      res.sendStatus(403);
    }
  };

  app.post("/api/auth/login", login);  
  app.post("/api/auth/profile", profile);
  app.post("/api/auth/logout", logout);
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/reset", reset);
}

export default AuthenticationController;