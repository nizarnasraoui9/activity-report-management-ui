import { NgModule } from '@angular/core';
import { CraComponent } from './views/cra/cra.component';
import { ClientComponent } from './views/client/client.component';
import { AccountComponent } from './views/account/account.component';
import { RouterModule, Routes} from '@angular/router';
import {ContractedComponent} from './views/contracted/contracted.component';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { CraMainComponent } from './views/cra-main/cra-main.component';
import {ViewCraDetailsComponent} from './views/view-cra-details/view-cra-details.component';
import {HomeComponent} from './core/home/home.component';
import {RegisterComponent} from './core/register/register.component';
import {LoginComponent} from './core/login/login.component';
import {ProfileComponent} from './core/profile/profile.component';
import {BoardUserComponent} from './core/board-user/board-user.component';
import {BoardModeratorComponent} from './core/board-moderator/board-moderator.component';
import {BoardAdminComponent} from './core/board-admin/board-admin.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import { AddCraButtonComponent } from './shared/components/cra/add-cra-button/add-cra-button.component';
import { AuthService } from "./shared/services/auth.service";
import { ViewContractedDetailsComponent } from "./views/view-contracted-details/view-contracted-details.component"
import { ViewClientDetailsComponent } from "./views/view-client-details/view-client-details.component"
import { ClientMainComponent } from "./views/client-main/client-main.component"
import { ContractedMainComponent } from "./views/contracted-main/contracted-main.component"
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard"
import { AngularFireAuthGuard, loggedIn, redirectLoggedInTo } from '@angular/fire/auth-guard';


import { AuthGuard } from "./shared/guard/auth.guard";
import { SalesComponent } from './views/sales/sales.component';
import { ArticleComponent } from './shared/components/sales/article/article.component';
import { AddarticleComponent } from './shared/components/sales/addarticle/addarticle.component';
import { ViewArticlesComponent } from './shared/components/sales/view-articles/view-articles.component';
import { ViewbillComponent } from './shared/components/sales/viewbill/viewbill.component';
import { AddbillComponent } from './shared/components/sales/addbill/addbill.component';
import { ConsultantsComponent} from './shared/components/sales/consultants/consultants.component'
import { ConsultantsService } from './shared/services/consultants.service';

/*
const routes: Routes = [

  {path: 'cra', component: CraMainComponent,
  children: [
    {path: '', component: CraComponent},
    {path: ':id', component: ViewCraDetailsComponent}
  ]



},
  {path: 'client', component: ClientComponent},
  {path: 'contracted', component: ContractedComponent},
  {path: 'account', component: AccountComponent},
  {path: '', redirectTo: 'cra', pathMatch: 'full'}

];

 */

const routes: Routes = [
  {path: 'main', component: SidebarComponent, children:[
    {path:'consultants',component: ConsultantsComponent},
    {path: 'cra', component: CraMainComponent,
    children: [
      {path: '', component: CraComponent},
      {path: ':id', component: ViewCraDetailsComponent},

    ],canActivate: [AuthGuard]
  },
  {path: 'client', component: ClientMainComponent ,
   children: [
    {path: '', component: ClientComponent},
    {path: ':id', component: ViewClientDetailsComponent},

  ],canActivate: [AuthGuard]
},
  {path: 'sales',component: SalesComponent, children:[
    {path:'bill',component:ViewbillComponent},
    {path:'bill/add',component:AddbillComponent},
    {path:'article',component:ArticleComponent},
    {path:'article/add',component: AddarticleComponent},
  ]},
  {path: 'contracted', component: ContractedMainComponent ,
  children: [
    {path: '', component: ContractedComponent},
    {path: ':id', component: ViewContractedDetailsComponent},

  ],canActivate: [AuthGuard]},

  {path: 'account', component: AccountComponent,canActivate: [AuthGuard],
    children: [
      {path: '', component: AccountComponent},
      {path: ':id', component: AccountComponent},
    ]
  },
  
  {path: 'login', component: LoginComponent},
  ]},

  { path: 'home', component: HomeComponent, },
  {path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent,canActivate: [AuthGuard] },
  { path: 'add' , component: AddCraButtonComponent,canActivate: [AuthGuard]},
  { path: 'admin', component: BoardAdminComponent },
  { path: 'add' , component: AddCraButtonComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
