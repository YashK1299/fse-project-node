import mongoose, {Schema} from "mongoose";
import Topic from "../models/Topic";

/**
 * Schema definition for likes
 */
const TopicSchema = new mongoose.Schema<Topic>({
    topic: {type: String, required: true}
}, {collection: "topics"});
export default TopicSchema;
