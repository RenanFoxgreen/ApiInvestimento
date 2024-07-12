import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawInvestmentDto {
  @ApiProperty({ description: 'ID of the investment to withdraw from' })
  @IsNotEmpty()
  investmentId: number;

  @ApiProperty({ description: 'Amount to withdraw' })
  @IsNumber()
  @Min(0)
  amount: number;
}
