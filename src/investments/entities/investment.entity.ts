import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Withdrawal } from './withdrawal.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Investment {
  @ApiProperty({ description: 'ID of the investment' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Owner of the investment' })
  @Column()
  owner: string;

  @ApiProperty({ description: 'Creation date of the investment' })
  @Column()
  creationDate: Date;

  @ApiProperty({ description: 'Initial value of the investment' })
  @Column('decimal', { precision: 10, scale: 2 })
  initialValue: number;

  @ApiProperty({ description: 'Current balance of the investment' })
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  currentBalance: number;

  @ApiProperty({ description: 'Monthly interest rate of the investment' })
  @Column('decimal', { precision: 5, scale: 2, default: 0.52 })
  monthlyInterestRate: number;

  @ApiProperty({ description: 'Investment closure status' })
  @Column({ default: false })
  isClosed: boolean;

  @ApiProperty({
    description: 'List of withdrawals associated with the investment',
  })
  @OneToMany(() => Withdrawal, (withdrawal) => withdrawal.investment)
  withdrawals: Withdrawal[];
}
