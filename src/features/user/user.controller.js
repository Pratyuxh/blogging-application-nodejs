import UserModel from './user.model.js';
import jwt from 'jsonwebtoken'
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

export default class UserController {

  constructor(){
    this.userRepository = new UserRepository();
  }

  async register(req, res) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new UserModel(
      name,
      email,
      hashedPassword,
      type
    );
    await this.userRepository.register(user);
    res.status(201).send(user);
  }

  async login(req, res, next) {
    try {

    const user = await this.userRepository.findByEmail(req.body.email);
    if(!user){
      return res
        .status(400)
        .send('Incorrect Credentials');
    }else{
      //compare password with hashed password
      const result = await bcrypt.compare(req.body.password, user.password);
      if(result){
        const token = jwt.sign({id: result.id, email: result.email}, process.env.JWT_SECRET, {
          expiresIn:'1h',
      });
    return res.status(200).send(token);
      }else{
        return res
       .status(400)
       .send('Incorrect Credentials');
      }
    }
 }catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
  }
}
