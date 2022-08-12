import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {globalVars} from "../../../environments/globalVars";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {IEmployer} from "../../models/IEmployer";
import {ICity, ICountry, IState} from "../../models/ICountry";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  //styleUrls: ['./employer-profile.component.css']
  styleUrls: ['../../assests/css/ejob.css']
})
export class EmployerProfileComponent implements OnInit {

  disableSelect = false;

  form!: FormGroup;

  public user!: IEmployer;

  //employerStatuses = globalVars.employerStatuses;

  countries!: ICountry[];
  states!: IState[];
  cities!: ICity[];

  constructor(
    private userService: UserService,
    private formBuilder : FormBuilder,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    private router: Router,) {

    this.initFormValue();

    //Edit / View mode
    if(this.router.url.includes('view')){
      this.disableSelect = true;
    }

    this.utilsService.getLocations()
      .subscribe(
        (response) => {
          this.countries = <Array<ICountry>>response;
          const user = this.userService.decodeToken();
          if(user && user.user_id) {
            this.userService.getEmployerById(user.user_id)
              .subscribe(
                (response) => {
                  this.user = <IEmployer>response;

                  this.form.get('fullname')?.setValue(this.user.fullname);
                  this.form.get('email')?.setValue(this.user.email);
                  this.form.get('organization')?.setValue(this.user.organization);

                  this.form.get('country')?.patchValue(this.user.location.country);
                  this.refreshStates();
                  this.form.get('state')?.patchValue(this.user.location.state);
                  this.refreshCities();
                  this.form.get('city')?.patchValue(this.user.location.city);
                  this.form.get('address')?.patchValue(this.user.location.address);
                }
              )
          }
        }
      );



  }

  ngOnInit(): void {
  }

  initFormValue(){
    if(this.disableSelect) {
      this.form = this.formBuilder.group({
        fullname: [''],
        email: [''],
        organization: [''],
        address: [''],
        city: [''],
        state: [''],
        country: ['']
      });
    }else{
      this.form = this.formBuilder.group({
        fullname: ['', Validators.required],
        email: ['', Validators.required],
        organization: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
      });
    }
  }

  cancel(){
    this.router.navigate(['', 'employers']);
  }
  edit(){
    this.router.navigate(['', 'employers', 'profile', 'edit']);
  }

  updateProfile(){
    this.user.fullname = this.form.value.fullname;
    this.user.organization = this.form.value.organization;
    this.user.location.address = this.form.value.address;
    this.user.location.city = this.form.value.city;
    this.user.location.state = this.form.value.state;
    this.user.location.country = this.form.value.country;

    this.userService.updateEmployerById(this.user._id, this.user).subscribe(
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

  refreshStates(){
    console.log("refreshStates");
    if(this.form.get('country') && this.countries){
      const country: string = this.form.get('country')?.value;
      this.states = this.countries.find((c) => c.name === country)?.states || [];
      console.log("this.states: ", this.states);
    }
  }

  refreshCities(){
    console.log("refreshCities");
    if(this.form.get('state') && this.states){
      const state: string = this.form.get('state')?.value;
      this.cities = this.states.find((c) => c.name === state)?.cities || [];
      console.log("this.cities: ", this.cities);
    }
  }
}
