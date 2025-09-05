import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { userState } from './core/stateManagement/state/state.service';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './core/guards/authGuard.guard';
import { LoadingInterceptor, ToastInterceptor } from './core/interceptor/app.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxSpinnerModule,
    NgxsModule.forRoot(
      [
        userState,
      ],
      { developmentMode: !environment.production }
    ),
    NgxsStoragePluginModule.forRoot({ key: ['userDetails'] }),
  ],
  providers: [
     AuthGuard,
     { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: ToastInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
