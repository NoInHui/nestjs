import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsNumber()
    readonly age: number;

    // 배열이면 each true, 옵션값이면 IsOptional 사용
    @IsOptional()
    @IsString({each: true})
    readonly address: string[];



}
