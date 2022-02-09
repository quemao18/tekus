import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '../list/list.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  data: Section = {price: 0, eur: 0, cop: 0, date: new Date()};

  constructor(private router: Router) { 
    let nav:any = this.router.getCurrentNavigation();
    this.data = JSON.parse(nav.extras.state.price); 
  }

  ngOnInit(): void {
  }

}
