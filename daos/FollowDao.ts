/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

     /**
      * Uses FollowModel to retrieve all user documents followed by a user from users collection
      * @param {string} uid Followed's primary key
      * @returns Promise To be notified when the users are retrieved from
      * database
      */ 
    findAllFollowersByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

     /**
      * Uses FollowModel to retrieve all user document following a user from users collection
      * @param {string} uid Following's primary key
      * @returns Promise To be notified when the users are retrieved from
      * database
      */ 
    findAllFollowingsByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

     /**
      * Removes follow from the database.
      * @param {string} uid1 Followed's primary key
      * @param {string} uid2 Following's primary key
      * @returns Promise To be notified when follow is removed from the database
      */
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid2, userFollowing: uid1});

     /**
      * Inserts follow instance into the database
      * @param {string} uid1 Followed's primary key
      * @param {string} uid2 Following's primary key
      * @returns Promise To be notified when follow is inserted into the database
      */
    userFollowsUser = async (uid1: string, uid2: string): Promise<Follow> =>
        FollowModel.create({userFollowed: uid2, userFollowing: uid1});
}
