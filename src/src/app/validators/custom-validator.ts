import { AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ApiService } from '../services/api.service';

export class CustomValidator {

  public static emailCheck(service: ApiService): AsyncValidatorFn {
    console.log('emailCheck');
    return (control: AbstractControl): Observable<any> => {
      return service.countEmail(control.value).map(res => {
        console.log(res);
        return !res ? {emailCheck: true} : null;
      });
    };
  }
}