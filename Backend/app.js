import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';

import sequelize from './config/database.js';
import indexRouter from './routes/index.js';
import generateRouter from './routes/generate.js';

const app = express();

await sequelize.sync();
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/generate', generateRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
