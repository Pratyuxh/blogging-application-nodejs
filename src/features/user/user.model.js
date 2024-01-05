import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  static async register(name, email, password, type) {
    try {
    const db = getDB();
    const collection = db.collection("users");

    const newUser = new UserModel(
      name,
      email,
      password,
      type
    );

    await collection.insertOne(newUser);
    return newUser;
    }catch(err){
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  static getAll(){
      return users;
  }
}

let users = [
  {
    id: 1,
    name: 'Seller User',
    email: 'seller@ecom.com',
    password: 'Password1',
    type: 'seller',
  },
  {
    id: 2,
    name: 'Customer User',
    email: 'customer@ecom.com',
    password: 'Password1',
    type: 'customer',
  },
  {
    id: 3,
    name: 'Guest User',
    email: 'guest@ecom.com',
    password: 'Password1',
    type: 'guest',
  }
];
