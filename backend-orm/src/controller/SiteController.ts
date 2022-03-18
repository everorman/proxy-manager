import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Site } from "../entity";
import { ExternalApis } from "../utilities";


export class SiteController {

  private siteRepository = getRepository(Site);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.siteRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.siteRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.siteRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let siteToRemove = await this.siteRepository.findOne(request.params.id);
    await this.siteRepository.remove(siteToRemove);
  }

  async checkApi(request: Request, response: Response, next: NextFunction) {
    const externalApis = new ExternalApis();
    return externalApis.getIpDetails(request.params.ip);
  }

}