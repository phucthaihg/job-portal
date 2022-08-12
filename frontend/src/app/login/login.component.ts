import { Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Observable, Subject, takeUntil} from "rxjs";
import { Store } from "@ngrx/store";
import { login } from '../store/action/user.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  constructor(private formBuilder : FormBuilder,
              private userService: UserService,
              private router: Router,
              ) {

    this.initForm();

  }

  initForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnDestroy(): void {

  }


  login(): void {
    const { email, password } = this.form.value;
    const token = this.userService.login(email, password);
    if(!token){

    }
  }

  ngOnInit(): void {
  }

}
