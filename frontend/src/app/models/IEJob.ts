import {ISeeker} from "./ISeeker";

export interface IEJob {
  _id: string,
  title: string,
  description: string,
  skills: string[],
  job_type: string,
  location: {
    address: string,
    city: string,
    state: string,
    country: string
  },
  salary: string,
  timestamp_created: number,
  created_by: string,
  employer: {
    _id: string,
    email: string,
    fullname: string,
    organization: string
  },
  applied_by: ISeeker[],
  status: string
}
