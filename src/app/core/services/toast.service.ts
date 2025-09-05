import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();
  toastState$ = this.toastSubject.asObservable();

  success(message: string) {
    this.toastSubject.next({ text: message, type: 'success' });
  }

  error(message: string) {
    this.toastSubject.next({ text: message, type: 'error' });
  }
}
