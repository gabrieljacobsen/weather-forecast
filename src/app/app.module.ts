import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { ForecastFilterComponent } from './forecast-filter/forecast-filter.component';
import { WeatherService } from './weather.service';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastFilterComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,  
    FormsModule,
    ChartsModule
  ],
  providers: [WeatherService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
