export interface IEmployer{
  _id: string,
  email: string,
  fullname: string,
  organization: string,
  location: {
    address: string,
    city: string,
    state: string,
    country: string
  }
}
