import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { UserService } from "../../services/user.service";
import {LOGIN, loginSuccess, SIGNUP, signupSuccess} from "../action/user.actions";

@Injectable()
export class UserEffects {

  userLogin$ = createEffect(() =>  this.actions$.pipe(
      ofType(LOGIN),
      exhaustMap((action: {email:string, password:string}) => this.userService.login(action.email, action.password)
        .pipe(
          map(token => {
            return loginSuccess({token});
          }),
          catchError(() => EMPTY))
      )
    )
  );

  userSignup$ = createEffect(() =>  this.actions$.pipe(
      ofType(SIGNUP),

      /*exhaustMap((action: {role:string, email:string, password:string, fullname:string, education:string, skills:string,
        yoe:string, resume:any, organization:string, address:string, city:string, state:string, country:string}) =>*/

    exhaustMap((action: {formData: FormData}) =>

        /*this.userService.signup(action.role, action.email,action.password, action.fullname, action.education, action.skills,
          action.yoe, action.resume,action.organization, action.address, action.city, action.state, action.country)*/
          this.userService.signup(action.formData)

        .pipe(
          map(token => {
            return signupSuccess({token});
          }),
          catchError(() => EMPTY))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
