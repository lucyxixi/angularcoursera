import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders(): Promise<Leader[]> {
  	return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Promise<Leader> {
  	return  Promise.resolve(LEADERS.filter((leade) => (leade.id === id))[0]);
  }

  getDesignationLeader(): Promise<Leader> {
  	return  Promise.resolve(LEADERS.filter((leader) => leader.designation)[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
  	return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }

}

