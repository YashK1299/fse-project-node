/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message"; 

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static MessageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.MessageDao === null) {
            MessageDao.MessageDao = new MessageDao();
        }
        return MessageDao.MessageDao;
    }
    private constructor() {}

     /**
      * Uses MessageModel to retrieve all message document sent by a user from messages collection
      * @param {string} uid Sender's primary key
      * @returns Promise To be notified when the message are retrieved from
      * database
      */ 
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("to")
            .exec();

     /**
      * Uses MessageModel to retrieve all message document received by a user from messages collection
      * @param {string} uid Receiver's primary key
      * @returns Promise To be notified when the message are retrieved from
      * database
      */ 
    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("from")
            .exec();

     /**
      * Removes message from the database.
      * @param {string} uid1 Sender's primary key
      * @param {string} uid2 Receiver's primary key
      * @returns Promise To be notified when message is removed from the database
      */
    userDeletesMessage = async (uid1: string, uid2: string): Promise<any> =>
        MessageModel.deleteOne({to: uid2, from: uid1});

     /**
      * Inserts message instance into the database
      * @param {string} message Sender's primary key
      * @param {string} uid1 Sender's primary key
      * @param {string} uid2 Receiver's primary key
      * @returns Promise To be notified when message is inserted into the database
      */
    userMessagesUser = async (message: Message, uid1: string, uid2: string): Promise<Message> =>
        MessageModel.create({...message, to: uid2, from: uid1});
}
