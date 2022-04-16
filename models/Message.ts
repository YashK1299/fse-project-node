/**
 * @file Declares Follow data type representing relationship between
 * two users, as in user messages another user
 */
 import User from "./User";
 
 /**
  * @typedef Message Represents follows relationship between two users,
  * as in a user follows another user
  * @property {string} message The text message the user wants to send to another user
  * @property {User} to User being followed by the user
  * @property {User} from User following another user
  * @property {Date} sentOn Time at which the message was sent
  */
 export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn?: Date,
 };
