import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ClientCardComponent } from './shared/components/client/client-card/client-card.component';
import { ClientFormComponent } from './shared/components/client/client-form/client-form.component';
import { ContractedCardComponent } from './shared/components/contracted/contracted-card/contracted-card.component';
import { CraCardComponent } from './shared/components/cra/cra-card/cra-card.component';
import { PersonalInformationsComponent } from './shared/components/personal-informations/personal-informations.component';
import { AppRoutingModule } from './app-routing.module';
import { CraComponent } from './views/cra/cra.component';
import { ClientComponent } from './views/client/client.component';
import { AccountComponent } from './views/account/account.component';
import { ContractedComponent } from './views/contracted/contracted.component';
import {RouterModule} from '@angular/router';
import { AddCraComponent } from './shared/components/cra/add-cra/add-cra.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire' ;
import { AddCraButtonComponent } from './shared/components/cra/add-cra-button/add-cra-button.component';
import { AddContractedCardComponent } from './shared/components/contracted/add-contracted-card/add-contracted-card.component';
import { AddClientCardComponent } from './shared/components/client/add-client-card/add-client-card.component';
import { CraMainComponent } from './views/cra-main/cra-main.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AddContractedModalComponent } from './shared/components/contracted/add-contracted-modal/add-contracted-modal.component';
import { ViewCraDetailsComponent } from './views/view-cra-details/view-cra-details.component';
import { AddClientModalComponent } from './shared/components/client/add-client-modal/add-client-modal.component';
import { MAT_DATE_LOCALE, DateAdapter, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { NativeDateAdapter } from "@angular/material/core";
import { CustomDateAdapter } from './shared/components/calendar/dateAdapter';
import { ViewSearchComponent } from './shared/components/contracted_client_shared/view-search/view-search.component';
import { ViewInCraComponent } from './shared/components/contracted_client_shared/view-in-cra/view-in-cra.component';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActiveReportsModule } from '@grapecity/activereports-angular';





import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { ProfileComponent } from './core/profile/profile.component';
import { BoardUserComponent } from './core/board-user/board-user.component';
import { authInterceptorProviders } from './core/_helpers/auth.interceptor';
import { BoardAdminComponent } from './core/board-admin/board-admin.component';
import { BoardModeratorComponent } from './core/board-moderator/board-moderator.component';
import { LoginRegisterComponent } from './core/login-register/login-register.component';
import { MainComponent } from './layout/main/main.component';
import { SignOutComponent } from './core/sign-out/sign-out.component';
import { ViewContractedDetailsComponent } from './views/view-contracted-details/view-contracted-details.component';
import { ClientMainComponent } from './views/client-main/client-main.component';
import { ContractedMainComponent } from './views/contracted-main/contracted-main.component';
import { ViewClientDetailsComponent } from './views/view-client-details/view-client-details.component';
import { SignatureComponent } from './shared/components/signature/signature.component';
import { SignaturePadModule } from 'angular2-signaturepad';

import { SalesComponent } from './views/sales/sales.component';
import { ArticleComponent } from './shared/components/sales/article/article.component';
import { AddarticleComponent } from './shared/components/sales/addarticle/addarticle.component';
import { ViewArticlesComponent } from './shared/components/sales/view-articles/view-articles.component';
import { AddbillComponent } from './shared/components/sales/addbill/addbill.component';
import { ViewbillComponent } from './shared/components/sales/viewbill/viewbill.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    AppComponent,
    CalendarComponent,
    SidebarComponent,
    ClientCardComponent,
    ClientFormComponent,
    ContractedCardComponent,
    CraCardComponent,
    PersonalInformationsComponent,
    CraComponent,
    ClientComponent,
    AccountComponent,
    ContractedComponent,
    AddCraComponent,
    AddCraButtonComponent,
    AddContractedCardComponent,
    AddClientCardComponent,
    CraMainComponent,
    AddContractedModalComponent,
    ViewCraDetailsComponent,
    AddClientModalComponent,
    ViewSearchComponent,
    ViewInCraComponent,
    LoginRegisterComponent,
    MainComponent,
    SignOutComponent,
    ViewContractedDetailsComponent,
    ClientMainComponent,
    ContractedMainComponent,
    ViewClientDetailsComponent,
    SignatureComponent,
    SalesComponent,
    ArticleComponent,
    AddarticleComponent,
    ViewArticlesComponent,
    AddbillComponent,
    ViewbillComponent,
  ],
    imports: [
      SignaturePadModule,
      ActiveReportsModule,
      NzIconModule,
      NzAutocompleteModule,
      NzInputModule,
      NzProgressModule,
      NzCardModule,
        AngularFireModule,
        NzButtonModule,
        MatNativeDateModule,
       MatRippleModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        A11yModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
        AppRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule


    ],
  providers: [authInterceptorProviders,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClient,
    {provide: DateAdapter, useClass: CustomDateAdapter },
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
