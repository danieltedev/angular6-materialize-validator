import { Renderer2, QueryList, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export class CustomRenderValidator {

  constructor() { }

  public invalid(nameField: string, queryList: QueryList<ElementRef<any>>, control: AbstractControl, renderer: Renderer2) {
    console.log('invalid');
    const el = queryList.find(elr => elr.nativeElement.id === nameField);

    renderer.addClass(el.nativeElement, 'invalid');
    renderer.removeClass(el.nativeElement, 'valid');
    renderer.removeClass(el.nativeElement, 'pending');
  }

  public valid(nameField: string, queryList: QueryList<ElementRef<any>>, control: AbstractControl, renderer: Renderer2) {
    console.log('valid');
    const el = queryList.find(elr => elr.nativeElement.id === nameField);

    renderer.addClass(el.nativeElement, 'valid');
    renderer.removeClass(el.nativeElement, 'invalid');
    renderer.removeClass(el.nativeElement, 'pending');
  }

  public pending(nameField: string, queryList: QueryList<ElementRef<any>>, control: AbstractControl, renderer: Renderer2) {
    console.log('pending');
    const el = queryList.find(elr => elr.nativeElement.id === nameField);

    renderer.addClass(el.nativeElement, 'pending');
    renderer.removeClass(el.nativeElement, 'valid');
    renderer.removeClass(el.nativeElement, 'invalid');
  }
}