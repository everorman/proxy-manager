import { getRepository, Like } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Proxy } from "../entity";
import { ExternalApis } from "../utilities";


export class ProxyController {

  private proxyRepository = getRepository(Proxy);

  async all(request: Request, response: Response, next: NextFunction) {
    const { page = 1, limit = 10, seachText='' } = request.body;
    let where = {};
    if(seachText){
      where = {ip: Like(`%${seachText}%`)};
    }
    const result = await this.proxyRepository.find({
      where,
      take: limit * 1,
      skip: (page - 1) * limit
    });
    const count = await this.proxyRepository.count({where});
    return {
      result,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      currentPage: page
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const userId = response.jwtPayload.userId;
    console.log('Guardando ProxyController', request.body, response.jwtPayload)
    return this.proxyRepository.save({...request.body, created_by: userId, userId });
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const item = await this.proxyRepository.findOne({where: { id }});
    console.log('item', item);
    if (item) {
      return this.proxyRepository.update(id,{...request.body});
    }
    console.log('No se encontro el item');
    return {code: 404, message: 'Proxy not found'};
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let itemToRemove = await this.proxyRepository.findOne(request.params.id);
    await this.proxyRepository.remove(itemToRemove);
  }

}