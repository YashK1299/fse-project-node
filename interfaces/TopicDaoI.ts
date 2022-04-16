import Topic from "../models/Topic";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface TopicDaoI {
    addTopic (tpc: string): Promise<Topic>;
    deleteTopic (tid: string): Promise<any>;
    findAllTuitsByTopic (tid: string): Promise<any>;
    findAllTopics(): Promise<any>
};
