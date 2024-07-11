import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Withdrawal } from './withdrawal.entity';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  owner: string;

  @Column()
  creationDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  initialValue: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  currentBalance: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0.52 })
  monthlyInterestRate: number;

  @Column({ default: false })
  isClosed: boolean;

  @OneToMany(() => Withdrawal, (withdrawal) => withdrawal.investment)
  withdrawals: Withdrawal[];
}
