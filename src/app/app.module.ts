import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,MatCardModule,MatMenuModule,MatToolbarModule,MatIconModule,MatSelectModule,MatGridListModule,MatDialogModule,MatDialogRef,MatCheckboxModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule, 
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  providers: [ DishService,PromotionService,LeaderService ],
  entryComponents: [
        LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
