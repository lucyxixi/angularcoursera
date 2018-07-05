import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';

import { Dish } from '../shared/dish';
import {Comment} from '../shared/comment';
import { DishService } from '../services/dish.service';
import { visibility } from '../animations/app.animation';
import { flyInOut,expand } from '../animations/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility()
  ],
    // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  comment: Comment;
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  dishErrMess: string;
  dishcopy = null;
  visibility = 'shown';

  commentForm: FormGroup;

   formErrors = {
     'author':'',
     'comment':'',
   };

   validationMessages = {
     'author': {
       'required':      'Name is required.',
       'minlength':     'Name must be at least 2 characters long.',
       'maxlength':     'Name cannot be more than 25 characters long.'
     },
     'comment': {
       'required':      'comment is required.'
     },
   };


  constructor( private dishservice: DishService,
  	private route: ActivatedRoute,
  	private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {

    }

    ngOnInit() {
      this.createForm();// comment form creation
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.dishErrMess = <any>errmess.message);
      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },errmess => this.dishErrMess = <any>errmess.message);
      this.route.params.switchMap((params: Params) => { return this.dishservice.getDish(+params['id']); }).subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },errmess => {  this.dish = null; this.dishErrMess = <any>errmess.message; });


    }

    setPrevNext(dishId: number) {
      let index = this.dishIds.indexOf(dishId);
      let len = this.dishIds.length;
      this.prev = this.dishIds[(len + index - 1) % len];
      this.next = this.dishIds[(len + index + 1) % len];
    }

    goBack(): void {
    	this.location.back();
    }

    createForm(){
  this.commentForm = this.fb.group(
    {
      author : ['',
      [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment : ['',[Validators.required]],
      date : '',
      rating : [5]
    });
    this.commentForm.valueChanges
    .subscribe( data => this.onValueChanged(data));

    this.onValueChanged();
    }

    onSubmit() {
      this.comment = this.commentForm.value;
      this.comment.date = new Date().toISOString();
      this.dishcopy.comments.push(this.comment);

      this.dishcopy.save()
      .subscribe(dish => this.dish = dish);

      console.log(this.comment);
           this.commentForm.reset({
             author: '',
             rating: 5,
             comment: '',
             date : ''
           });
    }

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }

}
