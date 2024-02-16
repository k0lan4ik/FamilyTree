import { makeAutoObservable } from "mobx";

export default class PersoneStore {
  constructor() {
    this._persons = [];
    makeAutoObservable(this);
  }

  setPersones(persons) {
    this._persons = persons;
  }

  get persones() {
    return this._persons;
  }
}
