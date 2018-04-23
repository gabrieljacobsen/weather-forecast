import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WeatherService {  
  private tokenParam = 'token=7abad7661be9228eb219ae406702a95f';
  private url = window.location.protocol + '//apiadvisor.climatempo.com.br/api/v1/';
  cities;
  public weekForecastData;

  constructor(private http: Http) {}

  initializeCities(errorCallback) {
    this.apiRequest<Array<any>>('locale/city?')
        .subscribe(data => this.cities = data.json(),
                   error => errorCallback());
  }

  getCity(city: string, state: string) {
    let params = city ? 'name=' + city : '';
    params += state ? '&state=' + state : '';
    return this.apiRequest<Object>('locale/city?' + params + '&');
  }

  getWeatherForecast(id) {
    return this.apiRequest<Array<any>>(`forecast/locale/${id}/days/15?`);
  }

  apiRequest<T>(req: string) {
    return this.http.get(this.url + req + this.tokenParam);
  }

  getStates() {
    return [{      
      "name": "Selecione um Estado"
    }, {
      "abbrev": "AC",
      "name": "Acre"
    }, {
      "abbrev": "AL",
      "name": "Alagoas"
    }, {
      "abbrev": "AM",
      "name": "Amazonas"
    }, {
      "abbrev": "AP",
      "name": "Amapá"
    },  {
      "abbrev": "BA",
      "name": "Bahia"
    },  {
      "abbrev": "CE",
      "name": "Ceará"
    },  {
      "abbrev": "DF",
      "name": "Distrito Federal"
    },  {
      "abbrev": "ES",
      "name": "Espírito Santo"
    }, {
      "abbrev": "GO",
      "name": "Goiás"
    }, {
      "abbrev": "MA",
      "name": "Maranhão"
    }, {
      "abbrev": "MG",
      "name": "Minas Gerais"
    }, {
      "abbrev": "MS",
      "name": "Mato Grosso do Sul"
    }, {
      "abbrev": "MT",
      "name": "Mato Grosso"
    }, {
      "abbrev": "PA",
      "name": "Pará"
    }, {
      "abbrev": "PB",
      "name": "Paraíba"
    }, {
      "abbrev": "PE",
      "name": "Pernambuco"
    }, {
      "abbrev": "PI",
      "name": "Piauí"
    }, {
      "abbrev": "PR",
      "name": "Paraná"
    }, {
      "abbrev": "RJ",
      "name": "Rio de Janeiro"
    }, {
      "abbrev": "RN",
      "name": "Rio Grande do Norte"
    }, {
      "abbrev": "RO",
      "name": "Rondônia"
    }, {
      "abbrev": "RR",
      "name": "Roraima"
    }, {
      "abbrev": "RS",
      "name": "Rio Grande do Sul"
    }, {
      "abbrev": "SC",
      "name": "Santa Catarina"
    }, {
      "abbrev": "SE",
      "name": "Sergipe"
    }, {
      "abbrev": "SP",
      "name": "São Paulo"
    }, {
      "abbrev": "TO",
      "name": "Tocantins"
    }];
  }
}
