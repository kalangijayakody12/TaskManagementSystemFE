import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../features/auth/dto/login.dto';
import { RegisterDto } from '../features/auth/dto/register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  login(loginDto:LoginDto) {
    return this.http.post(`${this.apiUrl}/auth/login`, loginDto);
  }

  register(registerDto:RegisterDto){
    return this.http.post(`${this.apiUrl}/auth/register`, registerDto);
  }

}
