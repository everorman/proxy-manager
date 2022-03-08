import {Entity, Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Page extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'string',
    default: '',
  })
  description?: string;
  
  @property({
    type: 'string',
    default: '',
  })
  status?: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Page>) {
    super(data);
  }
}

export interface PageRelations {
  // describe navigational properties here
}

export type PageWithRelations = Page & PageRelations;
