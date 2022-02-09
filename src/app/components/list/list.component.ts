import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ElectronStoreService } from 'src/app/services/electron-store.service';
import { environment } from 'src/environments/environment';

export interface Section {
  price: number;
  date: Date;
  eur: number,
  cop: number,
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  prices: Section[] = [];
  days: number = 14;
  isRefresh: boolean = false;
  error: string = '';

  constructor(
    private apiService: ApiService,
    private route: Router, 
    private electronStoreService: ElectronStoreService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.refresh();
    }, environment.timeRefresh);
    this.prices = this.electronStoreService.isLoadStore() && this.electronStoreService.get('prices') || [];
    this.prices.length === 0 && this.getPrices();
  }

  goToDetails = (price: Section): void => {
    this.route.navigate(["details"], { state: { price: JSON.stringify(price) } });
  }

  getPrices(): void{
    this.error = '';
    this.isRefresh = false;
    this.prices = [];
    let date = new Date();
    for (let index = 0; index < this.days; index++) {
      let newDate = this.addDays(date, - index);
      this.apiService.getBtcPriceByDate(newDate.toISOString().split('T')[0])
      .subscribe((data:any) => {
        if(data && data.error) 
          this.error = data.error.message;
        if(data && data.data){
          this.prices.push({
            price: data.data.amount,
            eur: data.data.amount*environment.eur,
            cop: data.data.amount*environment.cop,
            date: newDate
          });
          this.electronStoreService.isLoadStore() && this.electronStoreService.set('prices', this.prices);
        }
      }, (error: any) => {
        this.error = error.message;
      })
    }
  }

  get sortByDate(){
    return this.prices.sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  refresh(): void{
    this.isRefresh = true;
    let date = new Date();
    this.error = '';
    this.apiService.getBtcPriceByDate(date.toISOString().split('T')[0])
      .subscribe((data:any) => {
        this.prices[0] = {
          price: data.data.amount,
          eur: data.data.amount*environment.eur,
          cop: data.data.amount*environment.cop,
          date: date
        };
        this.isRefresh = false;
      }, (error: any) => {
        this.isRefresh = false;
        this.error = error.message;
      });
  }

  addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }


}
