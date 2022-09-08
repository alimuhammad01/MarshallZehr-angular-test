import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observation, RawData } from '../interfaces/observation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor(private http: HttpClient) { }

  getRate(currency: string, date: string | undefined): Observable<RawData> {
    let url = ''
    if (date) {
      url = `${environment.URL}FXCAD${currency}?start_date=${date}&end_date=${date}`
    }
    else { url = `${environment.URL}FXCAD${currency}/json?recent=1` }
    return this.http.get<RawData>(url);
  }
}
