/**
 * @file Controller RESTful Web service API for topics resource
 */
import {Express, Request, Response} from "express";
import TopicDao from "../daos/TopicDao";
import TopicControllerI from "../interfaces/TopicControllerI";

export default class TopicController implements TopicControllerI {
    private static topicDao: TopicDao = TopicDao.getInstance();
    private static topicController: TopicController | null = null;


    public static getInstance = (app: Express): TopicController => {
        if(TopicController.topicController === null) {
            TopicController.topicController = new TopicController();
            app.get("/api/topics",TopicController.topicController.findAllTopics);
            app.post("/api/topics", TopicController.topicController.createTopic);
            app.delete("/api/topics/:tid", TopicController.topicController.deleteTopic);
            app.get("/api/topics/:tid/tuits",TopicController.topicController.findAllTuitsByTopic);
            app.post("/api/topics/:topicid/tuits/:tuitid",TopicController.topicController.addTopicToTuit);

        }
        return TopicController.topicController;
    }

    private constructor() {}


    createTopic = (req: Request, res: Response) =>
        TopicController.topicDao.addTopic(req.body.topic)
            .then(topics=>res.json(topics));

    deleteTopic = (req: Request, res: Response) =>
        TopicController.topicDao.deleteTopic(req.params.tid)
            .then(status=>res.send(status))

    findAllTuitsByTopic= (req: Request, res: Response) =>
        TopicController.topicDao.findAllTuitsByTopic(req.params.tid)
            .then(tuits=>res.json(tuits));

    findAllTopics= (req: Request, res: Response) =>
        TopicController.topicDao.findAllTopics()
            .then(topics=>res.json(topics));

    addTopicToTuit = (req: Request, res: Response) =>
        TopicController.topicDao.addTopicToTuit(req.params.tuitid, req.params.topicid)
            .then(status=>res.json(status));
};
