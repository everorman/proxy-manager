import { Pipe, PipeTransform } from '@angular/core';
import { TokenStorageService } from '../services';

@Pipe({
  name: 'checkRoleUser'
})
export class CheckRoleUserPipe implements PipeTransform {
  constructor(private tokenStorage: TokenStorageService) { }

  transform(value: unknown, ...args: unknown[]): unknown {
    const currentUser = this.tokenStorage.getUser();
    return currentUser.roles.indexOf(value) > -1;
  }

}
