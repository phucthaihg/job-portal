import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ISeeker} from "../../models/ISeeker";
import {globalVars} from "../../../environments/globalVars";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-seeker-profile',
  templateUrl: './seeker-profile.component.html',
  //styleUrls: ['./seeker-profile.component.css']
  styleUrls: ['../../assests/css/ejob.css']
})
export class SeekerProfileComponent implements OnInit {

  disableSelect = true;

  form!: FormGroup;

  public user!: ISeeker;

  seekerStatuses = globalVars.seekerStatuses;

  constructor(
    private userService: UserService,
    private formBuilder : FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,) {

    this.initFormValue();

    const user = this.userService.decodeToken();
    if(user && user.user_id) {
      this.userService.getSeekerById(user.user_id)
        .subscribe(
          (response) => {
            this.user = <ISeeker>response;

            this.form.get('fullname')?.setValue(this.user.fullname);
            this.form.get('email')?.setValue(this.user.email);
            this.form.get('education')?.setValue(this.user.education);
            this.form.get('skill_set')?.setValue(this.user.skill_set.join(','));
            this.form.get('yoe')?.setValue(this.user.yoe);
            this.form.get('resume')?.setValue(this.user.resume);
            this.form.get('status')?.patchValue(this.user.status);
          }
        )
    }

  }

  ngOnInit(): void {
  }

  initFormValue(){
    if(this.disableSelect) {
      this.form = this.formBuilder.group({
        fullname: [''],
        email: [''],
        education: [''],
        skill_set: [''],
        yoe: [''],
        resume: [''],
        status: ['']
      });
    }else {
      this.form = this.formBuilder.group({
        fullname: ['', Validators.required],
        email: ['', Validators.required],
        education: ['', Validators.required],
        skill_set: ['', Validators.required],
        yoe: ['', Validators.required],
        resume: ['', Validators.required],
        status: ['', Validators.required]
      });
    }
  }

  cancel(){
    this.router.navigate(['', 'seekers']);
  }

  updateProfile(){
    this.user.fullname = this.form.value.fullname;
    this.user.education = this.form.value.education;
    this.user.skill_set = this.form.value.skill_set.split(",");
    this.user.yoe= this.form.value.yoe;
    this.user.resume = this.form.value.resume;
    this.user.status = this.form.value.status;

    this.userService.updateSeekerById(this.user._id, this.user).subscribe(
      (response) =>{
        this.openSnackBar("Profile updated successfully", "");
      },
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "top",
    });
  }
}
