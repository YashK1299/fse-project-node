/**
 * @file Implements mongoose schema to CRUD
 * documents in the likes collection
 */
import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";

/**
 * Schema definition for likes
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;
