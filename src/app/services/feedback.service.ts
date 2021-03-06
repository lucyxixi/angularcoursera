import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { RestangularModule,Restangular } from 'ngx-restangular';

import { Feedback, ContactType } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private restangular: Restangular
  ) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
     return this.restangular.all('feedback').post(feedback);
   }
}
