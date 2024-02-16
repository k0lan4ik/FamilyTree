import { makeAutoObservable } from "mobx";
import { MAIN_ROUTE } from "../utils/consts";

export default class LinkStore {
  constructor() {
    this._link = MAIN_ROUTE;
    makeAutoObservable(this);   
  }

  setLink(link) {
    this._link = link;
  }

  get link() {
    return this._link;
  }
}
