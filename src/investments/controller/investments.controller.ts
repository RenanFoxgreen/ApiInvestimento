import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { WithdrawInvestmentDto } from '../dto/withdraw-investment.dto';
import { InvestmentsService } from '../service/ investments.service';

@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  create(@Body() createInvestmentDto: CreateInvestmentDto) {
    return this.investmentsService.createInvestment(createInvestmentDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.investmentsService.getInvestmentDetails(id);
  }

  @Post('withdraw')
  withdraw(@Body() withdrawInvestmentDto: WithdrawInvestmentDto) {
    return this.investmentsService.withdrawInvestment(withdrawInvestmentDto);
  }

  @Get()
  findAll(@Query('owner') owner: string, @Query('status') status: string) {
    return this.investmentsService.findAllInvestments(owner, status);
  }
}
