import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { AppComponent } from '../app.component';
import { ForecastComponent } from '../forecast/forecast.component';

@Component({
  selector: 'app-forecast-filter',
  templateUrl: './forecast-filter.component.html',
  styleUrls: ['./forecast-filter.component.css']  
})
export class ForecastFilterComponent implements OnInit {
    
  weekForecastData;  
  currentCities;
  
  city: string;
  selectedCity: string;
  cityId: string;
  state: string;
  states = this.weatherService.getStates();
  defaultPreference = {
    city: localStorage.cityPref !== undefined ? localStorage.cityPref : "Blumenau",
    state: localStorage.statePref !== undefined ? localStorage.statePref : "SC"
  };  
  isOnAutoComplete = false;

  constructor(private weatherService: WeatherService, 
              private alertComponent: AppComponent) {
    weatherService.initializeCities(() => {
      alertComponent.showAlert('Nao foi possível obter a lista de munícipios!', '#f44336')
    });    
  }

  ngOnInit() {
    setTimeout(() => (this.city = this.defaultPreference.city), 0);
  }

  ngAfterViewInit() {
    const select = (<HTMLInputElement>document.getElementById("stateSelect"));
    select.value = this.defaultPreference.state;
    this.state = select.value;
    this.stateSelectChange({currentTarget: select});    
  }

  autocompleteClick(value) {
    this.currentCities = [];
    this.city = value.name;
    this.cityId = value.id;
    this.isOnAutoComplete = false;
  }

  getForecast() {
    if (this.cityId) {
        this.getForeCastById(this.cityId);
    } else if (this.city) {
      this.weatherService.getCity(this.city, this.state).subscribe(cityResult => {
        const firstResult = cityResult.json()[0];
        if (firstResult) {
          this.getForeCastById(firstResult.id);
        } else {
          this.alertComponent.showAlert('Município não encontrado!', '#f44336');
        }
      }, error => this.alertComponent.showAlert('Não foi possível retornar os dados!', '#f44336'));
    } else {
      this.alertComponent.showAlert('Preencha os campos necessários!', '#2196F3');
    }
  }

  getForeCastById(id) {
    this.weatherService.getWeatherForecast(id).subscribe(result => {
      if (result) {        
        this.weekForecastData = result.json().data;
        this.selectedCity = result.json().name;
      } else {
        this.alertComponent.showAlert('Município não encontrado!', '#f44336');
      }
    }, error => this.alertComponent.showAlert('Não foi possível retornar os dados!', '#f44336'));
  }

  stateSelectClick(e) {
    e.target.parentElement.classList.toggle('open');
  }

  stateSelectChange(e) {
    document.getElementById('label-desc').innerHTML = 
      e.currentTarget.options[e.currentTarget.selectedIndex].innerText;
    this.state = (<HTMLInputElement>document.getElementById("stateSelect")).value;
    this.cityId = null;
  }  

  autoCompleteEnter() {    
    this.isOnAutoComplete = true;
  } 

  autoCompleteOut(e) { 
    const element = e.toElement ? e.toElement : e.relatedTarget;
    if (element.tagName !== "STRONG" && element.className !== "autocompleteItem") {      
      this.isOnAutoComplete = false;
    }
  }

  savePreferences() {
    localStorage.cityPref = this.city;
    localStorage.statePref = (<HTMLInputElement>document.getElementById("stateSelect")).value;
    this.alertComponent.showAlert('Preferências salvas!', '#2196F3');
  }

  getAutocompleteDesc(cityName: string) {    
    return cityName.replace(new RegExp(this.city + '+', 'gi'), 
                           (match) => `<strong>${match}</strong>`);
  }  

  cityOnChange(cityDesc) {
    this.cityId = null; 
    if (cityDesc.length > 2) {
      this.currentCities = this.weatherService.cities.filter(city => {
        const stateMatch = this.state ? city.state == this.state : true;
        const cityMatch = city.name.toUpperCase().includes(cityDesc.toUpperCase());
        return stateMatch && cityMatch;
      });
    } else {
      this.currentCities = [];
    }
  }

  cityBlur(e) {
    if (!this.isOnAutoComplete) {
      this.currentCities = [];
    }
  }

  cityKeyDown(e) {
    if (e.keyCode == 27) {
      this.currentCities = [];
    } else if (e.keyCode == 13) {
      this.getForecast();
    }
  }  

  showAlert(message: string, color: string) {
    this.alertComponent.showAlert(message, color);
  }
}
