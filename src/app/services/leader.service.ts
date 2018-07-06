import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { delay,map } from 'rxjs/operators';


import { Leader } from '../shared/leader';


import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one( 'leaders',id).get();
  }

  getDesignationLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({designation: true}).pipe(map(leaders => leaders[0]));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true}).pipe(map(leaders => leaders[0]));
  }

}
