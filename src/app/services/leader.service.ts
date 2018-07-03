import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { delay,map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders');
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leaders/' + id);
  }

  getDesignationLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL +'leaders?designation=true').pipe(map(leaders => leaders[0]));
  }

  getFeaturedLeader(): Observable<Leader> {
  	return this.http.get<Leader[]>(baseURL +'leaders?featured=true').pipe(map(leaders => leaders[0]));
  }

}
