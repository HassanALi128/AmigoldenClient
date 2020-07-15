import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Identity } from 'src/app/services/identity/identity.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  form: FormGroup;
  @ViewChild('myForm', {static: false}) myForm: ElementRef;
  loginUrl = environment.apiUrl + '/Account/ExternalLogin';
  constructor(
    private authManager: AuthenticationService,
    private identity: Identity, private router: Router,
    ) {
      this.form = new FormGroup({
        provider: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'change'
        }),
        entryCode : new FormControl('', {
          validators: [Validators.required],
          updateOn: 'change'
        }),
      });
     }
  ngAfterViewInit(): void {
    
  }

  ngOnInit() {
    let qs = window.location.search;
    if (qs.indexOf('?') === 0) {
        qs = qs.substring(1);
    }
    const params = new URLSearchParams(qs);
    const accessTokenParamName = 'access_token';
    const accessToken = params.get(accessTokenParamName);

    if (accessToken) {
        params.delete(accessTokenParamName);
        this.authManager.setAccessToken(accessToken).then(v => {
           this.identity.getCurrentUser().then(u => {
            this.router.navigate(['users']);
          });
        });
    }
  }
  submit() {
    this.myForm.nativeElement.submit();
    // console.log(this.form.value);
  }
}
