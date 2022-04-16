import mongoose, {Schema} from "mongoose";
import TopicToTuit from "../models/TopicToTuit";

const TopicToTuitSchema = new mongoose.Schema<TopicToTuit>({
    topic: {type:Schema.Types.ObjectId, ref:"TopicModel"},
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"}
}, {collection: "topictuit"});
export default TopicToTuitSchema;