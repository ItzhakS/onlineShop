import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenRequest = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        // }

        return next.handle(tokenRequest);
    }
}