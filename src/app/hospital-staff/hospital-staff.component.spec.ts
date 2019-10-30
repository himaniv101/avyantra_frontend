import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import {NgxMaskModule} from 'ngx-mask';
import { ToastrModule } from "ngx-toastr";
import { AppHelper } from '../shared/helper/app.helper';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { HospitalStaffComponent } from './hospital-staff.component';
import { By } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

export const routes: Routes = [
  {
    path: '',
    component: HospitalStaffComponent
  }
];

describe('HospitalStaffComponent', () => {
  let component: HospitalStaffComponent;
  let fixture: ComponentFixture<HospitalStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalStaffComponent ],
      imports: [
        FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot(),
        HttpClientModule,
        NgxPaginationModule,
        AngularMultiSelectModule,
        NgbModalModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot()],
      providers:[AppHelper]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalStaffComponent);
    component = fixture.componentInstance;
    let store = {};
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"test":"test"});
    });
     spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        return store[key]=value;
      });
    fixture.detectChanges();
  });

//   it('should create', () => {
//     localStorage.setItem("login_hospital",JSON.stringify({"username":"getwell","email":"get@yahoo.com","user_type":"Hospital","id":92,"hospital_name":"getwell","hospital_branch_name":"getwell indore","hospital_branch_id":59}))
//     expect(component).toBeTruthy();
//   });

//   // it(' hospital staff form invalid',()=>{
//   //     let component=fixture.debugElement.componentInstance;
//   //     component.addStaffForm['value']['firstName']="";
//   //     component.addStaffForm['value']['lastName']="";
//   //     component.addStaffForm['value']['contactNumber']="";
//   //     component.addStaffForm['value']['email']="";
//   //     component.addStaffForm['value']['assignRole']="";
//   //     component.addStaffForm['value']['speciality']="";
//   //     component.addStaffForm['value']['branch']="";
//   //     component.addStaffForm['value']['username']="";
//   //     component.addStaffForm['value']['password']="";
//   //     component.addStaffForm['value']['status']=1;
//   //     expect(component.addStaffForm.valid).toBeFalsy();
//   // })

//   it(' hospital staff form valid',()=>{
//     let component=fixture.debugElement.componentInstance;
//     component.addStaffForm['value']['firstName']="testdemo";
//     component.addStaffForm['value']['lastName']=92;
//     component.addStaffForm['value']['contactNumber']="test";
//     component.addStaffForm['value']['email']="testuser@gmail.com";
//     component.addStaffForm['value']['assignRole']="123456";
//     component.addStaffForm['value']['speciality']="1";
//     component.addStaffForm['value']['branch']="1";
//     component.addStaffForm['value']['username']="test";
//     component.addStaffForm['value']['password']="123456";
//     component.addStaffForm['value']['status']=1;
//     expect(component.addStaffForm.valid).toBeFalsy();
// })

// it('email field validations',()=>{
//   let component=fixture.debugElement.componentInstance;
//   let errors={};
//   let email=component.addStaffForm.controls['email'];
//   email.setValue('testDemogmail.com');
//   errors=email.errors||{};
//   expect(errors['email']).toBeTruthy();
// })

// it('Contact number field validations',()=>{
//   let component=fixture.debugElement.componentInstance;
//   let errors={};
//   let email=component.addStaffForm.controls['contactNumber'];
//   email.setValue('123456');
//   errors=email.errors||{};
//   expect(errors['minlength']).toBeTruthy();
//   email.setValue('1234567890');
//   errors=email.errors||{};
//   expect(errors['minlength']).toBeFalsy();
// })

// it('username field validations',()=>{
//   let component=fixture.debugElement.componentInstance;
//   let errors={};
//   let username=component.addStaffForm.controls['username'];
//   username.setValue('test');
//   errors=username.errors||{};
//   expect(errors['minlength']).toBeTruthy();
//   username.setValue('testuser');
//   errors=username.errors||{};
//   expect(errors['minlength']).toBeFalsy();
// })

// it('password field validations',()=>{
//   let component=fixture.debugElement.componentInstance;
//   let errors={};
//   let password=component.addStaffForm.controls['password'];
//   password.setValue('test');
//   errors=password.errors||{};
//   expect(errors['minlength']).toBeTruthy();
//   password.setValue('testuser');
//   errors=password.errors||{};
//   expect(errors['minlength']).toBeFalsy();
// });
// it("when setSettings method is called",()=>{
//   component.setSettings("disabledFlag");
// });
// it("when addStaff method is called",()=>{
//   component.addStaff();
//   expect(component.addStaffForm.invalid).toBeTruthy();
// });
// it("swtichTab method",()=>{
//   component.switchTab("tab");
// });
// it("when changeBranch method is called",()=>{
//   let mockEvent={
//     target:{value:"1"}
//   }
//   component.changeBranch(mockEvent);
// });
// it("when getSelectedBranch method is called",()=>{
//   component.getSelectedBranch(100);
// });
// // it("when updateStaff method is called",()=>{
// //   component.updateStaff();
// // });
// it("when updateForm method is called",()=>{
//   let HStaff=component.addStaffForm;
//   let obj={};
//   spyOn(HStaff, 'patchValue');
//   component.updateForm(obj);
//   expect(HStaff.patchValue).toHaveBeenCalled();

// });
// it("when nextPage method is called",()=>{
//   spyOn(component,'getBranchStaffCount');
//   component.nextPage(1);
//   expect(component.getBranchStaffCount).toHaveBeenCalled();
// });
// it("when onDropDownChange method is called",()=>{
//   spyOn(component,'getBranchStaff');
//   component.onDropDownChange(100);
//   expect(component.getBranchStaff).toHaveBeenCalled();
// });
// it("when  close method is called",()=>{
//   component.open(null,{staff:"xyz"});
//   spyOn(component.formRef,'close');
//   component.close();  
//   expect(component.formRef.close).toHaveBeenCalled();
//   expect(component.isEdit).toBeFalsy();
// });
// it("when open method is called",()=>{
//   spyOn(component,'open');
//   component.open(null,{});
//   expect(component.open).toHaveBeenCalled();
// });
});