import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TemperaturesComponent } from '../temperatures/temperatures.component';
import { AppState } from '../../reducers/cityTempretatures.states';
import * as temperaturesActions from '../../actions/temperatures.actions';

import { ApiServices } from '../../services/temperatures.services';

import {Data} from '../../models/temperatures.model';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

// MAIN CLASS
export class HomeComponent {

  // Component Properties
  public title = 'CitiesTemperature';
  public check = false;
  public citiesTemperatures: Array<object>;
  private _cities: Array<string>; 

  //Constructor
  constructor(
    private _services: ApiServices,
    private store: Store<AppState>
  ){
    this._cities = [
      'Santiago',
      'Buenos Aires',
      'Lima',
      'Sao Paulo'
    ];

    this.citiesTemperatures = [];
  }

  // OnInit
  ngOnInit() {
    this._getTempretaures();
  }

  // Function to show cities temperatures screen
  public showCities() {
    this.check = true;
  }

  // Function to get the cities temperatures
  private _getTempretaures() {
    this._cities.forEach((city) => {
      const date = new Date();

      this._services.getTemperatures(city).subscribe(
        // (res) => this.citiesTemperatures.push(res),
        (res) => { this.addNewData(res.main.temp, res.name, date);
                   this.citiesTemperatures.push(res);
                  },
        (error) => console.error('error', error)
      )
    });
  }

  // Function to add new Cities temperatures to the store
  private addNewData(temp, name, date) {
    this.store.dispatch(new temperaturesActions.historicalTemp({temp: temp, date:date}))
  }
}