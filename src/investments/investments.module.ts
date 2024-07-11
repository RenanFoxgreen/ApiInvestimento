import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentsController } from './controller/investments.controller';
import { Investment } from './entities/investment.entity';

import { Withdrawal } from './entities/withdrawal.entity';
import { InvestmentsService } from './service/ investments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investment, Withdrawal])],
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
})
export class InvestmentsModule {}
