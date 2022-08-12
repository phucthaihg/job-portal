export interface Job {
  _id: string,
  title: string,
  description: string,
  salary: string,
  skills: Array<string>,
  job_type: string,
  location: {
    address: string,
    city: string,
    state: string,
    country: string
  },
  timestamp_created: string,
  created_by: string,
  employer: {
    _id: string,
    email: string,
    fullname: string,
    organization: string
  },
  applied_by: [
    {
      _id: string,
      email: string,
      fullname: string,
      resume: string,
      education: string,
      skill_set: [
        { skill: string }
      ],
      yoe: Number,
      status: string
    },
  ]
}
