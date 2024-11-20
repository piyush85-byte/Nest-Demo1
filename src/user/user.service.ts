import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {hash} from "bcrypt"
import { Repository} from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
    ){}
    async createUser(userData:{username:string,email:string,password:string}){
      const existingUserEmail=await this.userRepository.findOne({where:{email:userData.email}})
      
      if(existingUserEmail) return "User with email already exist."
      
      const existingUserName=await this.userRepository.findOne({where:{username:userData.username}})

      if(existingUserName) return "User with username already exists. Please use unique username."

      const hashedPassword=await hash(userData.password,10)
      
      const newUser = this.userRepository.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    });

    
    await this.userRepository.save(newUser);
      return "User created successfully."
    }
}