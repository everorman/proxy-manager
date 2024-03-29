import { getRepository, Like } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Proxy, User, UserRole } from "../entity";
import { ExternalApis } from "../utilities";
import axios from "axios";


export class ProxyController {

  private proxyRepository = getRepository(Proxy);
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    const { page = 1, limit = 10, seachText = '' } = request.body;
    const { userId } = response.jwtPayload;
    const user = await this.userRepository.findOne({ id: userId });


    let where = {};
    if (user.roles.indexOf(UserRole.USER) >= 0) {
      where['user'] = { id: user.id }
    }
    if (user.roles.indexOf(UserRole.ADMIN) >= 0) {
      where = {};
    }
    if (seachText) {
      where = { ip: Like(`%${seachText}%`) };
    }


    const result = await this.proxyRepository.find({
      where,
      take: limit * 1,
      skip: (page - 1) * limit
    });
    const count = await this.proxyRepository.count({ where });
    return {
      result,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      currentPage: page
    }
  }

  async listByOwner(request: Request, response: Response, next: NextFunction) {
    const { page = 1, limit = 10, seachText = '' } = request.body;

    let where = {};
    if (seachText) {
      where = { ip: Like(`%${seachText}%`) };
    }

    const result = await this.proxyRepository.find({
      where,
      take: limit * 1,
      skip: (page - 1) * limit
    });
    const count = await this.proxyRepository.count({ where });
    return {
      result,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      currentPage: page
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const created_by = response.jwtPayload.userId;
    const { userId, host, description, status, hostUser, hostPassword, urlReset, sock } = request.body;
    const owner = await this.userRepository.findOne(userId);
    const proxy = new Proxy();
    proxy.host = host;
    proxy.description = description;
    proxy.status = status;
    proxy.hostUser = hostUser;
    proxy.hostPassword = hostPassword;
    proxy.created_by = created_by;
    proxy.urlReset = urlReset;
    proxy.sock5 = sock;
    proxy.user = owner;
    console.log('Guardando ProxyController', proxy, response.jwtPayload)
    await this.proxyRepository.save(proxy);
  }

  async reset(request: Request, response: Response) {
    console.log('Reset ProxyController')
    const currentUserId = response.jwtPayload.userId;
    const { hostId } = request.body;
    const host = await this.proxyRepository.findOne({ where: { id: hostId }, relations: ['user'] });
    const currentUser = await this.userRepository.findOne({ id: currentUserId });

    if (currentUser.roles.indexOf(UserRole.ADMIN) >= 0) {
      return this.restHost(host);
    } else {
      if (host.user.id !== currentUserId) {
        return { code: 403, message: 'You are not allowed to reset this host' };
      } else {
        return this.restHost(host);
      }
    }

  }

  private restHost(host: Proxy) {
    axios.get(host.urlReset).then(res => {
      return { code: 200, message: 'Host reseted' };
    }).catch(err => {
      console.log(err);
      return { code: 500, message: 'Error reseting host' };
    });
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const item = await this.proxyRepository.findOne({ where: { id } });
    if (item) {
      return this.proxyRepository.update(id, { ...request.body.proxy });
    }
    return { code: 404, message: 'Proxy not found' };
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let itemToRemove = await this.proxyRepository.findOne(request.params.id);
    await this.proxyRepository.remove(itemToRemove);
  }

}