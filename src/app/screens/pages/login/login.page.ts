import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
// import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../../shared/services/auth/user.service';
import { CommonService } from '../../shared/services/common.service';
import { ToastService, ToastType } from '../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;
  errorMessages = '';
  loader: HTMLIonLoadingElement;

  showPassword: string = 'password';
  form: FormGroup;

  containerClass: string = '';
  username: string = "";
  password = "";
  appLang: string;
  direction: string = 'rtl';

  loading:boolean=false;

  constructor(
    private router: Router,
    private common: CommonService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
    this.form = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.platform.ready().then(() => {
    //   GoogleAuth.initialize({
    //     clientId: environment.googleClientid,
    //     scopes: ['profile', 'email'],
    //     grantOfflineAccess: true,
    //   });
    // });
  }

  get f() {
    return this.form.controls;
  }

  setKeyboardClass(check) {
    this.containerClass = check ? 'keyboard-is-open' : ''
  }

  preventSpaceInUserName(value) {
    this.username = value.replaceAll(' ', '');
  }

  preventSpaceInPassword(value) {
    this.password = value.replaceAll(' ', '');
  }

  onLogin() {
    this.common.showSpinner();
    console.log('>>>>>>>sdsdsd:::');
    const credentials = this.form.value;
    this.userService
      .attemptAuth('login', credentials)
      .pipe(finalize(() => {
        this.common.hideSpinner();
      }))
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/home/listing'], { replaceUrl: true });
        },
        err => {
          console.log(err);
          this.toastService.showToast(err.message, ToastType.DANGER);
          // this.errorMessages = err.error?.status ? err.error.status : 'Something went wrong, Please try again later';
        }
      );


  }

  goToForgot(){

  }

  changeLang() {
    if (this.translate.currentLang == 'en') {
      this.appLang = 'ar'
      this.handleLanguagePreferences('ar');
      this.direction = 'rtl';
    } else {
      this.handleLanguagePreferences('en');
      this.appLang = 'en'
      this.direction = 'ltr';
    }
  }

  handleLanguagePreferences(lang: string) {
    if (lang == 'ar') {
      this.translate.setDefaultLang('ar');
      this.translate.use('ar');
      this.appLang = 'ar';
      this.document.documentElement.dir = 'rtl';
    } else if (lang == 'en') {
      this.translate.setDefaultLang('en');
      this.appLang = 'en';
      this.translate.use('en');
      this.document.documentElement.dir = 'ltr';
    }
    // Settings.setUserPreferences(Constants._SETTINGS._PREFERRED_LANG, lang);
    // localStorage.setItem(Constants._SETTINGS._PREFERRED_LANG, lang.toString());
  }

  gLogin() {
    // this.common.showSpinner();
    // GoogleAuth.signIn().then((res: any) => {
    //   const credential = GoogleAuthProvider.credential(res.authentication.idToken, res.authentication.accessToken);
    //   this.auth.signInWithCredential(credential)
    //     .then(user => {
    //       const customUser: IUser = {
    //         name: user.user.displayName,
    //         email: user.user.email,
    //         imageUrl: user.user.photoURL,
    //         id: user.user.uid,
    //       };
    //       this.supabase.saveUser(customUser).then((userRes: IUser) => {
    //         // this.user.setUser(customUser);
    //         this.common.hideSpinner();
    //         this.router.navigate(['/dashboard'], { replaceUrl: true });
    //       });
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // }).catch(err => {
    //   this.common.hideSpinner();
    //   console.log(err);
    //   this.errorMessages = err.error?.status ? err.error.status : 'Something went wrong, Please try again later';
    // });
  }
}
