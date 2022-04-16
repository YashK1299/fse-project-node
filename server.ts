/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 *     <li>follows</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import dotenv from 'dotenv';
 import express, {Request, Response} from 'express';
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 import LikeController from "./controllers/LikeController";
 import DislikeController from "./controllers/DislikeController";
 import MessageController from './controllers/MessageController';
 import FollowController from './controllers/FollowController';
 import BookmarkController from './controllers/BookmarkController';
 import AuthenticationController from "./controllers/AuthenticationController";
 import mongoose from "mongoose";
 const cors = require("cors");
 const session = require("express-session");

 // To read the config file
 dotenv.config();
 
 // build the connection string
 const DB_USERNAME = process.env.DB_USERNAME;
 const DB_PASSWORD = process.env.DB_PASSWORD;
 const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ei10j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;// connect to the database
 mongoose.connect(connectionString);
 
 const app = express();
 app.use(cors({
     credentials: true,
     origin: process.env.CORS_ORIGIN
 }));
 
 let sess = {
     secret: process.env.EXPRESS_SESSION_SECRET,
     saveUninitialized: true,
     resave: true,
     cookie: {
         sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
         secure: process.env.NODE_ENV === "production",
        // secure: false
     }
 }
 
 if (process.env.NODE_ENV === 'production') {
     app.set('trust proxy', 1) // trust first proxy
     sess.cookie.secure = true // serve secure cookies
 }
 
 app.use(session(sess));
 app.use(express.json());

 app.get('/hello', (req: Request, res: Response) =>
     res.send('Hello World!'));
 
 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome!'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));

     // Setting up the instance for each RESTfull API
 const userController = UserController.getInstance(app);
 const tuitController = TuitController.getInstance(app);
 const likesController = LikeController.getInstance(app);
 const dislikesController = DislikeController.getInstance(app);
 const followController = FollowController.getInstance(app);
 const messageController = MessageController.getInstance(app);
 const bookmarkController = BookmarkController.getInstance(app);
 AuthenticationController(app);
 /**
  * Start a server listening at port 4000 locally
  * but use environment variable PORT on Heroku if available.
  */
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);