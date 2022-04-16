import Bookmark from "../models/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
};
