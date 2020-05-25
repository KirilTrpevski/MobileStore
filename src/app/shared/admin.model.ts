export class Admin {
  constructor(public email: string,
              public id: string,
              private _token: string,
              private tokenExpDate: Date) {}

  get token() {
    if (!this.tokenExpDate || new Date() > this.tokenExpDate){
      return null;
    }
    return this._token;
  }
}
