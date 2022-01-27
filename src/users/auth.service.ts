import { Injectable, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

// _sycrypt will return a callback. we can change it to a promise by using promisify

const scrypt = promisify(_scrypt);

@Injectable()

export class AuthService{
   constructor(private usersService: UsersService){}

   async signUp(email: string, password: string){
       // check if email exisits
       const users = await this.usersService.find(email);
       if(users.length === 0){
           throw new BadRequestException('Email already exists');
       }
      // Generate a salt
       const salt = randomBytes(8).toString('hex');

       // hash the password
       const hash = (await scrypt(password,salt,32)) as Buffer;

       // join tha salt and hash together e.g abcd.wnnnetey
       const result = salt + '.' + hash.toString('hex');

       //create a new user and save

       const user = this.usersService.create(email,result);

       return user;
   }

   signIn(){

   }
}