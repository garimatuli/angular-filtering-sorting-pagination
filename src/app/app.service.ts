import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private dataUrl = 'assets/data.json'
  constructor(private http: HttpClient) {
  }
  // data = [
  //   {
  //     "category": 'food',
  //     "amount": 10
  //   }, {
  //     "category": 'movie',
  //     "amount": 30
  //   }, {
  //     "category": 'abc',
  //     "amount": 20
  //   }
  // ];
  getDataService() {
     console.log(this.http.get(this.dataUrl));
     return this.http.get(this.dataUrl);
    // return of(this.data);
  }

  filterData(searchEl) {
    // let x = arr.find(el => el===searchEl)
  }
}
