import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { MatIconModule } from "@angular/material";
import { BabyCnsComponent } from './baby-cns.component';
import { DataService } from '../../shared/service/data.service';

export const routes: Routes = [
  {
    path: '',
    component: BabyCnsComponent
  }
];

describe('BabyCnsComponent', () => {
  let component: BabyCnsComponent;
  let fixture: ComponentFixture<BabyCnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyCnsComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
        MatIconModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot()],
      providers:[DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyCnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Baby CNS form validate', () => {
    let babyFrom = component.babyCnsForm;
    expect(babyFrom.valid).toBeFalsy();

    babyFrom.controls.features_of_encephalopathy.setValue('Normal');
    expect(babyFrom.valid).toBeFalsy();

    babyFrom.controls.seizures.setValue('No');
    expect(babyFrom.valid).toBeFalsy();

    babyFrom.controls.abnormal_movements_like_tonic_posturing.setValue('No');
    expect(babyFrom.valid).toBeFalsy();

    babyFrom.controls.af_bulge.setValue('No');
    expect(babyFrom.valid).toBeTruthy();
  });

  //methods

  it('updateForm method', () => {
    let babyFrom = component.babyCnsForm;
    spyOn(babyFrom,'patchValue');
    let obj = {
      features_of_encephalopathy:"test",
      seizures:"test",
      abnormal_movements_like_tonic_posturing:"test",
      af_bulge:"test",
    }
    component.updateForm(obj);
    expect(babyFrom.patchValue).toHaveBeenCalled();
  });

  it('ngOnChanges method', () => {
    spyOn(component,'createForm');
    component.ngOnChanges();
    expect(component.createForm).toHaveBeenCalled();
  });

  it('reset method', () => {
    spyOn(component,'createForm');
    component.reset();
    expect(component.createForm).toHaveBeenCalled();
  });

  it('open method', () => {
    spyOn(component,'createForm');
    spyOn(component,'updateForm');

    component.open(null,{});
    expect(component.createForm).toHaveBeenCalled();

    component.open(null,{"test":"test"});
    expect(component.updateForm).toHaveBeenCalled();
  });

  it('cnsFormSubmit method', () => {
    expect(component.cnsFormSubmit()).toBeUndefined();
    let babyFrom = component.babyCnsForm;
    spyOn(component,'goToNextReadingForm');
    babyFrom.controls.features_of_encephalopathy.setValue('Normal');
    babyFrom.controls.seizures.setValue('No');
    babyFrom.controls.abnormal_movements_like_tonic_posturing.setValue('No');
    babyFrom.controls.af_bulge.setValue('No');
    component.cnsFormSubmit();
    expect(component.goToNextReadingForm).toHaveBeenCalled();
  });

  it('success method', () => {
    expect(component.isEdit).toBeTruthy();
    component.success({"response":[]},"get_baby_cns");
    expect(component.isEdit).toBeFalsy();
  });

  it('getReadingFormData method', () => {
    spyOn(component,'updateForm');
    component.getReadingFormData({});
    expect(component.updateForm).toHaveBeenCalled();
  });

  it('saveReadingFormData method', () => {
    spyOn(component.readingDataService,'setReadingFormData');
    component.saveReadingFormData({});
    expect(component.readingDataService.setReadingFormData).toHaveBeenCalled();
  });

  it('goToNextReadingForm method', () => {
    spyOn(component,'saveReadingFormData');
    component.goToNextReadingForm();
    expect(component.saveReadingFormData).toHaveBeenCalled();
  });

  it('onChanges method', () => {
    spyOn(component.babyCnsForm.statusChanges,'subscribe');
    component.onChanges();
    expect(component.babyCnsForm.statusChanges.subscribe).toHaveBeenCalled();
  });

  it('updateSuccessResponse method', () => {
    spyOn(component,'get_baby_cns');
    component.login_hospital = { id:123 }
    component.updateSuccessResponse(null);
    expect(component.get_baby_cns).toHaveBeenCalled();
  });

  it('ngOnInit method', () => {
    spyOn(component,'getReadingFormData');
    spyOn(component,'onChanges');

    component.ngOnInit();
    expect(component.onChanges).toHaveBeenCalled();

    component.readingDataService.setReadingFormData("baby_cns",{});
    component.ngOnInit();
    expect(component.getReadingFormData).toHaveBeenCalled();
  });


});
