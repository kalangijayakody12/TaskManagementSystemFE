import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginDto } from '../features/auth/dto/login.dto';
import { RegisterDto } from '../features/auth/dto/register.dto';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:3000`;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(loginDto:LoginDto):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`, loginDto);
  }

  register(registerDto:RegisterDto):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/register`, registerDto);
  }

  getRole():string|null{
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('userRole');
  }

  hasRole(role:string):boolean{
    return this.getRole() ===role;
  }

  hasAnyRole(roles:string[]):boolean {
    const userRole = this.getRole();
    return userRole? roles.includes(userRole):false;
  }

  getUser(){
    // return this.user;
    const user = localStorage.getItem('user');
    console.log("checking user stroing ",user);

    return user ? JSON.parse(user) : null;
  }

}
