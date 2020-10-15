interface IUser {
  id?: string;
  fullName: string;
  email: string;
  avatar: string;
  isActive?: boolean;
  phone?: string;
  accountId: string;
  accountType: string;
}

class User {
  private _id: string;
  private _fullName: string;
  private _email: string;
  private _avatar: string;
  private _isActive: boolean;
  private _phone: string;
  private _accountId: string;
  private _accountType: string;

  constructor({
    id = '',
    fullName = '',
    email = '',
    avatar = '',
    isActive = false,
    phone = '',
    accountId = '',
    accountType = '',
  }: IUser) {
    this._id = id;
    this._fullName = fullName;
    this._email = email;
    this._avatar = avatar;
    this._isActive = isActive;
    this._phone = phone;
    this._accountId = accountId;
    this._accountType = accountType;
  }

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get fullName(): string {
    return this._fullName;
  }
  set fullName(value: string) {
    this._fullName = value;
  }

  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
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

  get phone(): string {
    return this._phone;
  }
  set phone(value: string) {
    this._phone = value;
  }

  get accountId(): string {
    return this._accountId;
  }
  set accountId(value: string) {
    this._accountId = value;
  }

  get accountType(): string {
    return this._accountType;
  }
  set accountType(value: string) {
    this._accountType = value;
  }
}

export default User;
