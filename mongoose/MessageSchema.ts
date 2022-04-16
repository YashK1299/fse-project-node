/**
 * @file Implements mongoose schema to CRUD
 * documents in the messages collection
 */
import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * Schema definition for messages
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now},
}, {collection: "messages"});
export default MessageSchema;
