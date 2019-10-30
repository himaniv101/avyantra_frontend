import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { MatIconModule } from "@angular/material";
import {NgxMaskModule} from 'ngx-mask'
import { BabyCvComponent } from './baby-cv.component';
import { DataService } from '../../shared/service/data.service';

export const routes: Routes = [
  {
    path: '',
    component: BabyCvComponent
  }
];

describe('BabyCvComponent', () => {
  let component: BabyCvComponent;
  let fixture: ComponentFixture<BabyCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyCvComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
        MatIconModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot(),
        NgxMaskModule.forRoot()],
      providers:[DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(' heart_rate field should be valid', () => {
    let CvForm = component.babyCvForm;
    expect(CvForm.controls.heart_rate.valid).toBeFalsy();

    CvForm.controls.heart_rate.setValue("21");
    expect(CvForm.controls.heart_rate.valid).toBeTruthy();
  });
  it(' urine_output field should be valid', () => {
    let CvForm = component.babyCvForm;
    expect(CvForm.controls.urine_output.valid).toBeFalsy();

    CvForm.controls.urine_output.setValue("21");
    expect(CvForm.controls.urine_output.valid).toBeTruthy();
  });
  it(' baby_blood_pressure_mean_arterial_bp field should be valid', () => {
    let CvForm = component.babyCvForm;
    expect(CvForm.controls.baby_blood_pressure_mean_arterial_bp.valid).toBeFalsy();

    CvForm.controls.baby_blood_pressure_mean_arterial_bp.setValue("21");
    expect(CvForm.controls.baby_blood_pressure_mean_arterial_bp.valid).toBeTruthy();
  });
  it(' baby_blood_pressure_lower_limb field should be valid', () => {
    let CvForm = component.babyCvForm;
    expect(CvForm.controls.baby_blood_pressure_lower_limb.valid).toBeFalsy();

    CvForm.controls.baby_blood_pressure_lower_limb.setValue("21");
    expect(CvForm.controls.baby_blood_pressure_lower_limb.valid).toBeTruthy();
  });
  it(' baby_blood_pressure_upper_limb field should be valid', () => {
    let CvForm = component.babyCvForm;
    expect(CvForm.controls.baby_blood_pressure_upper_limb.valid).toBeFalsy();

    CvForm.controls.baby_blood_pressure_upper_limb.setValue("21");
    expect(CvForm.controls.baby_blood_pressure_upper_limb.valid).toBeTruthy();
  });
  it(' capillary_refill_unit field should be valid', () => {
    let CvForm = component.babyCvForm;
    expect(CvForm.controls.capillary_refill_unit.valid).toBeFalsy();

    CvForm.controls.capillary_refill_unit.setValue("21");
    expect(CvForm.controls.capillary_refill_unit.valid).toBeTruthy();
  });
  it(' low_peripheral_pulse_volume field should be valid', () => {
    let CvForm = component.babyCvForm;
    expect(CvForm.controls.low_peripheral_pulse_volume.valid).toBeFalsy();

    CvForm.controls.low_peripheral_pulse_volume.setValue("21");
    expect(CvForm.controls.low_peripheral_pulse_volume.valid).toBeTruthy();
  });
  it(' cool_peripheries field should be valid', () => {
    let CvForm = component.babyCvForm;
    expect(CvForm.controls.cool_peripheries.valid).toBeFalsy();

    CvForm.controls.cool_peripheries.setValue("21");
    expect(CvForm.controls.cool_peripheries.valid).toBeTruthy();
  });
  it(' two_d_echo_done field should be valid', () => {
    let CvForm = component.babyCvForm;
    expect(CvForm.controls.two_d_echo_done.valid).toBeFalsy();

    CvForm.controls.two_d_echo_done.setValue("21");
    expect(CvForm.controls.two_d_echo_done.valid).toBeTruthy();
  });
 
  
 
  it("ngOnInit method",()=>{
    spyOn(component,'createForm');
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
  });
  it("when updateForm method is called",()=>{
    let Bcv=component.babyCvForm;
    let obj={
      study_id: "NA",
      heart_rate: "NA",
      urine_output: "NA",
      baby_blood_pressure_mean_arterial_bp:"NA",
      baby_blood_pressure_upper_limb:"NA",
      baby_blood_pressure_lower_limb: "NA",
      capillary_refill_unit: "NA",
      low_peripheral_pulse_volume: "NA",
      cool_peripheries:"NA",
      two_d_echo_done: "NA",
      two_d_echo_done_if_yes: "NA",
      baby_on_ionotropes: "NA",
      central_line: "NA",
      skin_pustules: "NA",
      infusion_of_blood_products:"NA"
    }
    spyOn(Bcv, 'patchValue');
    component.updateForm(obj);
    expect(obj.heart_rate).toBe("NA");
    expect(obj.baby_blood_pressure_mean_arterial_bp).toBe("NA");
    expect(obj.baby_blood_pressure_upper_limb).toBe("NA");
    expect(obj.baby_blood_pressure_lower_limb).toBe("NA");
    expect(obj.two_d_echo_done_if_yes).toBe("NA");
    expect(Bcv.patchValue).toHaveBeenCalled();
  });
  it("when OnInputChange method is called",()=>{
    let Bcv=component.babyCvForm;
      var event_1 = {
        target: { value: "2", name: "heart_rate" }
      }
      var event_2 = {
        target: { value: "2", name: "Arterial_BP", }
      }
      var event_3 = {
        target: { value: "2", name: "upper_limb", }
      }
      var event_4 = {
        target: { value: "2", name: "lower_limb", }
      }
      var event_5 = {
        target: { value: "2", name: "echo_result", }
      }
      spyOn(Bcv, 'patchValue');
      component.onInputChange(event_1);
      expect(event_1.target.name).toBe("heart_rate");
      expect(event_1.target.value).toBe("2");
      expect(Bcv.patchValue).toHaveBeenCalled();

      component.onInputChange(event_2);
      expect(event_2.target.name).toBe("Arterial_BP");
      expect(event_2.target.value).toBe("2");
      expect(Bcv.patchValue).toHaveBeenCalled();

      component.onInputChange(event_3);
      expect(event_3.target.name).toBe("upper_limb");
      expect(event_3.target.value).toBe("2");
      expect(Bcv.patchValue).toHaveBeenCalled();
 
      component.onInputChange(event_4);
      expect(event_4.target.name).toBe("lower_limb");
      expect(event_4.target.value).toBe("2");
      expect(Bcv.patchValue).toHaveBeenCalled();

      component.onInputChange(event_5);
      expect(event_5.target.name).toBe("echo_result");
      expect(event_5.target.value).toBe("2"); 
      expect(Bcv.patchValue).toHaveBeenCalled();

  });
  it("when ngOnChange method is called",()=>{
     spyOn(component,'createForm');
     component.ngOnChanges();
     expect(component.createForm).toHaveBeenCalled();
  });
  it("when reset method is called",()=>{
     spyOn(component,'createForm');
     component.reset();
     expect(component.createForm).toHaveBeenCalled();
  });
  it("when goToNextReadingForm method is called",()=>{
    component.goToNextReadingForm();
  })
  it("when open method is called",()=>{
      spyOn(component, 'createForm');
      component.open(null, {});
      expect(component.createForm).toHaveBeenCalled();
      component.open(null, { 'heart_rate': '50' });
  });
  it("when success method is called", () => {
    var response = "";
    var apti_type = "BabyCv";
    component.success(response, apti_type);
    expect(apti_type).toBe("BabyCv");
  });
  it("when babyCVFormSubmit method is called", () => {
    //spyOn(component,'goToNextReadingForm');
    expect(component.submitted).toBeFalsy();
    component.babyCVFormSubmit();
    expect(component.submitted).toBeTruthy();
    component.createForm(100);
    expect(component.babyCvForm.invalid).toBeTruthy();
    //expect(component.goToNextReadingForm).toHaveBeenCalled();
  });
  it("when getReadingFormData method is called",()=>{
    let obj={
      study_id: "NA",
      heart_rate: "NA",
      urine_output: "NA",
      baby_blood_pressure_mean_arterial_bp:"NA",
      baby_blood_pressure_upper_limb:"NA",
      baby_blood_pressure_lower_limb: "NA",
      capillary_refill_unit: "NA",
      low_peripheral_pulse_volume: "NA",
      cool_peripheries:"NA",
      two_d_echo_done: "NA",
      two_d_echo_done_if_yes: "NA",
      baby_on_ionotropes: "NA",
      central_line: "NA",
      skin_pustules: "NA",
      infusion_of_blood_products:"NA"
    }
    component.getReadingFormData(obj);
  });
  it("whebn get_cv method is called",()=>{
    component.get_cv(1,100,20,"reading");
  });
  it("when update_cv_form method is called",()=>{
     expect(component.submitted).toBeFalsy();
     component.update_cv_form();
     expect(component.submitted).toBeTruthy();
  });


  
});
