
export class User {
  protected _id: string = "";
  protected _first_name: string;
  protected _last_name: string;
  
  constructor(
    id: string,
    first_name: string,
    last_name: string,
    ) {
      this._id = id;
      this._first_name = first_name;
      this._last_name = last_name;
    }
    
    public id() {
      return this._id;
    }
   
  
  }
  