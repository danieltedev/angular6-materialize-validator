import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// import { map, switchMap, filter } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

import { Usuario } from '../domain/usuario';

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  public countEmail(email: string): Observable<any> {
    console.log('countEmail');
    return this._http.get('/assets/usuario.json')
      .map(res => {
        console.log((res.json() as Array<Usuario>).find(u => u.email.includes(email)));
        return (res.json() as Array<Usuario>).find(u => u.email.includes(email));
      });
  }

}