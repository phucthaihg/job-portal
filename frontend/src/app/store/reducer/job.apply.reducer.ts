import { createReducer, on } from '@ngrx/store';
import {jobApply, jobApplySuccess, jobSeekerSearch, jobSeekerSearchResult} from "../action/seeker.actions";


export const initialState = '';

export const jobApplyReducer = createReducer(
  initialState,
  on(jobApply, state => state),
  on(jobApplySuccess, (state, {success}) => state + success)
);
