import Message from "../models/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    findAllMessagesReceivedByUser (uid: string): Promise<Message[]>;
    userDeletesMessage (uid1: string, uid2: string): Promise<any>;
    userMessagesUser (message: Message, uid1: string, uid2: string): Promise<Message>;
};
