/**
 * @file Controller RESTful Web service API for messages resource
 */
 import MessageDao from "../daos/MessageDao";
 import Message from "../models/Message";
 import {Express, Request, Response} from "express";
 import MessageControllerI from "../interfaces/MessageControllerI";
 
 /**
  * @class MessageController Implements RESTful Web service API for messages resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid1/messages/:uid2 to create a new message instance for
  *     a given user</li>
  *     <li>GET /api/messages/:uid to retrieve a particular message instances</li>
  *     <li>GET /api/users/:uid/messages to retrieve messages for a given user </li>
  *     <li>DELETE /api/users/:uid1/deleteMessages/:uid2 to remove a particular message instance</li>
  * </ul>
  * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
  * @property {MessageController} messageController Singleton controller implementing
  * RESTful Web service API
  */
 export default class MessageController implements MessageControllerI {
     private static messageDao: MessageDao = MessageDao.getInstance();
     private static messageController: MessageController | null = null;
 
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return MessageController
      */
     public static getInstance = (app: Express): MessageController => {
         if(MessageController.messageController === null) {
             MessageController.messageController = new MessageController();
             app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessagesSentByUser);
             app.get("/api/messages/:uid", MessageController.messageController.findAllMessagesReceivedByUser);
             app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userMessagesUser);
             app.delete("/api/users/:uid1/deleteMessages/:uid2", MessageController.messageController.userDeletesMessage);
         }
         return MessageController.messageController;
     }
     
     /**
      * Retrieves all messages from the database for a particular user and returns
      * an array of messages.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the message objects
      */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
         MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
             .then((messages: Message[]) => res.json(messages));
 
     /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the message to be retrieved
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the message that matches the user ID
      */
    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
         MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
             .then((message: Message[]) => res.json(message));
 
     /**
      * @param {Request} req Represents request from client, including body
      * containing the JSON object for the new message to be inserted in the
      * database
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new message that was inserted in the
      * database
      */
      userMessagesUser = (req: Request, res: Response) =>
         MessageController.messageDao.userMessagesUser(req.body, req.params.uid1, req.params.uid2)
             .then((message: Message) => res.json(message));
 
     /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the message to be removed
      * @param {Response} res Represents response to client, including status
      * on whether deleting a user was successful or not
      */
      userDeletesMessage = (req: Request, res: Response) =>
         MessageController.messageDao.userDeletesMessage(req.params.uid1, req.params.uid2)
             .then((status) => res.send(status));
 };
