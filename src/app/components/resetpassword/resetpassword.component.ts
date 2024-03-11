import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  massage:string = "" ;
  isvalid:boolean = false ;
  valid:boolean = false ;
  isvalid1:boolean = false ;
  valid2:boolean = false ;
  email:string|null = "" ;
  // confirmPassword:string = "" ;
  constructor(private _SharedDataService:SharedDataService , private TostrService:ToastrService , private _Router:Router , private _ActivatedRoutetiv:ActivatedRoute){}
  ngOnInit(): void {
    this._ActivatedRoutetiv.paramMap.subscribe({
      next:(response)=>{
    this.email = response.get('email') ;
      }
     })
  }
  // form:FormGroup = new FormGroup({
  //   Password : new FormControl("" , [Validators.required]) ,
  // })
  form : FormGroup = new FormGroup({
    password : new FormControl("",[ Validators.required , Validators.pattern(/^\w{5,}$/)]),
    rePassword : new FormControl("" ,),
    } , {validators:[this.confirmPassword]} as FormControlOptions) ;
    confirmPassword(formGroup :FormGroup){
      if(formGroup.get('rePassword')?.value == ""){
        formGroup.get('rePassword')?.setErrors({required : true})
      }
      else if (formGroup.get('rePassword')?.value != formGroup.get('password')?.value){
        formGroup.get('rePassword')?.setErrors({mistake:true})
      }
      }
      forget(){
        this.isvalid = true ;
       this.valid = true ;
        //  console.log(this.form.get('email')?.value) ;
         this._SharedDataService.restPasswoed(this.email , this.form.get('password')?.value).subscribe({
           next : (response)=>{
             this.isvalid = false
             this.valid = false
         this.TostrService.success("Password Updates")
         localStorage.setItem('Token' , response.token)
         this._Router.navigate(['/home'])
       console.log(response)
           },
           error : (response)=>{
             console.log(response)
       console.log(this.massage)
             if(response.statusText == "Unknown Error"){
               this.massage = response.statusText
             }
             else{
               this.massage = response.error.message
             }

           }
         })
       }
      close(){
        this.massage = "" ;
        this.isvalid = false
      this.valid = false
      }
}
