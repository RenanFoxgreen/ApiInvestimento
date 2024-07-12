import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { WithdrawInvestmentDto } from '../dto/withdraw-investment.dto';

import { InvestmentDetailsDto } from '../dto/investment-details.dto';
import { Investment } from '../entities/investment.entity';
import { InvestmentsService } from '../service/ investments.service';

@ApiTags('Investments')
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @ApiOperation({ summary: 'Create a new investment' })
  @ApiResponse({
    status: 201,
    description: 'The investment has been successfully created.',
    type: Investment,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  create(@Body() createInvestmentDto: CreateInvestmentDto) {
    return this.investmentsService.createInvestment(createInvestmentDto);
  }

  @ApiOperation({ summary: 'Get details of an investment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Investment details retrieved successfully.',
    type: InvestmentDetailsDto,
  })
  @ApiResponse({ status: 404, description: 'Investment not found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.investmentsService.getInvestmentDetails(id);
  }

  @ApiOperation({ summary: 'Withdraw from an investment' })
  @ApiResponse({
    status: 200,
    description: 'Withdrawal successful.',
    type: Investment,
  })
  @ApiResponse({
    status: 400,
    description: 'Insufficient balance for withdrawal.',
  })
  @Post('withdraw')
  withdraw(@Body() withdrawInvestmentDto: WithdrawInvestmentDto) {
    return this.investmentsService.withdrawInvestment(withdrawInvestmentDto);
  }

  @ApiOperation({ summary: 'Find all investments' })
  @ApiResponse({
    status: 200,
    description: 'Investments retrieved successfully.',
    type: [Investment],
  })
  @Get()
  findAll(@Query('owner') owner: string, @Query('status') status: string) {
    return this.investmentsService.findAllInvestments(owner, status);
  }
}
