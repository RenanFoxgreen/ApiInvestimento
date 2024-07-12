import { IsNotEmpty, IsNumber, Min, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvestmentDto {
  @ApiProperty({ description: 'Owner of the investment' })
  @IsNotEmpty()
  owner: string;

  @ApiProperty({ description: 'Creation date of the investment' })
  @IsDateString()
  creationDate: string;

  @ApiProperty({ description: 'Initial value of the investment' })
  @IsNumber()
  @Min(0)
  initialValue: number;

  @ApiProperty({ description: 'Monthly interest rate of the investment' })
  @IsNumber()
  @Min(0)
  monthlyInterestRate: number;
}
