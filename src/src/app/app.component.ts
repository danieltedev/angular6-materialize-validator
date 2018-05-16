import { Component, OnInit, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import 'jquery';

import 'hammerjs';

import 'materialize-css';

import { Server } from './domain/server';
import { Usuario } from './domain/usuario';
import { ApiService } from './services/api.service';
import { CustomValidator } from './validators/custom-validator';
import { CustomRenderValidator } from './validators/custom-render-validator'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular 6';
  usuario: FormGroup;
  emailForm: FormGroup;

  @ViewChildren('input') inputs: QueryList<ElementRef>;

  constructor(
    private _http: Http,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private apiService: ApiService
    ) { }

  createForm() {
    this.usuario = this.fb.group({
      nome: [''],
      email: [''],
      senha: this.fb.group({
        valor: [''],
        confirmar: ['']
      }),
      login: ['']
    });

    this.emailForm = this.fb.group({
      email: [
        null,
        [Validators.required],
        CustomValidator.emailCheck(this.apiService)
      ]
    })
  }

  ngOnInit() {
    console.log("OnInit")

    this.createForm();
    this.usuario.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(data => {
        console.log(data);
      });

    console.log(this.usuario.value)

    this._http.get("/assets/server.json")
      .map(data => data.json() as Server)
      .switchMap(data => this._http.get(data.uriUsuario))
      .map(data => data.json() as Usuario)
      .subscribe(data => console.log(data));

    const usu = this.usuario.value;
    usu.senha = usu.senha.valor;

    Object.keys(this.emailForm.value).forEach(e => {
      this.emailForm.get(e).statusChanges.subscribe((v: string) => {
        const cr = new CustomRenderValidator();
        cr[v.toLowerCase()](e, this.inputs, this.emailForm.get(e), this.renderer);
      })
    });
  }
}
