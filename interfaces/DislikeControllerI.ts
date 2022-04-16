import {Request, Response} from "express";

/**
 * @file Declares API for Dislikes related controller methods
 */
export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userDislikesTuit (req: Request, res: Response): void;
    userUndislikesTuit (req: Request, res: Response): void;
};
