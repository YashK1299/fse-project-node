/**
 * @file Declares Follow data type representing details 
 * about a tuit and its attributes
 */
import User from "./User";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit text message posted by the user as a tuit
 * @property {User} postedBy represents user posting the tuit
 * @property {Date} postedOn Date when the tuit was posted
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    stats?: any,
};
