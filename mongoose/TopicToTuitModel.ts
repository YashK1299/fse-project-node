import mongoose from "mongoose";
import TopicToTuitSchema from "./TopicToTuitSchema";
const TopicToTuitModel = mongoose.model("TopicToTuitModel", TopicToTuitSchema);
export default TopicToTuitModel;