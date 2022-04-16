import {Request, Response} from "express";

/**
 * @file Declares API for Follows related controller methods
 */
export default interface FollowControllerI {
    findAllFollowingsByUser (req: Request, res: Response): void;
    findAllFollowersByUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
};
