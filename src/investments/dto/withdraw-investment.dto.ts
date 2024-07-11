import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class WithdrawInvestmentDto {
  @IsNotEmpty()
  investmentId: number;

  @IsNumber()
  @Min(0)
  amount: number;
}
