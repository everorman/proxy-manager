import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'formControl'
})
export class FormControlPipe implements PipeTransform {

  transform(value: AbstractControl | null): FormControl {
    if(!value) return new FormControl();
    return value as FormControl;
}

}
