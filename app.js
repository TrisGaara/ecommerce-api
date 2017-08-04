import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan';
import chalk from 'chalk';
import errorHandler from 'errorhandler';
import dotenv from 'dotenv';
import flash from 'express-flash';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import expressValidator from 'express-validator';
import expressStatusMonitor from 'express-status-monitor';

import routes from './routes/index';

dotenv.load({ path: '.env.development' });

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.log(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express Configuration
 */

app.set('port', process.env.PORT || 3000);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());
app.use(flash());

app.use('/', routes);

app.use(errorHandler());

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;