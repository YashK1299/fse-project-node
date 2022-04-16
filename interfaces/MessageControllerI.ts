import {Request, Response} from "express";

/**
 * @file Declares API for Messages related controller methods
 */
export default interface MessageControllerI {
    findAllMessagesSentByUser (req: Request, res: Response): void;
    findAllMessagesReceivedByUser (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    userMessagesUser (req: Request, res: Response): void;
};
