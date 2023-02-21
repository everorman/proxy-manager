import axios from "axios";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Meta } from "../entity";


export class MetaController {

  private metaRepository = getRepository(Meta);

  async rotate(request: Request, response: Response) {
    const externalUrl = await this.metaRepository.findOne({ key: 'rotate-ip' });
    const { id } = request.body;
    const url = externalUrl.value.replace('{id}', id)
    await axios.get(externalUrl.value);
    return {
      status: 200,
      statusText: 'OK'
    };
  }

}