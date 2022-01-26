import { Injectable, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()

export class AuthService{
   constructor(private usersService: UsersService){}

   async signUp(email: string, password: string){
       // check if email exisits
       const users = await this.usersService.find(email);
       if(users.length === 0){
           throw new BadRequestException('Email already exists');
       }
   }

   signIn(){

   }
}