import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errores:any;
  public loginForm: FormGroup;
  public activoSpinner:boolean;
  title= 'tuten';

   // tslint:disable-next-line: max-line-length
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = this.createForm();
    this.errores = '';
  }

  ngOnInit() {
    this.activoSpinner = false;
  }

  get emailuser() { return this.loginForm.get('emailuser'); }
  get password() { return this.loginForm.get('password'); }

  createForm() {
    return new FormGroup({
      emailuser: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)])
    });
  }

  onResetForm(): void {
   this.loginForm.reset();
   this.limpia();
  }


  login():void{
    this.activoSpinner = true;
     if (this.loginForm.valid) {
         this.auth.VerificaUser(this.loginForm.value).subscribe( resp =>{
            this.activoSpinner = false;
            this.router.navigate(['home']);
        }, (error ) => {
         this.errores = error.error;
         this.activoSpinner = false;
        });
         this.onResetForm();
     } else {
      this.limpia();
     }
  }

  limpia(){
    return this.errores = '';
  }

}