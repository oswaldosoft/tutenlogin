import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isLogged  = false;
  public usuario: any;

  constructor(private authService:AuthService, private router:Router) {
      this.usuario = this.authService;
  }

  Salir(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
