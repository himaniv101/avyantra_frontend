import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Routes } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { SearchComponent } from './search.component';
import { DataService } from '../../shared/service/data.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

export const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
];

describe('PatentComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule, NgbModalModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot()],
      providers: [DataService,]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close_search_box method', () => {
    component.close_search_box();
    expect(component.isTableDisplay).toBeFalsy();
    expect(component.search_str).toBe("");
  });

  it('success method', () => {
    spyOn(component, "isSuccess");
    spyOn(component, "errorToasty");
    

    component.success({}, "get_patients");
    expect(component.errorToasty).toHaveBeenCalled();

    component.success({}, "search_patient");
    expect(component.searchResultEmpty).toBeTruthy();

  });

  it('errorHandler method', () => {
    spyOn(component, "errorToasty");
    component.errorHandler("test", "signup");
    expect(component.errorToasty).toHaveBeenCalled();
  });

  it('isSuccess method', () => {
    expect(component.isSuccess({})).toBeFalsy();

    let obj: Object = {
      status: 200
    };
    expect(component.isSuccess(obj)).toBeTruthy();

  });

  it('isAlreadyExist method', () => {
    expect(component.isAlreadyExist({})).toBeFalsy();

    let obj: Object = {
      status: 422
    };
    expect(component.isAlreadyExist(obj)).toBeTruthy();
  });

  it('view_patient method', () => {
    spyOn(component.id,'emit');
    spyOn(localStorage,'setItem');
    let obj = {
      id:123,
      study_id:1234,
      reading:12345
    }
    component.view_patient(obj);
    expect(component.id.emit).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
