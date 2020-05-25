import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-horautc',
  templateUrl: './horautc.component.html',
  styleUrls: ['./horautc.component.css']
})
export class HorautcComponent implements OnInit {
  public horautc;
  public errores:any;
  public horaForm: FormGroup;
  public activoSpinner:boolean;
  private dato2Pattern: any = /^[0-9-]+$/;
  title= 'tuten';

  constructor(private auth: AuthService) {
    this.horaForm = this.createForm();
    this.horautc = '00:00:00';
    this.errores = '';
  }

  ngOnInit() {
    this.activoSpinner = false;
  }

  get dato1() { return this.horaForm.get('dato1'); }
  get dato2() { return this.horaForm.get('dato2'); }

  createForm() {
    return new FormGroup({
      dato1: new FormControl('', [Validators.required]),
      dato2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern(this.dato2Pattern)])
    });
  }

  onResetForm(): void {
   this.horaForm.reset();
   this.limpia();
   this.horautc = '00:00:00';
  }


  hora():void{
    this.activoSpinner = true;
    let temp:number;
    temp =0;
    for(var i = 0; i < this.horaForm.get('dato1').value.length; i++) {
        if (this.horaForm.get('dato1').value[i].toLowerCase() === ':'){
          temp=temp+1;
        } 
   } 
   if(temp<2){
     this.horaForm.get('dato1').setValue(this.horaForm.get('dato1').value+':00');
   }

     if (this.horaForm.valid) {
         this.auth.getutc(this.horaForm.value).subscribe( resp =>{
            this.activoSpinner = false;
           this.horautc = resp.response.time;
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
