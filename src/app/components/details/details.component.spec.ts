import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      providers: [ {provide: Router, useClass: RouterStub}]
    })
    .compileComponents();
  });

  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatListModule], 
    declarations: [ DetailsComponent, MenuComponent ]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

class RouterStub{
  getCurrentNavigation(){
    return {
       extras: {
          state:{
            price: JSON.stringify({
              price: 10000,
              eur: 9000, 
              cop: 2505250,
              date: "2022-02-01"
            })
          }
        }
      }
    }
 }
