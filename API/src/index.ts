import 'reflect-metadata';
import { createConnections } from 'typeorm';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
//import path from 'path';

const PORT = process.env.PORT || 3500;

createConnections()
  .then(async () => {
    // create express app
    const app = express();
    // Middlewares
    app.use(cors());
    app.use(helmet());

    app.use(express.json());
    // Routes
    app.use('/', routes);
    //app.use('/uploads', express.static(path.resolve('uploads')));
    // start express server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.log(error));
