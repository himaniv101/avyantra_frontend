import { Component, OnInit } from '@angular/core';
import { Common } from 'src/app/shared/service/common/common';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { AppHelper } from 'src/app/shared/helper/app.helper';

@Component({
  selector: 'app-hospital-admin-info',
  templateUrl: './hospital-admin-info.component.html',
  styleUrls: ['./hospital-admin-info.component.css']
})
export class HospitalAdminInfoComponent implements OnInit {
  hospitalId:number;
  login_hospital:any={};
  hospitalBranchId:number;
  constructor(private common:CommonService,private helper:AppHelper) { }
  branchList=[];
  ngOnInit() {
    this.getUserInfo();
   this.getBranches(this.hospitalId);
  }

  getBranches(hospitalId){
    this.common.getHospitalBranches( this.hospitalId).subscribe(response=>{
      if(this.helper.success(response)){
        this.branchList=response['response']
      }
      else{
        this.branchList=[];
      }
    })
  }

  getUserInfo(){
    this.login_hospital = JSON.parse(localStorage.getItem("login_hospital"));
    this.hospitalId=this.login_hospital['id'];
    this.hospitalBranchId=this.login_hospital['hospital_branch_id'];
}

changeBranch(event){
 this.hospitalBranchId=event.target.value;
 this.login_hospital['hospital_branch_id']=this.hospitalBranchId;
 localStorage.setItem("login_hospital",JSON.stringify(this.login_hospital));
}
}
