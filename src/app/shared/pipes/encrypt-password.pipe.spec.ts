import { TestBed, async } from "@angular/core/testing";
import { passwordPipe } from './encrypt-password.pipe';

describe('EncryptPassword Service', () => {
    let encrypt=new passwordPipe();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          providers:[]
        })
      }));
    it("should create",()=>{
        expect(encrypt).toBeTruthy();
    });

    it("transform method",()=>{
        expect(encrypt.transform("testpass")).toBeTruthy();
    });
        
  });
