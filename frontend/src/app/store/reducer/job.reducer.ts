import { createReducer, on } from '@ngrx/store';
import {
  jobSeekerMyJob, jobSeekerMyJobResult,
  jobSeekerSearch,
  jobSeekerSearchResult
} from "../action/seeker.actions";
import { Job } from "../../job-seeker/search-jobs/job.model";

export const initialState:{data: Array<Job>, total:number} =  {data: [], total: 0};

export const jobReducer = createReducer(
  initialState,
  on(jobSeekerSearch, state => state),
  on(jobSeekerSearchResult, (state, {response}) => response),
  on(jobSeekerMyJob, state => state),
  on(jobSeekerMyJobResult, (state, {response}) => response)
);
