// import { TestBed, async } from "@angular/core/testing";
// import { AuthGuard } from './auth.guard';
// import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';

// class MockRouter {
//   navigate(path) { }
// }

// class MockActivatedRouteSnapshot {
//   private _data: any;
//   get data() {
//       return this._data;
//   }
// }

// class MockRouterStateSnapshot {
//   url: string = '/';
// }

// describe('Auth Guard Service', () => {
  
//     let router=TestBed.get(Router)
//     let auth=new AuthGuard(router);
//     let next: ActivatedRouteSnapshot;
//     let state: RouterStateSnapshot;
//     beforeEach(async(() => {
//       TestBed.configureTestingModule({
//         imports: [RouterTestingModule],
//         providers: [AuthGuard,
//           { provide: Router, useClass: MockRouter },
//           { provide: ActivatedRouteSnapshot, useClass: MockActivatedRouteSnapshot },
//           { provide: RouterStateSnapshot, useClass: MockRouterStateSnapshot }
//       ]
//       });
//       spyOn(router, 'navigate');
//       state = TestBed.get(RouterStateSnapshot);
//       next=TestBed.get(ActivatedRouteSnapshot);
//     }));
  
    
//     it('should create', () => {
//      expect(auth).toBeTruthy();
//     });
//   });
  