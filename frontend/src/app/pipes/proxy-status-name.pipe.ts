import { Pipe, PipeTransform } from '@angular/core';
import { ProxyStatus } from '../components/proxy/proxy.type';

@Pipe({
  name: 'proxyStatusName'
})
export class ProxyStatusNamePipe implements PipeTransform {

  transform(value: ProxyStatus, ...args: unknown[]): unknown {
    console.log('ProxyStatusNamePipe', value)
    return value[0] === 'ACTIVE' ? 'Active' : 'Inactive';
  }

}
