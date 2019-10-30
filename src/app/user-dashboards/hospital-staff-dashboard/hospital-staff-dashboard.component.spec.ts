import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalStaffDashboardComponent } from './hospital-staff-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AppHelper } from 'src/app/shared/helper/app.helper';
import { ToastrModule } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { of } from 'rxjs';

describe('HospitalStaffDashboardComponent', () => {
  let component: HospitalStaffDashboardComponent;
  let fixture: ComponentFixture<HospitalStaffDashboardComponent>;
  let commonService:CommonService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalStaffDashboardComponent ],
      imports:[
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers:[
        AppHelper,
        CommonService
      ]
    })
    .compileComponents();
    commonService = TestBed.get(CommonService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalStaffDashboardComponent);
    component = fixture.componentInstance;

    let store = {};
    spyOn(window.localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify({ "id": 123, "hospital_branch_id":12345 });
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    localStorage.setItem("login_hospital",JSON.stringify({"id":92,"hospital_branch_id":12345}));

    expect(component).toBeTruthy();
  });
  it('onDropDownChange method',()=>{
    spyOn(component,'getMedicalRecords');
    component.onDropDownChange(10);
    expect(component.getMedicalRecords).toHaveBeenCalled();
  });
  // it('nextPage method',()=>{
  //   spyOn(component,'getMedicalRecords');
  //   component.nextPage(1);
  //   expect(component.getMedicalRecords).toHaveBeenCalled();
  // });
  // it('getMedicalRecords method',()=>{
  //   let res = {
  //     response:{
  //     records:"baby"
  //     }
  //   }
  //     var spy = spyOn(commonService,'getMedicalRecords').and.returnValue(of(res));
  //     component.getMedicalRecords();
  //     spy.calls.mostRecent().returnValue.subscribe(commonService=>{
  //         expect(commonService).toBe(res);
  //     });
  // })
  // it('readingDashboard method',()=>{
  //   component.readingDashboard("test1");
  // });
  // it('getMedicalRecordsCount method',()=>{
  //   let res = {
  //     response:{
  //     records:"baby"
  //     }
  //   }
  //     var spy = spyOn(commonService,'getMedicalRecordsCount').and.returnValue(of(res));
  //     component.getMedicalRecordsCount();
  //     spy.calls.mostRecent().returnValue.subscribe(commonService=>{
  //         expect(commonService).toBe(res);
  //     });
  // })
});
