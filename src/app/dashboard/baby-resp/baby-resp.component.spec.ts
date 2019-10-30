import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { MatIconModule } from "@angular/material";
import {NgxMaskModule} from 'ngx-mask'
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { BabyRespComponent } from './baby-resp.component';
import { DataService } from '../../shared/service/data.service';

export const routes: Routes = [
  {
    path: '',
    component: BabyRespComponent
  }
];

describe('BabyRespComponent', () => {
  let component: BabyRespComponent;
  let fixture: ComponentFixture<BabyRespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyRespComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
        MatIconModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot(),
        NgxMaskModule.forRoot(),
        AngularMultiSelectModule],
      providers:[DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("ngOnInit method",()=>{
    component.ngOnInit();
  });
  it("when reset method is called",()=>{
    spyOn(component,'createForm');
    component.reset();
    expect(component.createForm).toHaveBeenCalled();
 });
 it("when goToNextReadingForm method is called",()=>{
   component.goToNextReadingForm();
 });
 it("when updateForm method is called",()=>{
   let BRes=component.babyRespForm;
   let obj={
    groaning: "NA",
    grunting: "NA",
    stridor: "NA",
    retraction: "NA",
    fast_breathing: "NA",
    oxygen_saturation: "NA",
    breathing_rate:"NA",
    baby_chest_indrawing: "NA",
    x_ray_result: "NA",
    x_ray_status_done: "NA",
    x_ray_status: "other",
    x_ray_diagnosis_any_other: "NA",
    apnea_diagnosis: "NA",
    apnea_status: "NA",
    baby_respiratory_support: "NA",
    baby_respiratory_support_if_yes: "NA"
   }
   spyOn(BRes, 'patchValue');
    component.updateForm(obj);
    expect(obj.oxygen_saturation).toBe("NA");
    expect(obj.breathing_rate).toBe("NA");
    expect(obj.x_ray_status).toBe("other");
    expect(component.isXrayDiagnosisAnyOther).toBeFalsy();
    expect(BRes.patchValue).toHaveBeenCalled();
 });
 it(' groaning field should be valid', () => {
  let RespForm = component.babyRespForm;
  expect(RespForm.controls.groaning.valid).toBeFalsy();

  RespForm.controls.groaning.setValue("21");
  expect(RespForm.controls.groaning.valid).toBeTruthy();
});
it(' grunting field should be valid', () => {
  let RespForm = component.babyRespForm;
  expect(RespForm.controls.grunting.valid).toBeFalsy();

  RespForm.controls.grunting.setValue("21");
  expect(RespForm.controls.grunting.valid).toBeTruthy();
});
it(' stridor field should be valid', () => {
  let RespForm = component.babyRespForm;
  expect(RespForm.controls.stridor.valid).toBeFalsy();

  RespForm.controls.stridor.setValue("21");
  expect(RespForm.controls.stridor.valid).toBeTruthy();
});
it(' retraction field should be valid', () => {
  let RespForm = component.babyRespForm;
  expect(RespForm.controls.retraction.valid).toBeFalsy();

  RespForm.controls.retraction.setValue("21");
  expect(RespForm.controls.retraction.valid).toBeTruthy();
});
it(' fast_breathing field should be valid', () => {
  let RespForm = component.babyRespForm;
  expect(RespForm.controls.fast_breathing.valid).toBeFalsy();

  RespForm.controls.fast_breathing.setValue("21");
  expect(RespForm.controls.fast_breathing.valid).toBeTruthy();
});
it(' oxygen_saturation field should be valid', () => {
  let RespForm = component.babyRespForm;
  expect(RespForm.controls.oxygen_saturation.valid).toBeFalsy();

  RespForm.controls.oxygen_saturation.setValue("21");
  expect(RespForm.controls.oxygen_saturation.valid).toBeTruthy();
});
it(' breathing_rate field should be valid', () => {
  let RespForm = component.babyRespForm;
  expect(RespForm.controls.breathing_rate.valid).toBeFalsy();

  RespForm.controls.breathing_rate.setValue("21");
  expect(RespForm.controls.breathing_rate.valid).toBeTruthy();
});
 it("when respiratoryFormSubmit method is called",()=>{
   expect(component.submitted).toBeFalsy();
   component.respiratoryFormSubmit();
   expect(component.submitted).toBeTruthy();
 });  
 it("when onInputChange method is called",()=>{
  var event_1 = {
    target: { value: "2", name: "Saturation" }
  }
  var event_2 = {
    target: { value: "2", name: "Rate", }
  }
  component.onInputChange(event_1);
  expect(event_1.target.name).toBe("Saturation");
  expect(event_1.target.value).toBe("2");
  component.onInputChange(event_2);
  expect(event_2.target.name).toBe("Rate");
  expect(event_2.target.value).toBe("2");
 });
 it("when ngOnChange method is called",()=>{
  spyOn(component,'createForm');
  component.ngOnChanges();
  expect(component.createForm).toHaveBeenCalled();
});
it("when open method is called",()=>{
  spyOn(component, 'createForm');
  var content={};
  let obj:{oxygen_saturation:"50"};
  component.open(content,obj);
  expect(component.createForm).toHaveBeenCalled();
});
 it("when getReadingFormData method is called",()=>{
  let obj={
    groaning: "NA",
    grunting: "NA",
    stridor: "NA",
    retraction: "NA",
    fast_breathing: "NA",
    oxygen_saturation: "NA",
    breathing_rate:"NA",
    baby_chest_indrawing: "NA",
    x_ray_result: "NA",
    x_ray_status_done: "NA",
    x_ray_status: "NA",
    x_ray_diagnosis_any_other: "NA",
    apnea_diagnosis: "NA",
    apnea_status: "NA",
    baby_respiratory_support: "NA",
    baby_respiratory_support_if_yes: "NA"
   }
   component.getReadingFormData(obj);
 });
 it("when changeDropdown method is called", () => {
  var dropdown1 = { dropdownVal: "Other", dropdownId: "x_ray_status" }
  component.changeDropdown(dropdown1.dropdownVal, dropdown1.dropdownId);
});
it("when success method is called", () => {
  var response = "";
  var apti_type = "get_all";
  component.success(response, apti_type);
  expect(apti_type).toBe("get_all");
});
it("when close method is called",()=>{
  component.close();
});
it("when setData method is called",()=>{
  component.createForm(100);
  component.setData();
});
it("when onChange method is called",()=>{
  component.onChanges();
});
it("when updateRespForm method is called",()=>{
  component.updateRespForm();
  expect(component.babyRespForm.invalid).toBeTruthy();
  //expect(component.setData).toHaveBeenCalled();
});
it("when get_baby_resp method is called",()=>{
  component.get_baby_resp(11,100,20,"reading");
});
it("when saveReadingFormData method is called",()=>{
  let obj={
    groaning: "NA",
    grunting: "NA",
    stridor: "NA",
    retraction: "NA",
    fast_breathing: "NA",
    oxygen_saturation: "NA",
    breathing_rate:"NA",
    baby_chest_indrawing: "NA",
    x_ray_result: "NA",
    x_ray_status_done: "NA",
    x_ray_status: "NA",
    x_ray_diagnosis_any_other: "NA",
    apnea_diagnosis: "NA",
    apnea_status: "NA",
    baby_respiratory_support: "NA",
    baby_respiratory_support_if_yes: "NA"

   }
  component.saveReadingFormData(obj);
})
});
