/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { Routes } from './routes/routes';

class App {
  public app: express.Application;
  public routes: Routes = new Routes();
  public mongoURL: string = process.env.MONGO_URL;

  private options = {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  };

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);

    if (this.mongoURL == '' || !this.mongoURL) {
      console.error('FATAL: MongoDB URL is missing. Exiting...');
      process.exit(1);
    }
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json({ verify: this.rawBodySaver }));
    this.app.use(bodyParser.urlencoded({ verify: this.rawBodySaver, extended: false }));
    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'pug');

    var cookieParser = require('cookie-parser');
    var cors = require('cors');

    this.app.use(cookieParser());
    this.app.use(cors());
  }

  private mongoSetup(): void {
    //    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoURL, this.options);
  }

  private rawBodySaver(req, res, buf, encoding): void {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  }
}

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB!');
});

mongoose.connection.on('error', (err: Error) => {
  console.error(
    'ERROR: Something went wrong with MongoDB connection: ' +
      err +
      '. Exiting...'
  );
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('WARN: Disconnected from MongoDB');
});

export default new App().app;
