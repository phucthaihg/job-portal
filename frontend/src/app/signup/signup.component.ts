import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Store } from "@ngrx/store";
import { signup } from "../store/action/user.actions";
import { Observable, Subject, takeUntil } from "rxjs";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  isSeeker:boolean = true;

  roles: Role[] = [
    {value: 'seeker', viewValue: 'Seeker'},
    {value: 'employer', viewValue: 'Employer'}
  ];

  token$!: Observable<any>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder : FormBuilder,
              private userService: UserService,
              private router: Router,
              private store: Store<{userReducer: any}>
  ) {

    store.select('userReducer')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          const {token} = response;
          if(token) {
            localStorage.setItem('TOKEN', token);
            const user = this.userService.decodeToken();
            if(user.role === 'employer') {
              router.navigate(['/', 'employers']);
            }else {
              router.navigate(['/', 'search-jobs']);
            }
          }
        }
      );


    this.signUpForm = this.formBuilder.group({
      role: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      fullname: ['', Validators.required],
      education: [],
      skills:[],
      yoe: [],
      file: [],
      resume: [null],
      organization: [],
      address: [],
      city: [],
      state: [],
      country: []
    });
  }

  onFileChange($event:any) {
    if ($event.target.files.length > 0) {
        const file = $event.target.files[0];
        this.signUpForm.patchValue({
          resume: file
        });
    }
  }

  signup() {
    const {role, email, password, fullname, education, skills, yoe, organization, address, city, state, country} = this.signUpForm.value;
    let formData = new FormData();
    formData.append('role', role);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fullname', fullname);
    formData.append('education', education);
    formData.append('skills', skills);
    formData.append('yoe', yoe);
    formData.append('resume', this.signUpForm.get('resume')?.value);
    formData.append('organization', organization);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);

    this.store.dispatch(signup({formData}));
  }


  onRoleChange($event:any) {
    this.isSeeker = $event.value === 'seeker';
  }

  ngOnInit(): void {
  }

}
