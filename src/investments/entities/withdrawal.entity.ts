import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Investment } from './investment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Withdrawal {
  @ApiProperty({ description: 'ID of the withdrawal' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Investment ID' })
  @Column()
  investmentId: number;

  @ApiProperty({ description: 'Investment associated with the withdrawal' })
  @ManyToOne(() => Investment, (investment) => investment.withdrawals)
  @JoinColumn({ name: 'investmentId' })
  investment: Investment;

  @ApiProperty({ description: 'Amount withdrawn' })
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({ description: 'Date of the withdrawal' })
  @Column()
  date: Date;
}
