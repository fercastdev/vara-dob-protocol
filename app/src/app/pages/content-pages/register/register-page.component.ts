import { Component, ViewChild, OnInit } from "@angular/core";
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";
import { MustMatch } from "app/shared/directives/must-match.validator";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponentlol {
  registerFormSubmitted = false;
  isRegisterFailed = false;
  titleUrl = "assets/img/logoText.svg";
  boxUrl = "assets/img/tetrisBox.svg";
  registerForm: FormGroup;
  form: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(this.form.name, Validators.required),
      email: new FormControl(this.form.email, [Validators.required, Validators.email]),
      password: new FormControl(this.form.password, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(this.form.confirmPassword, [Validators.required, Validators.minLength(6), this.matchPassword()]),
      agreeTerms: new FormControl(this.form.agreeTerms, [Validators.required, Validators.requiredTrue]),
    });
  }

  get rf() {
    return this.registerForm.controls;
  }

  matchPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this.form.password !== control.value ? { match: { value: control.value } } : null;
    }
  }

  // On submit button click
  onSubmit() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
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
      .signupUser(this.form)
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.router.navigate(["/home"]);
        },
        (error) => {
          this.spinner.hide();
          console.log("error: ", error);
        }
      );
  }
}
