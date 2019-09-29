import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import * as moment from 'moment';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

//Components
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { FrontComponent } from './components/front/front.component';

//Services
import { ValidateService } from './services/validate.service';
import { ApiService } from './services/api.service';

//Guards
import { RouteGuard } from './guards/route.guard';

const appRoutes: Routes = [
  {path: '', component: FrontComponent},
  {path: 'front', component: FrontComponent},
  {path: 'home', component: HomeComponent, canActivate:[RouteGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[RouteGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    FrontComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule   
  ],
  providers: [ValidateService, ApiService, RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
