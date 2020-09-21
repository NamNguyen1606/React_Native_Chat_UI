interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  isActive?: boolean;
  token?: string;
  phone?: string;
}
// firstName: string,
// lastName: string,
// email: string,
// password: string,
// avatar: string,
// isActive: boolean,
// token: string,
class User {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _password: string;
  private _avatar: string;
  private _isActive: boolean;
  private _token: string;
  private _phone: string;

  constructor({
    id = '',
    firstName = '',
    lastName = '',
    email = '',
    avatar = '',
    password = '',
    isActive = false,
    token = '',
    phone = '',
  }: IUser) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._avatar = avatar;
    this._isActive = isActive;
    this._token = token;
    this._phone = phone;
  }

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }
  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }
  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }
  set password(value: string) {
    this._password = value;
  }

  get avatar(): string {
    return this._avatar;
  }
  set avatar(value: string) {
    this._avatar = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }
  set isActive(value: boolean) {
    this._isActive = value;
  }

  get token(): string {
    return this._token;
  }
  set token(value: string) {
    this._token = value;
  }

  get phone(): string {
    return this._phone;
  }
  set phone(value: string) {
    this._phone = value;
  }
}

export default User;
