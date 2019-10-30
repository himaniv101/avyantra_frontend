import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "../shared/service/login.service";
import { Common } from "../shared/service/common/common";
@Component({
  selector: 'app-referral-signup',
  templateUrl: './referral-signup.component.html',
  styleUrls: ['./referral-signup.component.css']
})
export class ReferralSignupComponent implements OnInit {
  signupReferralForm: FormGroup;
  submitted = false;
  public namePatters = { 'S': { pattern: new RegExp('\[a-zA-Z \]') } };
  public customPatterns = { 'S': { pattern: new RegExp('\[a-zA-Z0-9_*!@#$%&-/, \]') } };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private api: LoginService,
    private commonAsyn: Common
  ) { }

  ngOnInit() {
    this.commonAsyn.isHide();
    this.createForm();
  }

  createForm() {
    this.signupReferralForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(15)]],
      lastName: ["", [Validators.required, Validators.maxLength(15)]],
      userName: ["", [Validators.required, Validators.minLength(6)]],
      contactNumber: ["", [Validators.required, Validators.minLength(10)]],
      email: ["", [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      address: ["", [Validators.required]],
      city: ["", [Validators.required, Validators.maxLength(32)]],
      state: ["", [Validators.required, Validators.maxLength(32)]],
      pincode: ["", [Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.maxLength(15)]]
    });
  }

  async signup() {
    this.submitted = true;
    if (this.signupReferralForm.invalid) {
      return;
    }
    const signupResponse = await this.api.referral_signup(this.signupReferralForm.value);
    signupResponse.subscribe(
      response => {
        this.success(response, "signup");
      },
      error => {
        console.error("errro", error);
      });
  }

  success(response, apitype) {
    if (apitype == 'signup') {
      this.toastr.success(response['message'], '')
      this.createForm();
    }
  }

  login() {
    const vim = this;
    vim.router.navigate(["/login"]);
  }

}