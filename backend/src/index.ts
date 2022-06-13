import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Site } from "./entity";
import { Routes } from "./routes";
require('dotenv').config();
const data = require('./data/data-ender');
const data2 = require("./data/data-ender.json");
const dataSecond = require("./data/data-second.json");


createConnection().then(async connection => {

  // create express app
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const globalResponce = function (result, res) {
    if (result instanceof Promise) {
      result.then((result)=>{
        if(result !== null && result !== undefined){
          console.log('result', result);
          if (result.code){
            res.status(result.code).send(result.message);
          }else{
            res.json(result);
          }
        }else{
          res.send(null);
        }
      });

    } else if (result !== null && result !== undefined) {
      console.log('result', result);
      if (result.code){
        res.status(result.code).send(result.message);
      }else{
        res.json(result);
      }
      
    } else {
      res.send(null);
    }
  }



  // register express routes from defined application routes
  Routes.forEach(route => {
    if (route.check.length) {
      (app as any)[route.method](route.route, route.check, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        globalResponce(result, res);
      });
    } else {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        globalResponce(result, res);
      });
    }

  });

  // setup express app here
  // ...

  // start express server
  app.listen(process.env.PORT);

  // // insert new users for test
  // for (let item of data){
  //   console.log('Local item', item)
  //   await connection.manager.save(connection.manager.create(Site, {...item, region:'', score: 0}));
  // }

  //  // insert new users for test
  //  for (let item of dataSecond){
  //   console.log('Local item', item)
  //   await connection.manager.save(connection.manager.create(Site, {...item, organization: '', region:'', score: 0}));
  // }


  console.log(`Express server has started on port ${process.env.PORT}. Open http://localhost:${process.env.PORT}/users to see results`);

}).catch(error => console.log(error));
