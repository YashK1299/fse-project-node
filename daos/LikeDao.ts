/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
            LikeModel
            .findOne({tuit: tid, likedBy: uid});

    countHowManyLikedTuit = async (tid: string): Promise<number> =>
            LikeModel.
            count({tuit: tid});


     /**
      * Uses LikeModel to retrieve all user documents liking a tuit from users collection
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when the users are retrieved from
      * database
      */ 
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

     /**
      * Uses LikeModel to retrieve all tuit documents liked by a user from tuits collection
      * @param {string} uid User's primary key
      * @returns Promise To be notified when the likes are retrieved from
      * database
      */ 
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate({
              path: "tuit",
              populate: {
                path: "postedBy"
              }
            })
            .exec();

     /**
      * Inserts like instance into the database
      * @param {string} uid User's primary key
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when like is inserted into the database
      */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

     /**
      * Removes like from the database.
      * @param {string} uid User's primary key
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when like is removed from the database
      */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}
