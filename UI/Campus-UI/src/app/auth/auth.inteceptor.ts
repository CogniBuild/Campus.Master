import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');

        if (token != null) {
            const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            })

            return next.handle(clonedRequest).pipe(
                tap(
                    success => { },
                    error => {
                        if (error.status == 401) {

                            localStorage.removeItem('token');
                            this.router.navigate(['']);
                        }
                    }
                )
            );
        }
        else
            return next.handle(req.clone());
    }

}