/**
 * @file Implements mongoose schema to CRUD
 * documents in the bookmarks collection
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

/**
 * Schema definition for bookmarks
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;
