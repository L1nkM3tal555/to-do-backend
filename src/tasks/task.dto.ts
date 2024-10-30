import { IsNotEmpty, IsString} from "class-validator";
export class TaskDto {
    @IsString()
    @IsNotEmpty()
    estado:string;
    @IsString()
    @IsNotEmpty()
    fechaInicio: string;
    @IsString()
    @IsNotEmpty()
    fechaFin: string;
}
