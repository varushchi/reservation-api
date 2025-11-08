import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ReservationDto {
  @IsInt()
  event_id!: number;

  @IsString()
  @IsNotEmpty()
  user_id!: string;
}
