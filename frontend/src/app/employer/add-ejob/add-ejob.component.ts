import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EJobsService} from "../../services/e-jobs.service";
import {IEJob} from "../../models/IEJob";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {globalVars} from "../../../environments/globalVars";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ICity, ICountry, IState} from "../../models/ICountry";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-add-ejob',
  templateUrl: './add-ejob.component.html',
  styleUrls: ['../../assests/css/ejob.css']
})
export class AddEjobComponent implements OnInit {
  //form
  form!: FormGroup;

  //public variables for configuration
  jobTypes = globalVars.jobTypes;
  //job_type_selected! : string;
  jobStatuses = globalVars.jobStatuses;
  //job_status_selected! : string ;
  countries!: ICountry[];
  states!: IState[];
  cities!: ICity[];

  //richtexteditor
  public Editor = ClassicEditor;

  constructor(
    private formBuilder : FormBuilder,
    private ejobService: EJobsService,
    private userService: UserService,
    private utilsService: UtilsService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {

    this.initFormValue();

    this.utilsService.getLocations()
      .subscribe(
        (response) => {
          this.countries = <Array<ICountry>>response;
        }
      );
  }

  initFormValue(){
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skills: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      salary: ['', Validators.required],
      job_type: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['', 'employers']);
  }
  addEJob(){
    console.log("addEJob", this.form.value);
    const job = {} as IEJob;
    job.title = this.form.value.title;
    job.description = this.form.value.description;
    job.skills = this.form.value.skills.split(",");
    job.location = {
      address: '',
      city: this.form.value.city,
      state: this.form.value.state,
      country: this.form.value.country
    };
    job.salary = this.form.value.salary;

    const user = this.userService.decodeToken();
    job.created_by = user.user_id;
    job.employer = {
      _id: user.user_id,
      email: user.email,
      fullname: user.fullname,
      organization: ''
    };

    this.ejobService.addJob(job).subscribe(
      (reponse) =>{
        //this.router.navigate(['', 'employers']);
        this.openSnackBar("Job created successfully", "");
        this.initFormValue();
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
    if(this.form.get('country')){
      const country: string = this.form.get('country')?.value;
      this.states = this.countries.find((c) => c.name === country)?.states || [];
    }
    //this.refreshCities();
  }

  refreshCities(){
    console.log("refreshCities");
    if(this.form.get('state')){
      const state: string = this.form.get('state')?.value;
      this.cities = this.states.find((c) => c.name === state)?.cities || [];
    }
  }
}
