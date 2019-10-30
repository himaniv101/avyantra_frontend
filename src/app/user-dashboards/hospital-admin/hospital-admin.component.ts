import { Component, OnInit } from '@angular/core';
import { Common } from "../../shared/service/common/common";

@Component({
  selector: 'app-hospital-admin',
  templateUrl: './hospital-admin.component.html',
  styleUrls: ['./hospital-admin.component.css']
})
export class HospitalAdminComponent implements OnInit {

  constructor(private commonAsyn: Common) { }

  ngOnInit() {
    this.commonAsyn.isHide();
  }

}
