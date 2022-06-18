import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { json } from 'stream/consumers';
import { RiotInput } from './input';
@Injectable({
  providedIn: 'root'
})
export class RiotService {

  constructor(private http: HttpClient) { }

  getRiotAPI(data: RiotInput):Observable<any> {

    const api_gateway = "https://1rdolqehpd.execute-api.us-east-1.amazonaws.com/winrate"
    console.log(data)
    let request = this.http.post<any>(api_gateway, JSON.stringify(data))
    return request;
    
  }
}
