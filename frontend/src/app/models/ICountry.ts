export interface ICity {
  name: string
}

export interface IState {
    name: string,
    cities: ICity[]
}

export interface ICountry {
  _id: string,
  name: string,
  states: IState[]
}
