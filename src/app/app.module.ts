import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JudgeComponent } from './judge/judge.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';

import { AuthGuard } from './auth.guard';
import { ManageJudgesComponent } from './manage-judges/manage-judges.component';
import { ManageContestantsComponent } from './manage-contestants/manage-contestants.component';
import { HighlightDirective } from './highlight.directive';
// import { MobxAngularModule } from 'mobx-angular';
import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    JudgeComponent,
    AdminComponent,
    ManageJudgesComponent,
    ManageContestantsComponent,
    HighlightDirective,
    ResultsComponent
  ],
  imports: [
    Ng2SmartTableModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    // MobxAngularModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
