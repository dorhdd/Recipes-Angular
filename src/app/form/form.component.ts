import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // @ViewChild('f') myForm: NgForm
  // defultSelect = "Basic"
  // defultEmail = "@explain.com"
  // defultPassword = "password"
  // levelsOptions= ["", "Basic", "Advance", "Pro"]
  // data:{email:string, level:string, password:string} = {
  //   email:'',
  //   level:'',
  //   password:'',
  // }
  // showUserData = false

  subjectsOptions = ["", "1", "2", "3"]
  forbiddenUserName = ["name", "man"];

  contactForm: FormGroup
  seccessMassage = false;

  constructor(private router: Router, private route:ActivatedRoute) { }
  //private router: Router | צריך להיות בקונסטרקטור
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      "personalData": new FormGroup({
        "name": new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        "phone": new FormControl(null),
        "email": new FormControl(null, [Validators.required, Validators.email]),
      }),

      "contentReferral": new FormGroup({
        "subject": new FormControl(null, Validators.required),
        "content": new FormControl(null),
      }),
    })
  }

  // onSubmit(){
  //   this.data.email = this.myForm.value.userData.email
  //   this.data.level = this.myForm.value.userData.level
  //   this.data.password = this.myForm.value.userData.password
  //   this.showUserData = true
  //   this.myForm.reset()
  //   setTimeout(()=>{
  //     this.router.navigate(['/recipes'])
  //   },4000)
  // }


  onSubmit(){
    this.seccessMassage = true
    this.contactForm.reset()
    setTimeout(()=>{
      this.router.navigate(["../"], {relativeTo: this.route})
    },3000)
    
  }

  forbiddenNames(control: FormControl): {[s:string]:boolean} {
    if(this.forbiddenUserName.indexOf(control.value) !== -1){
      return {"NameIsForbidden":true}
    }
    return null
  }

}
