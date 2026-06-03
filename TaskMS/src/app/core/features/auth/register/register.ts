import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

export class Register {

  registerForm:FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router){
    this.registerForm = this.fb.group({
      name:[ '', [Validators.required] ],
      email:[ '', [Validators.required, Validators.email] ],
      password:[ '', [Validators.required, Validators.minLength(6)] ],
      confirmPassword:[ '', [Validators.required] ],
      role:[ '', [Validators.required] ]
    })
  }

  onSubmit(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      const registerDto = {
        name:this.registerForm.value.name,
        email:this.registerForm.value.email,
        password:this.registerForm.value.password,
        confirmPassword:this.registerForm.value.confirmPassword,
        role:this.registerForm.value.role
      }

      this.authService.register(registerDto).subscribe({
        next: (res) =>{
          console.log('Registration successful', res);
          localStorage.setItem('access_token', res.accessToken);
          console.log(
            'Stored token:',
            localStorage.getItem('access_token')
          );
          localStorage.setItem('userRole', res.role);
          this.router.navigate(['/dashboard']);
        },
        error : (err) =>{
          console.error('Registration failed', err);
        }

      });
    }
  }

  
}
