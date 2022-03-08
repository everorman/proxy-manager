import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Page, PageRelations} from '../models';

export class PageRepository extends DefaultCrudRepository<
  Page,
  typeof Page.prototype.id,
  PageRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Page, dataSource);
  }
}
