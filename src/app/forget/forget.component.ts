import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { LoginService } from "../shared/service/login.service";
import { Common } from "../shared/service/common/common";

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  forgetForm: FormGroup;
  forgetWithPasswordForm: FormGroup;
  submitted = false;
  already_exist_status = 422;
  success_status = 200;
  isEmailExist = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private api: LoginService,
    private commonAsyn: Common
  ) {}
  /**
   * @method :-  it is  hooks
   * @purpose:- it is default method called
   */
  ngOnInit() {
    this.isEmailExist = false;
    this.commonAsyn.isHide();
    const vim = this;
    vim.createForm();
    vim.createWithPasswordForm();
  }
  
  /**
   * @method:-createForm
   * @purpose :- this is called when reactive form called
   */
  createForm() {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  createWithPasswordForm() {
    this.forgetWithPasswordForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPass: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * @method :-  forget_password
   * @purpose:- it is used on send Email after succefully..
   */
  forget_password_email() {
    const vim = this;
    if (this.forgetForm.invalid) {
      return;
    }

      vim.forgetForm.value["type"] = "1";
      const newUser = vim.api.forgot_password(
        vim.forgetForm.value
      );
      newUser.subscribe(
        response => {
          if(response['status']== true) {
            this.isEmailExist = true;
            // vim.toastr.success('Forget Password', 'Email send successfully..!')
          } else {
            this.isEmailExist = false;
            vim.toastr.error('Email not exist')
          }
          
        },
        error => {
          console.error("errro", error);
        }
      ); 
  }

  forget_password() {
    const vim = this;
    if (this.forgetWithPasswordForm.invalid) {
      return;
    }

      vim.forgetWithPasswordForm.value["type"] = "2";
      vim.forgetWithPasswordForm.value["email"] = this.forgetForm.value["email"];
      const newUser = vim.api.forgot_password(
        vim.forgetWithPasswordForm.value
      );
      newUser.subscribe(
        response => {
            this.isEmailExist = true;
            vim.toastr.success('Password successfully changed!')
            vim.router.navigate(["/login"]);
        },
        error => {
          console.error("errro", error);
        }
      ); 
  }

  is_match() {
    
    const vim = this;
    if (
      vim.forgetWithPasswordForm.value["confirmPass"] != "" &&
      vim.forgetWithPasswordForm.value["password"] != "" &&
      vim.forgetWithPasswordForm.value["confirmPass"] != vim.forgetWithPasswordForm.value["password"]
    ) {
      return true;
    }
    return false;
  }
}
