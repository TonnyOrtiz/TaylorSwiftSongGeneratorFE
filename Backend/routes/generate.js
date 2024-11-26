import express from 'express';
import bodyParser from 'body-parser';
import Generate from '../handlers/generate.js';

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
      await Generate.createSong(req, res, next);
    } catch (error) {
      console.Error(error);
    }
  })
  .post((req, res, next) => {
    res.statusCode = 501;
    res.end('{"message":"¡POST no está soportado en /generate/ !"}');
  })
  .put((req, res, next) => {
    res.end('{"message":"¡PUT no está soportado en /generate/ !"}');
  })
  .delete((req, res, next) => {
    res.end('{"message":"¡DELETE no está soportado en /generate/ !"}');
  });

export default generateRouter;
