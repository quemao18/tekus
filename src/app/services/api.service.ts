import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBtcPriceByDate(date: string){
    return this.http.get(environment.apiUrl+ `/btc?date=${date}`);
  }
  
}
