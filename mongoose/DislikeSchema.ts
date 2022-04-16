/**
 * @file Implements mongoose schema to CRUD
 * documents in the dislikes collection
 */
 import mongoose, {Schema} from "mongoose";
 import Dislike from "../models/Dislike";
 
 /**
  * Schema definition for dislikes
  */
 const DislikeSchema = new mongoose.Schema<Dislike>({
     tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
     dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
 }, {collection: "dislikes"});
 export default DislikeSchema;
 