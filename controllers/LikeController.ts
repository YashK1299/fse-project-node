/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
 import LikeDao from "../daos/LikeDao";
 import DislikeDao from "../daos/DislikeDao";
 import TuitDao from "../daos/TuitDao";
 import LikeControllerI from "../interfaces/LikeControllerI";
 
 /**
  * @class TuitController Implements RESTful Web service API for likes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
  *     </li>
  *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
  *     no londer likes a tuit</li>
  * </ul>
  * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
  * @property {LikeController} LikeController Singleton controller implementing
  * RESTful Web service API
  */
 export default class LikeController implements LikeControllerI {
     private static likeDao: LikeDao = LikeDao.getInstance();
     private static dislikeDao: DislikeDao = DislikeDao.getInstance();
     private static likeController: LikeController | null = null;
     private static tuitDao: TuitDao = TuitDao.getInstance();
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): LikeController => {
         if(LikeController.likeController === null) {
             LikeController.likeController = new LikeController();
             app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
             app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
             app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
             app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
             app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
         }
         return LikeController.likeController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that liked a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the liked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsersThatLikedTuit = (req: Request, res: Response) =>
         LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
             .then(likes => res.json(likes));
 
     /**
      * Retrieves all tuits liked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user liked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were liked
      */
     findAllTuitsLikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;
        LikeController.likeDao.findAllTuitsLikedByUser(userId)
        .then(likes => {
            const likesNonNullTuits =
            likes.filter(like => like.tuit);
            const tuitsFromLikes =
            likesNonNullTuits.map(like => like.tuit);
            res.json(tuitsFromLikes);
        });
   }
   
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being liked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new likes that was inserted in the
      * database
      */
     userLikesTuit = (req: Request, res: Response) =>
         LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
             .then(likes => res.json(likes));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unliking
      * the tuit and the tuit being unliked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the like was successful or not
      */
     userUnlikesTuit = (req: Request, res: Response) =>
         LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));

     userTogglesTuitLikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        //@ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
                profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const userAlreadyDislikedTuit = await LikeController.dislikeDao
                .findUserDislikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao
                .countHowManyLikedTuit(tid);
            const howManyDislikedTuit = await LikeController.dislikeDao
                .countHowManyDislikedTuit(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            } else {
                if (userAlreadyDislikedTuit) {
                    await LikeController.dislikeDao.userUndislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                }
                await LikeController.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
            };
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
    
 };
 