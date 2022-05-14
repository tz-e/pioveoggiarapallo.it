import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pioveoggiarapallo.it';

  private weatherData: any;
  private lat: string = "44.35";
  private lon: string = "9.233333";
  private appId: string = "07f800126378a8cba38263e60cbfd1b1";

  private rainingConditions: Array<string> = ['Thunderstorm', 'Drizzle', 'Rain', 'Snow'];

  constructor(private http: HttpClient) { }

  ngOnInit() {   
    this.http.get<any>(`https://api.openweathermap.org/data/2.5/onecall?lat=${ this.lat }&lon=${ this.lon }&exclude=current,minutely,hourly,alerts&appid=${ this.appId }`)
              .subscribe(data => {
                  this.weatherData = data;
    });
}
  private isRaining(){
    return this.rainingConditions.includes(this.weatherData.daily[0].weather[0].main);
  }

  public getClass(){
    return this.isRaining()? 
     'raining'
     :
     'not-raining';
  }

  public getLabel(){
    return this.isRaining()? "Si": "No"
  }
}
