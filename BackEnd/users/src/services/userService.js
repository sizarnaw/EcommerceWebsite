const { UserRepository } = require("../database");
const { FormatResponse, GenerateSignature } = require('../utils');
const bcrypt = require('bcrypt');

class UserService {

  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {

    const { username, password } = userInputs;
    const existingUser = await this.repository.FindUser({ username });

    if (existingUser) {

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (passwordMatch) {
        const token = await GenerateSignature({ username: existingUser.username, id: existingUser.id,permission:existingUser.permission });
        return FormatResponse({ id: existingUser._id, username: existingUser.username, token, role: existingUser.permission });

      }
    }

    return FormatResponse(null);
  }

  async SignUp(userInputs) {

    let { username, password } = userInputs;
    password = await bcrypt.hash(password, 10);
    //TODO remove "A"
    let permission = username == "admin" ? "A" : "U";
    const newUser = await this.repository.CreateUser({ username, password, permission });
    if(newUser.status==200){
    const token = await GenerateSignature({ username: username, id: newUser.id , role: newUser.permission });
    return newUser;
    }else {
      return newUser;
    }

  }
  async updatePermission(changePermessionInputs) {
   return  await this.repository.updatePermission(changePermessionInputs);

  }

  async GetUserByID(id) {
    return await this.repository.FindUserrById(id);
  }
  async GetUserByUUID(id) {
    return await this.repository.FindUserrByUUId(id);
  }
}
module.exports = UserService;  