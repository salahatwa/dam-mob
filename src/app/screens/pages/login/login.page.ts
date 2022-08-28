import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { IonRouterOutlet, Platform } from '@ionic/angular';
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
  authForm: FormGroup;

  constructor(
    private router: Router,
    private common: CommonService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
    this.authForm = this.fb.group({
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
    return this.authForm.controls;
  }


  onLogin() {
    this.common.showSpinner();
    console.log('>>>>>>>sdsdsd:::');
    const credentials = this.authForm.value;
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
