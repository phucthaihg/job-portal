import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEJob} from "../models/IEJob";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class EJobsService {

  constructor(private httpClient: HttpClient) { }

  getJobs() {
    return this.httpClient.get<Array<IEJob>>(`${environment.apiUrl}/employers/jobs/`);
  }

  getJobById(job_id: string) {
    return this.httpClient.get<IEJob>(`${environment.apiUrl}/employers/jobs/` + job_id);
  }

  updateJobById(job_id: string, job: IEJob) {
    return this.httpClient.patch(`${environment.apiUrl}/employers/jobs/` + job_id, job);
  }

  addJob(job: IEJob) {
    return this.httpClient.post(`${environment.apiUrl}/employers/jobs/`, job);
  }
}
