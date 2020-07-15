import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Identity } from 'src/app/services/identity/identity.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  loginUrl = environment.apiUrl + '/Account/ExternalLogin';
  constructor(
    private authManager: AuthenticationService,
    private identity: Identity, private router: Router,
    private http: HttpClient
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
    const formData = new FormData();
    formData.append('provider', this.form.value.provider);
    formData.append('entryCode', this.form.value.entryCode);
    // debugger;
    this.http.post<any>(this.loginUrl, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    // this.myForm.nativeElement.submit();
  }
}
