import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { CommonService } from '../../shared/service/common/common.service';
import { AppHelper } from '../../shared/helper/app.helper';
import * as _ from "underscore";
import { ToastrService } from 'ngx-toastr';
import { AppConstant } from '../../shared/constant/app-constant';
import { ReadingDataService } from 'src/app/shared/service/reading-data.service';
@Component({
  selector: 'app-hospital-staff-dashboard',
  templateUrl: './hospital-staff-dashboard.component.html',
  styleUrls: ['./hospital-staff-dashboard.component.css']
})
export class HospitalStaffDashboardComponent implements OnInit {
  hospitalId: number;
  hospitalBranchId: number;
  login_hospital: any = {};
  page=1;
  pageLength:number;
  medicalRecords=[];
  totalCount:number;

  constructor(private router: Router,
    private commomService:CommonService,private helper:AppHelper,
    private toasty:ToastrService,private constant:AppConstant,private readingDataService:ReadingDataService) { }

  ngOnInit() {
    this.pageLength=this.constant.pageLimit;
    this.getLoggedInUserInfo();
    this.getMedicalRecordsCount();
  }

  getLoggedInUserInfo() {
    this.login_hospital = JSON.parse(localStorage.getItem("login_hospital"));
    this.hospitalId = this.login_hospital['id'];
    this.hospitalBranchId = this.login_hospital['hospital_branch_id'];
  }

  getMedicalRecordsCount(){
    this.commomService.getMedicalRecordsCount(this.hospitalId, this.hospitalBranchId).subscribe(result => {
      if(this.helper.success(result)){
        this.success(result, 'getMedicalRecordsCount');
        this.getMedicalRecords();
      }else{
        this.medicalRecords=[];
        this.helper.errorHandler(result);
      }
    });
  }

  getMedicalRecords(){
    this.commomService.getMedicalRecords(this.hospitalId, this.hospitalBranchId,this.page,this.pageLength).subscribe(result => {
      if(this.helper.success(result)){
        this.success(result, 'getMedicalRecords');
      }else{
        this.medicalRecords=[];
        this.helper.errorHandler(result);
      }
    });
  }

  nextPage(page) {
    let self = this;
    self.page = page;
    this. getMedicalRecords();
  }

  onDropDownChange(pagelength){
    this.getMedicalRecords();
  }

  success(response,apitype){
    if(apitype=='getMedicalRecords'){
      this.medicalRecords=response['response'];
    }
    if(apitype=='getMedicalRecordsCount'){
      this.totalCount=response['response']['medical_record_count'];
    }
  }

  readingDashboard(list) {
    // this.readingDataService.setBabyReadingData(list);
    localStorage.setItem('staffMedicalRecord',JSON.stringify(list));
    this.router.navigate(['dashboard']);
  }

}
