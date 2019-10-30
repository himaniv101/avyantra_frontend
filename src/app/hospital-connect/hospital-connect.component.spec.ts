// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalConnectComponent } from './hospital-connect.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHelper } from '../shared/helper/app.helper';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';



describe('HospitalConnectComponent', () => {
  let component: HospitalConnectComponent;
  let fixture: ComponentFixture<HospitalConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalConnectComponent ],
      imports: [
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule
        
       
    ],
    providers:[AppHelper]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalConnectComponent);
    component = fixture.componentInstance;
    let setValue={};
    spyOn(window.localStorage,"setItem").and.callFake((key,value)=>{
      return setValue[key]=value;
    })
    spyOn(window.localStorage,"getItem").and.callFake(()=>{
      return JSON.stringify({"referral_id":123})
    })

    fixture.detectChanges();

  });

  it('should create', () => {
    localStorage.setItem("login_hospital",JSON.stringify({"referral_id":123}));
    expect(component).toBeTruthy();
  });

  //methods

  it('nextPage method', () => {
    spyOn(component,'gethospitalList');
    component.nextPage(2);
    expect(component.gethospitalList).toHaveBeenCalled();
  });

  it('onDropDownChange method', () => {
    spyOn(component,'gethospitalList');
    component.onDropDownChange(2);
    expect(component.gethospitalList).toHaveBeenCalled();
  });

  it('updateStatus method', () => {
    spyOn(component,'success');
    spyOn(component,'gethospitalList');

    let something = component["common"].updateSubscriptionStatus(123,123,123);
    something.subscribe((data)=>{
      console.log(data);
      expect(component.success).toHaveBeenCalled();
      expect(component.gethospitalList).toHaveBeenCalled();
    });
  });
});
