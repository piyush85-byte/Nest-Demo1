import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";


@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}
    @Post("/create")
    async create(@Body()body:{username:string,email:string,password:string}):Promise<string>{
       
        return this.userService.createUser(body)
    
    }
}