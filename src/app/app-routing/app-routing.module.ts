import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AdminComponent } from '../admin/admin.component';
import { LoginComponent } from '../login/login.component';
import { JudgeComponent } from '../judge/judge.component';
import { AuthGuard } from '../auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'judge',
    component: JudgeComponent, canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
