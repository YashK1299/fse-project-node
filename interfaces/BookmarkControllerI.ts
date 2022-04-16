import {Request, Response} from "express";

/**
 * @file Declares API for Bookmarks related controller methods
 */
export default interface BookmarkControllerI {
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
};
