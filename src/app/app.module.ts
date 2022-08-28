import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
// import { File } from '@awesome-cordova-plugins/file/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { SidemenuComponent } from './screens/component/sidemenu/sidemenu.component';
import { HttpTokenInterceptor } from './screens/shared/services/auth/http.token.interceptor';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent, SidemenuComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        })
    ],
    exports:[
        TranslateModule,
        IonicStorageModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
