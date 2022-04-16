/**
 * @file Implements mongoose schema to CRUD
 * documents in the follows collection
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * Schema definition for follows
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;
