import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { LoginDto } from '../dto/login.dto';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  
  loginForm:FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      const loginDto:LoginDto = {
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }

      this.authService.login(loginDto).subscribe({
          next: () => {
            console.log('Login successful');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Login failed', err);
          }
      });
    }
  }




}
