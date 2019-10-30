import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from "@angular/router";
import { CommonService } from '../shared/service/common/common.service';
import { AppHelper } from '../shared/helper/app.helper';
import * as _ from "underscore";
import { ToastrService } from 'ngx-toastr';
import { AppConstant } from '../shared/constant/app-constant';

@Component({
  selector: 'app-referral-doctor-staff',
  templateUrl: './referral-doctor-staff.component.html',
  styleUrls: ['./referral-doctor-staff.component.css']
})
export class ReferralDoctorStaffComponent implements OnInit {
  formRef: any;
  formRefDetail: any;
  addReferralForm: FormGroup;
  login_hospital: any = {};
  hospitalId: number;
  hospitalBranchId: number;
  specialities = [];
  referralDoctors = [];
  referralDoctorRecordsObj:any={};
  page=1;
  pageLength:number;
  totalCount:number;

  public namePatters = { 'S': { pattern: new RegExp('\[a-zA-Z \]') } };
  public customPatterns = { 'S': { pattern: new RegExp('\[a-zA-Z0-9_*!@#$%&-/, \]') } };
  
  constructor(private modalService: NgbModal, private router: Router, private formBuilder: FormBuilder, private commomService: CommonService, private helper: AppHelper, private toasty: ToastrService, private constant: AppConstant) { }

  ngOnInit() {
    this.pageLength=this.constant.pageLimit;
    this.getUserInfo();
    this.createForm();
    this.getSpeciality();
    this.getReferralDoctorRecordsCount();
  }

  createForm() {
    this.addReferralForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(15)]],
      lastName: ["", [Validators.required, Validators.maxLength(15)]],
      speciality: ["", [Validators.required]],
      contactNumber: ["", [Validators.required, Validators.minLength(10)]],
      email: ["", [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      address: ["",[Validators.required]],
      city: ["",[Validators.required, Validators.maxLength(32)]],
      state: ["",[Validators.required, Validators.maxLength(32)]],
      pincode: ["", [Validators.minLength(6)]]
    });
  }

  open(content, obj) {
      this.createForm();
      this.formRef = this.modalService.open(content, { size: "lg" });
  }

  openDetail(contentDetail, list) {
    this.referralDoctorRecordsObj=list;
    this.formRefDetail = this.modalService.open(contentDetail, { size: "lg" });
  }

  close() {
    this.formRef.close();
  }

  closeDetail() {
    this.formRefDetail.close();
  }

  getUserInfo() {
    this.login_hospital = JSON.parse(localStorage.getItem("login_hospital"));
    this.hospitalId = this.login_hospital['id'];
    this.hospitalBranchId = this.login_hospital['hospital_branch_id'];
  }

  getSpeciality() {
    this.commomService.getSpeciality(this.hospitalId, this.hospitalBranchId).subscribe(response => {
      if (this.helper.success(response)) {
        this.specialities = response['response']
      }
    })
  }

  onReferralSubmit(){
    if(!this.addReferralForm.valid){
      return ;
    }
    this.commomService.addReferralDoctor(this.hospitalId, this.hospitalBranchId, this.addReferralForm['value']).subscribe(result => {
      if(this.helper.success(result)){
        this.success(result, 'addReferralDoctor');
        this.getReferralDoctorRecordsCount();
        this.close();
      }else{
        this.helper.errorHandler(result);
      }
    });
  }

  getReferralDoctorRecords(){
    this.commomService.getReferralDoctors(this.hospitalId, this.hospitalBranchId,this.page,this.pageLength).subscribe(result => {
      if(this.helper.success(result)){
        this.success(result, 'getReferralDoctors');
      }else{
        this.referralDoctors=[];
        this.helper.errorHandler(result);
      }
    });
  }

  nextPage(page) {
    let self = this;
    self.page = page;
    this. getReferralDoctorRecords();
  }

  onDropDownChange(pagelength){
    this.getReferralDoctorRecords();
  }

  getReferralDoctorRecordsCount(){
    this.commomService.getReferralDoctorRecordsCount(this.hospitalId, this.hospitalBranchId).subscribe(result => {
      if(this.helper.success(result)){
        this.success(result, 'getReferralDoctorRecordsCount');
        this.getReferralDoctorRecords();
      }else{
        this.referralDoctors=[];
        this.helper.errorHandler(result);
      }
    });
  }

  success(response, apitype) {
    if (apitype == 'addReferralDoctor') {
      this.toasty.success(response['message'], '')
    }
    if(apitype=='getReferralDoctors'){
      this.referralDoctors=response['response'];
    }
    if(apitype=='getReferralDoctorRecordsCount'){
      this.totalCount=response['response']['referral_count'];
    }
  }

  switchTab(tab) {
    var vim = this;
    if(tab == 'hospital-staff') {
      vim.router.navigate(["admin/staff"]);
    }
    if(tab == 'referral-doctor-staff') {
      vim.router.navigate(["admin/referral-doctor"]);
    }
  }

}
