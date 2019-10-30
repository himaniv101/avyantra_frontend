import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Subject } from 'rxjs';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CommonService {
  status = false;
  baseUrl = environment.server_url;
  private subject = new Subject<any>(); 
  private subject_for_medical_number = new Subject<any>(); 

  constructor(private http: HttpClient) {}
  
  sendBirthDate(message: string) {  
    this.subject.next({ text: message });  
  }  

  getBirthDate(): Observable<any> {  
    return this.subject.asObservable();  
  }
  setMedicalRecordNumber(message: string) {  
    this.subject_for_medical_number.next({ text: message });  
  }
  getMedicalRecordNumber(): Observable<any> {  
    return this.subject_for_medical_number.asObservable();  
  }
  patient_signup(data) {
    return this.http.post(this.baseUrl + "patient/signup", data, this.jwt());
  }
  get_patients(obj = { hospital_name: "test" }) {
    return this.http.post(this.baseUrl + "patient/get_patients",obj,this.jwt());
  }
  get_level(patient_id) {
    return this.http.post(this.baseUrl + "patient/get_level/" + patient_id,[],this.jwt());
  }
  get_tabs_general(method_url, study_id, hospital_id, page_no) {
    return this.http.post(this.baseUrl + method_url + "/" + study_id + "/" + hospital_id + "/" + page_no,[],this.jwt());
  }
  get_tabs_maternal(method_url, study_id, hospital_id, page_no) {
    return this.http.post( this.baseUrl + method_url + "/" + study_id + "/" + hospital_id + "/" + page_no,[],this.jwt());
  }
  get_tabs(method_url, study_id, hospital_id, page_no, reading) {
    return this.http.get(this.baseUrl + method_url + "/" + study_id + "/" + hospital_id + "/" + page_no + "/" + reading,this.jwt());
  }
  get_order_record(method_url, obj) {
    return this.http.post(this.baseUrl + method_url + "/", obj, this.jwt());
  }
  patient_basic_info_updated(data) {
    return this.http.post(this.baseUrl + "patient/basic/add", data, this.jwt());
  }
  patient_basic_info_dup_updated(data,hospital_id) {
    return this.http.post(this.baseUrl + "patient/basic/add_dup/"+hospital_id+"", data, this.jwt());
  }
  patient_general_info_updated(data) {
    return this.http.post(this.baseUrl + "patient/general/add",data,this.jwt());
  }
  // patient_general_info_updated(data) {
  //   return this.http.post(this.baseUrl + "patient/general/add",data,this.jwt());
  // }
  addMethod(data, method_name = "") {
    return this.http.post(this.baseUrl + "patient/" + method_name + "/add",data,this.jwt());
  }
  maternal_add(data) {
    return this.http.post(this.baseUrl + "patient/maternal/add",data,this.jwt());
  }
  baby_git_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_git/add",data,this.jwt());
  }
  baby_appear_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_appears/add",data,this.jwt());
  }
  baby_resp_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_resp/add",data,this.jwt());
  }
  baby_cns_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_cns/add",data,this.jwt());
  }
  baby_cv_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_cv/add",data,this.jwt());
  }
  antibiotic_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_antibiotic/add",data,this.jwt());
  }
  baby_investigation_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_investigation/add",data,this.jwt());
  }
  final_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_final/add",data,this.jwt());
  }
  search_patient(obj: any) {
    return this.http.post(this.baseUrl + "patient/like", obj, this.jwt());
  }
  jwt(token = null) {
    const httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/json"})
    };
    return httpOptions;
  }
  create_new_reading(data) {
    return this.http.post(this.baseUrl + 'patient/models/save',data);
  }
  get_new_reading(study_id){
    return this.http.get(this.baseUrl + 'patient/readingId/'+study_id,this.jwt());
  }
  search_patient_reading(str, hospital_id){
    return this.http.get(this.baseUrl + "patient/search/" + str +'/'+ hospital_id, this.jwt());
  }
  updateFormData(url,study_id,reading,data){
    return this.http.put(this.baseUrl+url+study_id+'/'+reading,data,this.jwt());
  }
  getLastReadingData(study_id){
    return this.http.get(this.baseUrl + "patient/models/" + study_id , this.jwt());
  }
  updateBabyProfile(study_id,data){
    return this.http.put(this.baseUrl + "patient/update/babyProfile/" + study_id ,data ,this.jwt())
  }
  updateMaternalProfile(study_id,data){
    return this.http.put(this.baseUrl + "patient/update/motherProfile/" + study_id ,data, this.jwt())
  }
  addBranch(data,hospitalId){
    return this.http.post(this.baseUrl +'hospitalBranch/register/' + hospitalId , data, this.jwt());
  }
  getHospitalBranches(hospitalId){
    return this.http.get( this.baseUrl + 'hospitalBranch/branches/' + hospitalId , this.jwt());
  }
  addRole(data,hospitalId, hospitalBranchId){
    return this.http.post(this.baseUrl +'hospitalBranch/role/'+ hospitalId +'/'+ hospitalBranchId , data, this.jwt());
  }
  getBrancheRole(hospitalId, hospitalBranchId){
    return this.http.get( this.baseUrl+ 'hospitalBranch/role/' + hospitalId +'/'+ hospitalBranchId , this.jwt());
  }
  removeBranchRole(hospital_branch_role_id) {
    return this.http.delete(this.baseUrl + 'hospitalBranch/role/' + hospital_branch_role_id, this.jwt());
  }
  updateHospitalRole(hospitalId, hospitalBranchId,roleId,data){
    return this.http.put(this.baseUrl + 'hospitalBranch/role/' + hospitalId+'/'+hospitalBranchId+'/'+roleId,data, this.jwt());
  }
  updateHospitalSpeciality(hospitalId, hospitalBranchId,specialityId,data){
    return this.http.put(this.baseUrl + 'hospitalBranch/speciality/' + hospitalId+'/'+hospitalBranchId+'/'+specialityId,data, this.jwt());
  }
  addSpeciality(data,hospitalId, hospitalBranchId){
  return this.http.post(this.baseUrl +'hospitalBranch/speciality/'+ hospitalId +'/'+ hospitalBranchId , data, this.jwt());
  }
  getSpeciality(hospitalId, hospitalBranchId){
    return this.http.get( this.baseUrl + 'hospitalBranch/speciality/' + hospitalId +'/'+ hospitalBranchId , this.jwt());
  }
  removeSpeciality(hospital_branch_speciality_id) {
    return this.http.delete(this.baseUrl + 'hospitalBranch/speciality/' + hospital_branch_speciality_id, this.jwt());
  }
  adsStaff(hospitalId,branchId,data){
    return this.http.post(this.baseUrl +'hospitalStaff/addStaff/'+ hospitalId +'/'+ branchId , data, this.jwt());
  }
  getStaff(hospitalId,branchId,start,limit){
    return this.http.get(this.baseUrl+'hospitalStaff/getStaff/'+ hospitalId +'/'+ branchId+'/'+start+'/'+limit , this.jwt());
  }
  getStaffCounts(hospitalId,branchId){
    return this.http.get(this.baseUrl +'hospitalStaff/getStaffCount/'+ hospitalId +'/'+ branchId, this.jwt());
  }
  updateStaff(hospitalId,branchId,staffId,data){
    return this.http.put(this.baseUrl+'hospitalStaff/updateStaff/'+hospitalId+'/'+branchId+'/'+staffId,data,this.jwt())
  }
  updateUserPermission(hospitalId, branchId, data) {
    return this.http.put(this.baseUrl+'hospitalStaff/update/staffPermission/'+hospitalId+'/'+branchId+'/',data,this.jwt())
  }
  addMedicalRecord(hospitalId, branchId, data) {
    return this.http.post(this.baseUrl +'patient/medicalRecord/'+hospitalId+'/'+branchId, data, this.jwt());
  }
  getMedicalRecords(hospitalId,branchId,page,limit){
    return this.http.get(this.baseUrl +'patient/medicalRecord/'+hospitalId+'/'+branchId+'/'+page+'/'+limit, this.jwt());
  }
  getMedicalRecordsCount(hospitalId,branchId){
    return this.http.get(this.baseUrl +'patient/medicalRecordCount/'+hospitalId+'/'+branchId, this.jwt());
  }
  updateMedicalRecord(study_id, patient_id,hospitalId,branchId, data){
    return this.http.put(this.baseUrl+'patient/medicalRecord/'+study_id+'/'+patient_id+'/'+hospitalId+'/'+branchId, data,this.jwt())
  }
  getMyProfile(id){
    return this.http.get(this.baseUrl + "hospital/hospitalProfile/" + id , this.jwt());
  }
  getStaffProfile(id){
    return this.http.get(this.baseUrl + "hospitalStaff/staffProfile/" + id , this.jwt());
  }
  getReferralProfile(id){
    return this.http.get(this.baseUrl + "hospitalStaff/getReferralProfile/" + id , this.jwt());
  }
  updateHospitalProfile(data,hospitalId){
    return this.http.put(this.baseUrl + "hospital/updateHospitalProfile/" + hospitalId , data,this.jwt());
  }
  updateStaffProfile(data,staffId){
    return this.http.put(this.baseUrl + "hospitalStaff/updateStaffProfile/" + staffId , data,this.jwt());
  }
  updateReferralProfile(data,referralId){
    return this.http.put(this.baseUrl + "hospitalStaff/updateReferralProfile/" + referralId , data,this.jwt());
  }
  addReferralDoctor(hospitalId,branchId,data){
    return this.http.post(this.baseUrl +'hospitalStaff/addReferralDoctor/'+ hospitalId +'/'+ branchId , data, this.jwt());
  }
  getReferralDoctors(hospitalId,branchId,page,limit){
    return this.http.get(this.baseUrl+'hospitalStaff/ReferralDoctor/'+hospitalId+'/'+branchId+'/'+page+'/'+limit, this.jwt());
  }
  getReferralDoctorRecordsCount(hospitalId,branchId){
    return this.http.get(this.baseUrl +'hospitalStaff/ReferralDoctorCount/'+hospitalId+'/'+branchId, this.jwt());
  }
  getBranchProfileInfo(branchId){
    return this.http.get(this.baseUrl +'hospitalBranch/hospitalBranchProfile/'+branchId, this.jwt());
  }
  updateBranchProfile(data,branchId){
    return this.http.put(this.baseUrl + "hospitalBranch/updateHospitalBranchProfile/" + branchId , data,this.jwt());
  }
  getHospitalList(referralDoctorId,start,limit){
    return this.http.get( this.baseUrl +'hospitalStaff/getReferralHospital/'+referralDoctorId+'/'+start+'/'+limit, this.jwt());
  }
  getHospitalListCount(){
    return this.http.get( this.baseUrl +'hospitalStaff/getReferralHospitalCount', this.jwt()
  );
  }
  updateSubscriptionStatus(referralDoctorId,hospitalId,newStatusObj){
    return this.http.put( this.baseUrl +'hospitalStaff/updateStatus/'+hospitalId+'/'+referralDoctorId,newStatusObj, this.jwt());
  }
  getRegisteredReferralDoctorRecordsCount(hospitalId){
    return this.http.get( this.baseUrl +'hospital/getRefferalCount/'+hospitalId, this.jwt());
  }
  getRegisteredReferralDoctors(hospitalId,start,limit){
    return this.http.get( this.baseUrl +'hospital/getRegisteredRefferal/'+hospitalId+'/'+start+'/'+limit, this.jwt());
  }
  getStaffUsers(hospitalId){
    return this.http.get( this.baseUrl +'hospitalStaff/getStaff/'+hospitalId, this.jwt());
  }
  sendMessage(senderId,recieverId,textMessage){
    return this.http.post(this.baseUrl +'hospital/sendMessage/'+ senderId +'/'+ recieverId , textMessage, this.jwt()); 
  }
  getHospitalAndBranchAdmins(userId){
    return this.http.get( this.baseUrl +'hospital/getStaffAdmin/'+userId, this.jwt());
  }
  getMessages(senderId,recieverId){
    return this.http.get( this.baseUrl +'hospital/getMessage/'+senderId+'/'+recieverId, this.jwt());
  }
  getHospitalReferralDoctors(hospitalId){
    return this.http.get( this.baseUrl +'hospitalStaff/getReferralStaff/'+hospitalId, this.jwt());
  }
  getReferralHospitalAdmins(referralId){
    return this.http.get( this.baseUrl +'hospital/getReferralAdmin/'+referralId, this.jwt());
  }
  updateReadStatus(senderId,recieverId){
    return this.http.put( this.baseUrl +'hospital/markMessageRead/'+senderId+'/'+recieverId, this.jwt());
  }
  getReferralStaffList(referralId){
    return this.http.get( this.baseUrl +'hospitalStaff/referralStaff/'+referralId, this.jwt());
  }
  getAllBranchStaffs(staffId){
    return this.http.get( this.baseUrl +'hospitalStaff/staff/'+staffId, this.jwt());
  }
  getStaffReferralDoctrs(staffId){
    return this.http.get( this.baseUrl +'hospitalStaff/staffReferral/'+staffId, this.jwt());
  }
  getBranchStaffUsers(hospitalBranchId){
    return this.http.get( this.baseUrl +'hospitalStaff/getBranchStaff/'+hospitalBranchId, this.jwt());
  }
}
