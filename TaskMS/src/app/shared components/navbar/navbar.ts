import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [MenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  currentUser:any;
  showProfileMenu = false;


  constructor(private authService:AuthService, private router:Router){
  }
   toggleProfileMenu(id:string) {
      this.showProfileMenu = !this.showProfileMenu;
    }

    ngOnInit(){
      this.currentUser = this.authService.getUser();
    }

    goToProfile() {
    this.router.navigate(['/profile']);
    this.showProfileMenu = false;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  items = [
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => this.goToProfile()
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => this.logout()
  }
];


}
