import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Booking } from '../interfaces/booking';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
 // public datos:any;
  public info: Booking[]=[];

  constructor(private authService:AuthService) {   }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
    }
    };
   this.ShowFields();

  }

  ShowFields(){
  return this.authService.getBookings().subscribe(
      (res)=>{
        for (let index = 0; index < res.length; index++) {
            this.info.push({
             'bookingId':                 res[index].bookingId,
             'tutenUserClient_firstName': res[index].tutenUserClient.firstName,
             'tutenUserClient_lastName':  res[index].tutenUserClient.lastName,
             'bookingTime':               res[index].bookingTime,
             'locationId_streetAddress':  res[index].locationId.streetAddress,
             'bookingPrice':              res[index].bookingPrice
            });
            if(res[index].parentBooking){
               this.ParentBooking(res[index].parentBooking);
             }
         }
         this.dtTrigger.next();
      },error=>{
        console.log(error);
      }
    );

  }

ParentBooking(parent:any){
    this.info.push({
      'bookingId':                 parent.bookingId,
      'tutenUserClient_firstName': parent.tutenUserClient.firstName,
      'tutenUserClient_lastName':  parent.tutenUserClient.lastName,
      'bookingTime':               parent.bookingTime,
      'locationId_streetAddress':  parent.locationId.streetAddress,
      'bookingPrice':              parent.bookingPrice
     });
    if(parent.parentBooking){
        this.ParentBooking(parent.parentBooking);
      }else{
        return
   }

}

}
