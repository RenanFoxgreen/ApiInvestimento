import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from '../entities/investment.entity';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { WithdrawInvestmentDto } from '../dto/withdraw-investment.dto';
import { Withdrawal } from '../entities/withdrawal.entity';
import { InvestmentDetailsDto } from '../dto/investment-details.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentRepository: Repository<Investment>,
    @InjectRepository(Withdrawal)
    private withdrawalRepository: Repository<Withdrawal>,
  ) {}

  private calculateCompoundInterest(
    principal: number,
    rate: number,
    time: number,
  ): number {
    return principal * Math.pow(1 + rate / 100, time);
  }

  async createInvestment(
    createInvestmentDto: CreateInvestmentDto,
  ): Promise<Investment> {
    if (createInvestmentDto.initialValue < 0) {
      throw new BadRequestException(
        'Investimento negativo não pode ser realizado',
      );
    }
    const newInvestment = this.investmentRepository.create(createInvestmentDto);
    newInvestment.currentBalance = createInvestmentDto.initialValue;
    newInvestment.isClosed = false;
    await this.investmentRepository.save(newInvestment);
    return newInvestment;
  }

  async getInvestmentDetails(id: number): Promise<InvestmentDetailsDto> {
    const investment = await this.investmentRepository.findOne({
      where: { id },
    });
    if (!investment) {
      throw new NotFoundException('Investimento não encontrado');
    }

    const withdrawals = await this.withdrawalRepository.find({
      where: { investmentId: id },
      order: { date: 'ASC' },
    });

    const creationDate = new Date(investment.creationDate);
    const currentDate = new Date();
    const monthsElapsed =
      (currentDate.getFullYear() - creationDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      creationDate.getMonth();

    const expectedBalance = this.calculateCompoundInterest(
      investment.initialValue,
      investment.monthlyInterestRate,
      monthsElapsed,
    );

    return { investment, withdrawals, expectedBalance };
  }

  async withdrawInvestment(
    withdrawInvestmentDto: WithdrawInvestmentDto,
  ): Promise<Investment> {
    const investment = await this.investmentRepository.findOne({
      where: { id: withdrawInvestmentDto.investmentId },
    });

    if (!investment) {
      throw new NotFoundException('Investimento não encontrado');
    }

    const investmentAge =
      new Date().getFullYear() - investment.creationDate.getFullYear();
    let taxRate = 0;

    if (investmentAge < 1) {
      taxRate = 0.225;
    } else if (investmentAge >= 1 && investmentAge <= 2) {
      taxRate = 0.185;
    } else {
      taxRate = 0.15;
    }

    const taxableAmount = withdrawInvestmentDto.amount * (1 - taxRate);
    if (taxableAmount > investment.currentBalance) {
      throw new BadRequestException('Saldo insuficiente para retirada');
    }

    investment.currentBalance -= taxableAmount;
    await this.investmentRepository.save(investment);

    const withdrawal = this.withdrawalRepository.create({
      investmentId: investment.id,
      amount: withdrawInvestmentDto.amount,
      date: new Date(),
    });
    await this.withdrawalRepository.save(withdrawal);

    return investment;
  }

  async findAllInvestments(
    owner: string,
    status?: string,
  ): Promise<Investment[]> {
    let query = this.investmentRepository.createQueryBuilder('investment');

    if (owner) {
      query = query.where('investment.owner LIKE :owner', {
        owner: `%${owner}%`,
      });
    }

    if (status) {
      query = query.andWhere('investment.isClosed = :status', {
        status: status === 'closed',
      });
    }

    return query.getMany();
  }
}
