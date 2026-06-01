import { isPlatformBrowser } from "@angular/common";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // private platformId = inject(PLATFORM_ID);


  
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //     let authToken: string | null = null;

  //     if (isPlatformBrowser(this.platformId)) {
  //     authToken = localStorage.getItem('access_token');
  //   }

  //   // const authToken = 
  //   authToken = localStorage.getItem('access_token');

  //   console.log("auth token res: ", authToken);

  //   if(authToken){
  //     const authReq = req.clone({
  //         setHeaders: {
  //           Authorization:`Bearer ${authToken}`
  //         }
  //     })

  //   console.log("dsjkls");
  //     return next.handle(authReq);
  //   }

  //   return next.handle(req);
  // }


   constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let token: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('access_token');
    }

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    console.log("AuthInterceptor - Request URL:", req.url);
    console.log("AuthInterceptor - Request Headers:", req.headers);
    console.log("Token:", token);

    return next.handle(req);
  }

}