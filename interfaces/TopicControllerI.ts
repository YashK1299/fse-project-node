import {Request, Response} from "express";

/**
 * @file Declares API for Likes related controller methods
 */
export default interface TopicControllerI {
    createTopic (req: Request, res: Response): void;
    deleteTopic (req: Request, res: Response): void;
    findAllTuitsByTopic (req: Request, res: Response): void;
    findAllTopics ( req: Request, res: Response): void;
    addTopicToTuit (req: Request, res: Response): void;
};