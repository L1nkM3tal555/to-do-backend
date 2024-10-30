import { IsNotEmpty, IsString} from "class-validator";
export class UserDto {
    @IsString()
    @IsNotEmpty()
    nombre:string;
    @IsString()
    @IsNotEmpty()
    password:string;
}
