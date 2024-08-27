import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user-dto"
import { Users } from "./entities/user.entity";
import { Repository } from "typeorm";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
) { }
  async findOneBy(email: string): Promise<Users | undefined> {
    return await this.userRepository.findOne({ email: email });
  }
  async create(createUserDto: CreateUserDto) {
    const user = new Users();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return await this.userRepository.save(user);
  }
}