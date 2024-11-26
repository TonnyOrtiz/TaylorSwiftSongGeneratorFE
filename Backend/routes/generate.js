import express from 'express';
import bodyParser from 'body-parser';
import controllers from '../controllers/index.js';
const { Post } = models;

const generateRouter = express.Router();

generateRouter.use(bodyParser.json());

generateRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const song = await Post.findAll({ raw: true });
      res.json(posts);
    } catch (error) {
      console.Error(error);
    }
  });

postsRouter.route('/:postId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId }
      });
      res.json(post);
    } catch (error) {
      console.Error(error);
    }
  })
  .post((req, res, next) => {
    res.statusCode = 501;
    res.end('{"message":"¡POST no está soportado en /posts/' + req.params.postId + '!"}');
  })
  .put((req, res, next) => {
    res.end('{"message":"¡PUT no está soportado en /posts/' + req.params.postId + '!"}');
  })
  .delete((req, res, next) => {
    res.end('{"message":"¡DELETE no está soportado en /posts/' + req.params.postId + '!"}');
  });

export default generateRouter;
