import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AppHelper {
    
    constructor(public toasty:ToastrService){

    }
   /**
    * @function as @return succcess
    */
    public success(response){
      //. debugger
      let self = this;  
        if(response.hasOwnProperty('status') && parseInt(response['status']) == 200  ){
          return true;
        } else {             
            return false;
        }
    }

   /**
    * @function as @return errorHandler
    */
    public errorHandler(response){
        let self = this;  
        if(response.hasOwnProperty('status') && parseInt(response['status']) != 200  ){
            if(response.hasOwnProperty('error')){
                if(response.hasOwnProperty('message') && response['message']!=null){
                    self.toasty.error(response['message'],'ERROR');
                }
                else{
                    self.toasty.error('Error','ERROR');
                }
            }
            else{
                self.toasty.error('Error','ERROR');
            }
        }
    }


   /**
    * @function as @return recordNotFound
    */
   public noRecordsFound(response){
     let self = this;  
    if(response.hasOwnProperty('status') && parseInt(response['status']) != 200){
        self.errorHandler(response);
      } else {
         self.errorHandler(response);
      }
   }

   getLoggedInUser(){
       return JSON.parse(localStorage.getItem("login_hospital"));
   }

   getLoggedInUserData(fieldName){
       let data=JSON.parse(localStorage.getItem("login_hospital"));
       return data[fieldName];
   }



 }