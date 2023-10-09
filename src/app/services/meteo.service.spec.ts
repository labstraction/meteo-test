import { TestBed } from '@angular/core/testing';

import { MeteoService } from './meteo.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('MeteoService', () => {
  let service: MeteoService;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });

    client = TestBed.inject(HttpClient);
    service = TestBed.inject(MeteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create forecast array', () => {
    const testObj = {
      hourly_units: {
        temperature_2m: '°C',
        relativehumidity_2m: '%',
        precipitation_probability: '%',
        cloudcover: '%',
        windspeed_10m: 'km/h',
      },
      hourly: {
        time: ['2023-10-09T00:00', '2023-10-09T01:00', '2023-10-09T02:00'],
        temperature_2m: [19.5, 19.4, 18.9],
        relativehumidity_2m: [93, 94, 94],
        precipitation_probability: [0, 0, 0],
        weathercode: [2, 45, 45],
        cloudcover: [82, 62, 31],
        windspeed_10m: [2.1, 3.3, 4.5],
      },
    };

    const array = service.createForecastArray(testObj);

    expect(array).toBeTruthy();
  });

  it('forecast array shuold have 3 elements', () => {
    const testObj = {
      hourly_units: {
        temperature_2m: '°C',
        relativehumidity_2m: '%',
        precipitation_probability: '%',
        cloudcover: '%',
        windspeed_10m: 'km/h',
      },
      hourly: {
        time: ['2023-10-09T00:00', '2023-10-09T01:00', '2023-10-09T02:00'],
        temperature_2m: [19.5, 19.4, 18.9],
        relativehumidity_2m: [93, 94, 94],
        precipitation_probability: [0, 0, 0],
        weathercode: [2, 45, 45],
        cloudcover: [82, 62, 31],
        windspeed_10m: [2.1, 3.3, 4.5],
      },
    };

    const array = service.createForecastArray(testObj);

    expect(array.length).toEqual(3);
  });

  it('forecast array should contain forecast', () => {
    const testObj = {
      hourly_units: {
        temperature_2m: '°C',
        relativehumidity_2m: '%',
        precipitation_probability: '%',
        cloudcover: '%',
        windspeed_10m: 'km/h',
      },
      hourly: {
        time: ['2023-10-09T00:00', '2023-10-09T01:00', '2023-10-09T02:00'],
        temperature_2m: [19.5, 19.4, 18.9],
        relativehumidity_2m: [93, 94, 94],
        precipitation_probability: [0, 0, 0],
        weathercode: [2, 45, 45],
        cloudcover: [82, 62, 31],
        windspeed_10m: [2.1, 3.3, 4.5],
      },
    };

    const comparisonObj = {
      time: new Date('2023-10-09T00:00'),
      cloudCover: 82,
      windSpeed: 1,
      precipitation: 0,
      humidity: 93,
      temperature: 19.5,
      weatherCode: 2,
      cloudCoverUnit: '%',
      windSpeedUnit: 'Kn',
      precipitationUnit: '%',
      humidityUnit: '%',
      temperatureUnit: '°C',
    };

    const array = service.createForecastArray(testObj);

    expect(array[0]).toEqual(comparisonObj);
  });

  it('should convert Km/h to Knot', () => {

    const startingSpeedArray = [100, 50, 255, 0, 1];

    const speedKnArray = [54, 27, 138, 0, 1];

    const result = startingSpeedArray.map(speed => service.fromKmHToKnot(speed)) ;

    expect(result).toEqual(speedKnArray);

  })

});
