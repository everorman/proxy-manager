import { Pipe, PipeTransform } from '@angular/core';
import { SearchUserType } from '../components/searchUser/searchUser.type';
import { TokenStorageService } from '../services';

@Pipe({
  name: 'formatFullName'
})
export class FormatFullName implements PipeTransform {
  constructor(private tokenStorage: TokenStorageService) { }

  transform(value: SearchUserType, ...args: unknown[]): unknown {
    return `${value.firstName} ${value.lastName} - ${value.email}`;
  }

}
