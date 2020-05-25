import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, from} from 'rxjs';
import {catchError,  map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public headers;
  public info: any = [];
  private tokenTuten;
  private rutasTuten;

  constructor(private httpClient: HttpClient) {
    this.tokenTuten = '';
    this.rutasTuten = '';

   }

  getutc(model:any){
  //this.rutasTuten =  'http://localhost:8080/api/hora_utc';
this.rutasTuten =  'https://horautc.herokuapp.com/api/hora_utc';
  const httpOptions = {
    headers: new HttpHeaders({
      'Accept':  'application/json',
      'Content-Type' : 'application/json'
    }),params:{
      'dato1':model.dato1,
      'dato2':model.dato2
    }
  };
  return this.httpClient.post<any>(this.rutasTuten,null, httpOptions).pipe(map(resp=>{
return resp;
  }));
}

   VerificaUser(model:any){
    this.rutasTuten =  'https://dev.tuten.cl/TutenREST/rest/user/'+model.emailuser;
     this.headers = new HttpHeaders({Accept: 'application/json','Content-Type':'application/json', password : model.password, app : 'APP_BCK' });
    return this.httpClient.put<any>(this.rutasTuten,  null, {headers: this.headers}).pipe(map(res=>{
      if(res.sessionTokenBck){
        localStorage.setItem('token', res.sessionTokenBck);
        localStorage.setItem('email', res.email);
        return res;
      }
    }));

   }

   stateUser(){ return localStorage.getItem('token');}
   getUser(){   return localStorage.getItem('email');}
   logout() { localStorage.removeItem('token'); localStorage.removeItem('email'); localStorage.clear();}

   getBookings(){
    this.rutasTuten ='https://dev.tuten.cl:443/TutenREST/rest/user/contacto%40tuten.cl/bookings';
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':'application/json',
        adminemail: localStorage.getItem('email'),
        token : localStorage.getItem('token'),
        app : 'APP_BCK'
      }),
      params: {
        current:'true'
      },
    };
    return this.httpClient.get<any>(this.rutasTuten , options);
  }
}