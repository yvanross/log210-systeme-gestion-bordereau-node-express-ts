export class User {
	protected _id: number = 0;
	protected _first_name: string;
	protected _last_name: string;
	protected _email: string;

	constructor(
		id: number,
		first_name: string,
		last_name: string,
		email: string,
	) {
		this._id = id;
		this._first_name = first_name;
		this._last_name = last_name;
		this._email = email;
	}
}
