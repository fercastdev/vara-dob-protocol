import { Component, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "@firebase/util";
import { AuthService } from "app/shared/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;
  titleUrl = "assets/img/Dober-vertical-logo.svg";
  walletImageUrl = "assets/img/walletImage.svg";
  invalidLogin = false;
  mockpassword = "password"

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    //password: new FormControl("", [Validators.required]),
    rememberMe: new FormControl(true),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  get lf() {
    return this.loginForm.controls;
  }

  connectMetamask(){
    var web3 = '';
    this.loginFormSubmitted = true;
    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });
    this.authService.askConnection().then(
      (data) => {
        console.log('data', data)
        web3 = data
        this.authService.getAccounts(web3).then(()=>{
          this.invalidLogin = false;
          this.isLoginFailed = false;
          this.router.navigate(["/home"]);
          this.spinner.hide();          
        })


      }).catch((error) => {
        console.log(error)
        this.invalidLogin = true;
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log("error: " + error);
      });

  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });

    this.authService
      .signinUser(this.loginForm.value.username, this.mockpassword)
      .subscribe(
        (data) => {
          this.invalidLogin = false;
          this.spinner.hide();
          this.router.navigate(["/home"]);
        },
        (error) => {
          this.invalidLogin = true;
          this.isLoginFailed = true;
          this.spinner.hide();
          console.log("error: " + error);
        }
      );

  }
}
