import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Routes } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { MatIconModule } from "@angular/material";
import { NgxMaskModule } from 'ngx-mask'
import { BabyAppearComponent } from './baby-appear.component';
import { DataService } from '../../shared/service/data.service';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateLevelPipe } from 'src/app/shared/pipes/date-level.pipe';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { ReadingDataService } from 'src/app/shared/service/reading-data.service';

export const routes: Routes = [
  {
    path: '',
    component: BabyAppearComponent
  }
];

describe('BabyAppearComponent', () => {
  let component: BabyAppearComponent;
  let fixture: ComponentFixture<BabyAppearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BabyAppearComponent, DateLevelPipe,],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
        MatIconModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot(),
        BsDatepickerModule.forRoot(),///
        NgxMaskModule.forRoot()],
      providers: [DataService, CommonService, ToastrService, ReadingDataService, CommonService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyAppearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("Form should be invalid when all fields are empty", () => {
    component.babyApears['value']['reading_date'] = "";
    component.babyApears['value']['time_of_reading_hours'] = "";
    component.babyApears['value']['time_of_reading_minute'] = "";
    component.babyApears['value']['baby_weight_at_birth'] = "";
    component.babyApears['value']['baby_weight_at_birth_unit'] = "";
    component.babyApears['value']['baby_appearance'] = "";
    component.babyApears['value']['baby_skin_colour'] = "";
    component.babyApears['value']['baby_cry_sound'] = "";
    component.babyApears['value']['baby_cry_sound_status'] = "";
    component.babyApears['value']['hypotonia_muscular_response_one_min_after_birth'] = "";

    component.babyApears['value']['hypotonia_muscular_response_five_min_after_birth'] = "";
    component.babyApears['value']['excessive_sleeping'] = "";
    component.babyApears['value']['hypothermia'] = "";
    component.babyApears['value']['hypothermia_status'] = "";
    component.babyApears['value']['hypothermia_status_value'] = "";
    component.babyApears['value']['baby_feeding_status'] = "";
    component.babyApears['value']['baby_presence_of_convulsions'] = "";
    component.babyApears['value']['baby_jaundice'] = "";

    component.babyApears['value']['breast_feeding_initiation'] = "";
    component.babyApears['value']['kangaroo_mother_care'] = "";
    component.babyApears['value']['umbilical_discharge'] = "";
    expect(component.babyApears.valid).toBeFalsy();
  });
  it("when transform date method is called", () => {
    var date = "01/01/2000"
    component.transformDate(date);
  });
  it("when reset method is called", () => {
    spyOn(component, "createForm");
    component.resetComponent();
    expect(component.createForm).toHaveBeenCalled();
  });
  it("when update appears form method is called", () => {
    component.update_appears_form();
    expect(component.submitted).toBeTruthy();
    component.setData();
    expect(component.isEditClicked).toBeFalsy();
  });
  it("when updateForm method is called", () => {
    var obj = {
      reading_date: "NA",
      time_of_reading_hours: "NA",
      time_of_reading_minute: "NA",
      baby_weight_at_birth: "NA",
      baby_weight_at_birth_unit: "NA",
      baby_appearance: "NA",
      baby_skin_colour: "NA",
      baby_cry_sound: "NA",
      baby_cry_sound_status: "NA",
      hypotonia_muscular_response_one_min_after_birth: "NA",
      hypotonia_muscular_response_five_min_after_birth: "NA",
      excessive_sleeping: "NA",
      hypothermia: "NA",
      hypothermia_status: "NA",
      hypothermia_status_value: "NA",
      baby_feeding_status: "NA",
      baby_presence_of_convulsions: "NA",
      baby_jaundice: "NA",
      breast_feeding_initiation: "NA",
      kangaroo_mother_care: "NA",
      umbilical_discharge: "NA"
    }
    component.updateForm(obj);
    expect(obj.reading_date).toBe("NA");
    expect(component.isDateReading).toBeFalsy();
    expect(obj.time_of_reading_hours).toBe("NA");
    expect(component.isTimeReading).toBeFalsy();
    expect(obj.baby_cry_sound_status).toBe("NA");
    expect(component.isCrySound).toBeFalsy();
    expect(obj.hypothermia_status_value).toBe("NA");
    expect(component.isHypothermiaUnit).toBeFalsy();
    expect(obj.baby_weight_at_birth).toBe("NA");
    expect(component.chkWeightAtBirth).toBeFalsy();
  });

  it("when onInputChange method is called", () => {
    var event_1 = {
      target: { value: "2", name: "DateReading" }
    }
    var event_2 = {
      target: { value: "2", name: "cry_sound", }
    }
    var event_3 = {
      target: { value: "2", name: "TimeReading", }
    }
    component.onInputChange(event_1);
    expect(event_1.target.name).toBe("DateReading");
    expect(event_1.target.value).toBe("2");
    component.onInputChange(event_2);
    expect(event_2.target.name).toBe("cry_sound");
    expect(event_2.target.value).toBe("2");
    component.onInputChange(event_3);
    expect(event_3.target.name).toBe("TimeReading");
    expect(event_3.target.value).toBe("2");

  });
  
  it("when onScroll Method is called", () => {
    component.onScroll();
  });
  it("when ngOnChange method is called", () => {
    spyOn(component, "createForm");
    component.ngOnChanges();
    expect(component.createForm).toHaveBeenCalled();
  });
  it("when reset method is called", () => {
    spyOn(component, "createForm");
    component.reset();
    expect(component.createForm).toHaveBeenCalled();
  });
  it("when goToNextReadingForm method is called", () => {
    component.goToNextReadingForm();
  });
  it("when getReadingFormData method is called", () => {
    var obj = {
      reading_date: "NA",
      time_of_reading_hours: "NA",
      time_of_reading_minute: "NA",
      baby_weight_at_birth: "NA",
      baby_weight_at_birth_unit: "NA",
      baby_appearance: "NA",
      baby_skin_colour: "NA",
      baby_cry_sound: "NA",
      baby_cry_sound_status: "NA",
      hypotonia_muscular_response_one_min_after_birth: "NA",
      hypotonia_muscular_response_five_min_after_birth: "NA",
      excessive_sleeping: "NA",
      hypothermia: "NA",
      hypothermia_status: "NA",
      hypothermia_status_value: "NA",
      baby_feeding_status: "NA",
      baby_presence_of_convulsions: "NA",
      baby_jaundice: "NA",
      breast_feeding_initiation: "NA",
      kangaroo_mother_care: "NA",
      umbilical_discharge: "NA"
    }
    component.getReadingFormData(obj);
  });
  it("when changeDropdown method is called", () => {
    var dropdown1 = { dropdownVal: "NA", dropdownId: "hypothermia_status_value_id" }
    var dropdown2 = { dropdownVal: "NA", dropdownId: "babyWeightAtBirthId" }
    component.changeDropdown(dropdown1.dropdownVal, dropdown1.dropdownId);
    component.changeDropdown(dropdown2.dropdownVal, dropdown2.dropdownId);

  });
  it("when BabyAppearFormSubmit method is called", () => {
    component.babyApearsFormSubmit();
    expect(component.submitted).toBeTruthy();
    component.createForm(100);
    expect(component.babyApears.invalid).toBeTruthy();
  });
  it("open method", () => {
    spyOn(component, 'createForm');
    component.open(null, {});
    expect(component.createForm).toHaveBeenCalled();
    component.open(null, { 'mother_bmi': '17.79' });
  });

  it("when success method is called", () => {
    var response = "";
    var apti_type = "BabyAppears";
    component.success(response, apti_type);
    expect(apti_type).toBe("BabyAppears");
  });
  it("when errorToasty method is called", () => {
    var error = {};
    component.errorToasty(error);
  });
  it("when isAlready Exists method is called", () => {
    var response = {}
    component.isAlreadyExist(response);
    expect(component.isAlreadyExist(response)).toBeFalsy();
  });
  it("when isSuccess method is called", () => {
    var response = {}
    component.isSuccess(response);
    expect(component.isSuccess(response)).toBeFalsy();
  });
  it("when get_baby_apears method is called", () => {
    component.get_baby_apears(1, 100, 20, "reading");
  });
});

