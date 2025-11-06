import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private httpClient:HttpClient){}
  private baseURL:string='http://localhost:8080';
  
  // define array to hold messages
  public times: any;
  public time: string = '';
  public message: string = ''; // singlular obj
  public messages: any; // array of objs
  private postUrl:string = this.baseURL + '/room/reservation/v1';
  public submitted!:boolean;
  roomsearch! : FormGroup;
  rooms! : Room[];
  request!:ReserveRoomRequest;
  currentCheckInVal!:string;
  currentCheckOutVal!:string;

    // make api call to get times
    getTime(): Observable<object> {
      return this.httpClient.get("http://localhost:8080/time", {responseType: 'json'});
    }
  // make api call converted messages
    getData(): Observable<object> {
      return this.httpClient.get("http://localhost:8080/messages", {responseType: 'json'});
    }

    ngOnInit(){
      this.getTime().subscribe((data => {
        this.times = data;
        console.log("Data coming back from api: " + data);
      }));
      this.getData().subscribe((data => {
        this.messages = data;
      }));
      this.roomsearch= new FormGroup({
        checkin: new FormControl(' '),
        checkout: new FormControl(' '),
      });

    const roomsearchValueChanges$ = this.roomsearch.valueChanges;

    // subscribe to the stream
    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });
  } 
    onSubmit({value,valid}:{value:Roomsearch,valid:boolean}){
      this.getAll().subscribe(
        rooms => {console.log(Object.values(rooms)[0]);this.rooms=<Room[]>Object.values(rooms)[0]; }
      );
    }
    reserveRoom(value:string){
      this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);
      this.createReservation(this.request);
    }
    createReservation(body:ReserveRoomRequest) {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
     // let options = new RequestOptions({headers: headers}); // Create a request option
     const options = {
      headers: new HttpHeaders().append('key', 'value'),
    }
      this.httpClient.post(this.postUrl, body, options)
        .subscribe(res => console.log(res));
    }

    getAll(): Observable<any> {
       return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin='+ this.currentCheckInVal + '&checkout='+this.currentCheckOutVal, {responseType: 'json'});
    }
  }

export interface Roomsearch {
    checkin:string;
    checkout:string;
  }

export interface Room {
  id:string;
  roomNumber:string;
  price:string;
  links:string;
}
export class ReserveRoomRequest {
  roomId:string;
  checkin:string;
  checkout:string;

  constructor(roomId:string, checkin:string, checkout:string) {
    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}