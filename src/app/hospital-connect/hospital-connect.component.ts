import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../shared/constant/app-constant';
import { AppHelper } from '../shared/helper/app.helper';
import { CommonService } from '../shared/service/common/common.service';
import * as _ from "underscore";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hospital-connect',
  templateUrl: './hospital-connect.component.html',
  styleUrls: ['./hospital-connect.component.css']
})
export class HospitalConnectComponent implements OnInit {
  login_user:any={};
  hospitalList=[];
  page=1;
  pageLength;
  totalCount:number;
  referralDoctorId:number;
  constructor(private constant:AppConstant,private helper:AppHelper,private common:CommonService,private toasty:ToastrService) { }

  ngOnInit() {
    this.pageLength=this.constant.pageLimit;
    this.getUserInfo();
    this.gethospitalListCount();
  }

  getUserInfo() {
    this.login_user = this.helper.getLoggedInUser();
    this.referralDoctorId=this.login_user['referral_id'];
  }
  gethospitalList(){
    this.common.getHospitalList(this.referralDoctorId,this.page,this.pageLength).subscribe(result=>{
      if(this.helper.success(result)){
        this.success(result,'hospitalsList')
      }
    })
  }

  gethospitalListCount(){
    this.common.getHospitalListCount().subscribe(result=>{
      if(this.helper.success(result)){
        console.log(result)
        this.success(result,'hospitalsListCount')
        this.gethospitalList();
      }
    })
  }

  success(response,apiType){
    if(apiType==='hospitalsList'){
      this.hospitalList=_.sortBy(response['response'], 'hospital_name');
    }
    if(apiType==='hospitalsListCount'){
      this.totalCount=response['response']['referral_hospital_count'];
    }
    if(apiType==='statusUpdate'){
      this.toasty.success(response['message'],'')
    }
  }
  nextPage(page) {
    let self = this;
    self.page = page;
    this.gethospitalList();
  }
  onDropDownChange(pagelength){
    this.gethospitalList();
  }

  updateStatus(statusId,hospitalId){
    this.common.updateSubscriptionStatus(this.referralDoctorId,hospitalId,statusId).subscribe(result=>{
      if(this.helper.success(result)){
        this.success(result,'statusUpdate');
        this.gethospitalList();
      }
    })
  }

}
