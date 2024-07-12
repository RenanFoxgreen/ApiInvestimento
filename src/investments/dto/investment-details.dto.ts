import { ApiProperty } from '@nestjs/swagger';
import { Investment } from '../entities/investment.entity';
import { Withdrawal } from '../entities/withdrawal.entity';

export class InvestmentDetailsDto {
  @ApiProperty({ description: 'Investment details' })
  investment: Investment;

  @ApiProperty({ description: 'List of withdrawals' })
  withdrawals: Withdrawal[];

  @ApiProperty({
    description: 'Expected balance after applying compound interest',
  })
  expectedBalance: number;
}
