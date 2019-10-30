import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";

import {Router, Routes} from "@angular/router";
import { TopNavBarComponent } from './top-nav-bar.component';

import { DataService } from '../../../service/data.service'


export const routes: Routes = [
  {
    path: '',
    component: TopNavBarComponent
  },
  
];

describe('TopNavBarComponent', () => {
  let component: TopNavBarComponent;
  let fixture: ComponentFixture<TopNavBarComponent>;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavBarComponent ],
      imports:[RouterTestingModule.withRoutes(routes)],
      providers:[DataService]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavBarComponent);
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

  it('should create', () => {
    localStorage.setItem("login_hospital",JSON.stringify({"username":"getwell","email":"get@yahoo.com","user_type":"Hospital","id":92,"hospital_name":"getwell","hospital_branch_name":"getwell indore","hospital_branch_id":59}))
    expect(component).toBeTruthy();
  });
  it("when logout method is called",fakeAsync(()=>{
     component.logout();
    //  router.navigate(['']);
    //  tick();
    //  expect(location.path()).toBe('/');
  }));
  it("when changeProfile method is called",fakeAsync(()=>{
    let component = fixture.debugElement.componentInstance;
    component.changeProfile();
       
  }));
  it("when activeTab method is called",()=>{
    let tab="tabname"
    component.activeTab("tabname");
    expect(component.selectedTab).toBe(tab);
  });
  // it("when toggleCollapse method is called",()=>{
  //   component.toggleCollapse();
  //   let size=window.screen.width;
  //   expect(size).toBeGreaterThan(1000);
  // });
  it("when showPermission method is called",()=>{
    //localStorage.setItem("login_hospital",JSON.stringify({"username":"getwell","email":"get@yahoo.com","user_type":"Hospital","id":92,"hospital_name":"getwell","hospital_branch_name":"getwell indore","hospital_branch_id":59}))
    component.showPermission("tabname");
  });
});
