import { createAction, props } from '@ngrx/store';
import { Job } from "../../job-seeker/search-jobs/job.model";

export const JOB_SEEKER_SEARCH = 'JOB_SEEKER_SEARCH';
export const JOB_SEEKER_MY_JOB = 'JOB_SEEKER_MY_JOB';
export const JOB_SEEKER_MY_JOB_RESULT = 'JOB_SEEKER_MY_JOB_RESULT';
export const JOB_SEEKER_SEARCH_RESULT = 'JOB_SEEKER_SEARCH_RESULT';
export const JOB_SEEKER_APPLY = 'JOB_SEEKER_APPLY';
export const JOB_SEEKER_APPLY_SUCCESS = 'JOB_SEEKER_APPLY_SUCCESS';

// SEEKER ACTIONS
export const jobSeekerSearch = createAction(JOB_SEEKER_SEARCH, props<{keyword:string, city:string, state:string, page:string}>());
export const jobSeekerMyJob = createAction(JOB_SEEKER_MY_JOB, props<{email:string}>());
//export const jobSeekerMyJobResult = createAction(JOB_SEEKER_MY_JOB_RESULT, props<{jobs: Array<Job>}>());

export const jobSeekerMyJobResult = createAction(JOB_SEEKER_MY_JOB_RESULT, props<{response: {data: Array<Job>, total: number}}>());

export const jobSeekerSearchResult = createAction(JOB_SEEKER_SEARCH_RESULT, props<{response: {data: Array<Job>, total: number}}>());
export const jobApply = createAction(JOB_SEEKER_APPLY, props<{job_id: string, email: string}>());
export const jobApplySuccess = createAction(JOB_SEEKER_APPLY_SUCCESS, props<{success: string}>());
