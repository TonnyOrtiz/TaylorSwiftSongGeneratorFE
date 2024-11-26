import express from 'express';
import bodyParser from 'body-parser';
import models from '../models/index.js';
const { Comment } = models;

const commentsRouter = express.Router();

commentsRouter.use(bodyParser.json());

commentsRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const comments = await Comment.findAll({ raw: true });
      res.json(comments);
    } catch (error) {
      console.Error(error);
    }
  });

commentsRouter.route('/:commentId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const post = await Comment.findOne({
        where: { id: req.params.commentId }
      });
      res.json(post);
    } catch (error) {
      console.Error(error);
    }
  })
  .post((req, res, next) => {
    res.statusCode = 501;
    res.end('{"message":"¡POST no está soportado en /comments/' + req.params.postId + '!"}');
  })
  .put((req, res, next) => {
    res.end('{"message":"¡PUT no está soportado en /comments/' + req.params.postId + '!"}');
  })
  .delete((req, res, next) => {
    res.end('{"message":"¡DELETE no está soportado en /comments/' + req.params.postId + '!"}');
  });
export default commentsRouter;
