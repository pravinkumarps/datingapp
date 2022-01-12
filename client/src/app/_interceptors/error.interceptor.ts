import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastrService: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              error.statusText = 'Bad Request';
              if (error.error.errors) {
                const modelStateErrors = [];
                const errorObj = error.error.errors;
                for (const key in errorObj) {
                  modelStateErrors.push(errorObj[key]);
                }
                throw modelStateErrors.flat();
              } 
              else {
                this.toastrService.error(error.statusText, error.status);
              }
              break;
            case 401:
              error.statusText = 'Unauthorized';
              this.toastrService.error(error.statusText, error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
              case 500:
                error.statusText = 'Internal Server Error'
                const navigationExtras: NavigationExtras = {state: {error: error.error}};
                this.router.navigateByUrl('/server-error', navigationExtras);
                break;
            default:
              this.toastrService.error('something went wrong. Please try after sometime');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
