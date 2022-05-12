import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Site } from "../entity";
import { ExternalApis } from "../utilities";


export class SiteController {

  private siteRepository = getRepository(Site);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.siteRepository.find();
  }

  async getByIp(request: Request, response: Response, next: NextFunction) {
    const result = await this.siteRepository.findOne({ where: { ip: request.params.ip } });
    console.log('Resultado', result);
    if(result) return result;
    console.log('Resultado', result);
    return null;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.siteRepository.save(request.body);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    console.log('params', request.body);
    const site = await this.siteRepository.findOne({where: { id: request.body.id }});
    if (site) {
      site.description = `${site.description}, ${request.body.description}`;
      console.log('Actualizando', site)
      return this.siteRepository.update(site.id,{...site});
    }
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