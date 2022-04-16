import {Request, Response} from "express";

/**
 * @file Declares API for Tuits related controller methods
 */
export default interface TuitControllerI {
    findAllTuits (req: Request, res: Response): void;
    findAllTuitsByUser (req: Request, res: Response): void;
    findTuitById (req: Request, res: Response): void;
    createTuitByUser (req: Request, res: Response): void;
    updateTuit (req: Request, res: Response): void;
    deleteTuit (req: Request, res: Response): void;
};
