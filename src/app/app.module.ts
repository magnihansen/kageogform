import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import * as $ from 'jquery';

import { environment } from '../environments/environment';

import { AuthService } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// https://github.com/Sibiraj-S/ngx-editor
import { NgxEditorModule } from 'ngx-editor';

import { AppComponent } from './app.component';
import { HeadercontentComponent } from './components/headercontent/headercontent.component';
import { SliderComponent } from './components/slider/slider.component';
import { ServicetabsComponent } from './components/servicetabs/servicetabs.component';
import { AboutComponent } from './components/about/about.component';
import { LogosComponent } from './components/logos/logos.component';
import { KontaktComponent } from './components/kontakt/kontakt.component';
import { MapsComponent } from './components/maps/maps.component';
import { ChooseComponent } from './components/choose/choose.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { TeamComponent } from './components/team/team.component';
import { OthersserviceComponent } from './components/othersservice/othersservice.component';
import { CounterComponent } from './components/counter/counter.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialComponent } from './components/social/social.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PageeditComponent } from './components/admin/pageedit/pageedit.component';
import { ContenteditComponent } from './components/admin/contentedit/contentedit.component';
import { LoginComponent } from './components/login/login.component';
import { RouterpagecontentComponent } from './components/routerpagecontent/routerpagecontent.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';

import { ContentService } from './services/content.service';
import { ContenttypeService } from './services/contenttype.service';
import { MessageService } from './services/message.service';

const appRoutes: Routes = [
  { path: 'forside', component: MainpageComponent, pathMatch: 'full', data: {title: 'Kage og form'} },
  { path: 'login', component: LoginComponent, pathMatch: 'full', data: {title: 'Login'} },
  { path: 'admin/dashboard', component: DashboardComponent, pathMatch: 'full', data: {title: 'Dashboard'} },
  { path: 'admin/content/:id', component: PageeditComponent, pathMatch: 'full', data: {title: 'Edit page'} },
  // { path: 'admin/contact', component: ContacteditComponent, pathMatch: 'full', data: {title: 'Contacts'} },
  // { path: 'admin/slides', component: SlideeditComponent, pathMatch: 'full', data: {title: 'Slides'} },
  { path: '', redirectTo: '/forside', pathMatch: 'full' },
  { path: '**', component: AppComponent, data: {title: '404 Not Found'}  }
];

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HeadercontentComponent,
    SliderComponent,
    ServicetabsComponent,
    AboutComponent,
    LogosComponent,
    KontaktComponent,
    MapsComponent,
    ChooseComponent,
    PortfolioComponent,
    TestimonialComponent,
    TeamComponent,
    OthersserviceComponent,
    CounterComponent,
    FooterComponent,
    SocialComponent,
    DashboardComponent,
    PageeditComponent,
    ContenteditComponent,
    LoginComponent,
    RouterpagecontentComponent,
    MainpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    NgxEditorModule,
    SlickCarouselModule
  ],
  providers: [ FirebaseService, AngularFireDatabase, AuthService, ContentService,
    ContenttypeService, MessageService,
    Title, {provide: APP_BASE_HREF, useValue: '/'} ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
