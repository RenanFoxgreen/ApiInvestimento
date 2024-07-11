import { Investment } from '../entities/investment.entity';
import { Withdrawal } from '../entities/withdrawal.entity';

export class InvestmentDetailsDto {
  investment: Investment;
  withdrawals: Withdrawal[];
  expectedBalance: number;
}
