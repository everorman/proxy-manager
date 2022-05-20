import { getRepository, Like } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Site } from "../entity";
import { ExternalApis } from "../utilities";


export class SiteController {

  private siteRepository = getRepository(Site);

  async all(request: Request, response: Response, next: NextFunction) {
    const { page = 1, limit = 10, seachText='' } = request.body;
    let where = {};
    if(seachText){
      where = {ip: Like(`%${seachText}%`)};
    }
    const result = await this.siteRepository.find({
      where,
      take: limit * 1,
      skip: (page - 1) * limit
    });
    const count = await this.siteRepository.count({where});
    return {
      result,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }
  }

  async getByIp(request: Request, response: Response, next: NextFunction) {
    const result = await this.siteRepository.findOne({ where: { ip: request.params.ip } });
    if(result) return result;
    return null;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    console.log('Guardando ', request.body)
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