import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import authRoutes from "./routes/auth.routes";
import { Site, User } from "./entity";
import * as cors from "cors";
require('dotenv').config()


createConnection().then(async connection => {

  // create express app
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/auth", authRoutes)


  // register express routes from defined application routes
  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });

  // setup express app here
  // ...

  // start express server
  app.listen(process.env.PORT);

  // insert new users for test
  await connection.manager.save(connection.manager.create(Site, {
    description: "Esto es una prueba",
    ip: "1.1.1.1",
    organization: "Esto es una prueba",
    region: "Lima",
    score: 20
  }));

  console.log(`Express server has started on port ${process.env.PORT}. Open http://localhost:${process.env.PORT}/users to see results`);

}).catch(error => console.log(error));
