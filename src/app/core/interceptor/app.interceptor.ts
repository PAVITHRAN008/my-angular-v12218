import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/users')) {
      this.spinner.show();
      return next.handle(req).pipe(
        finalize(() => this.spinner.hide())
      );
    }
    return next.handle(req);
  }
}


@Injectable()
export class ToastInterceptor implements HttpInterceptor {
  constructor(private toast: ToastService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            const body = event.body;
              if (body?.data?.success && body?.data?.message) {
                this.toast.success(body?.data?.message);
              }

              if (body?.data?.success === false && body?.data?.message) {
                this.toast.error(body?.data?.message);
              }
          }
        },
        error: (error: HttpErrorResponse) => {
          const errorMsg = error?.error?.message || 'Something went wrong!';
          this.toast.error(errorMsg);
        }
      })
    );
  }

}
