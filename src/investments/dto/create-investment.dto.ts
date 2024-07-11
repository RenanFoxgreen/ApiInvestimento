import { IsNotEmpty, IsNumber, Min, IsDateString } from 'class-validator';

export class CreateInvestmentDto {
  @IsNotEmpty()
  proprietario: string;

  @IsDateString()
  dataDeCriacao: string;

  @IsNumber()
  @Min(0)
  valorInicial: number;

  @IsNumber()
  @Min(0)
  taxaJurosMensal: number;
  initialValue: number;
  owner: string;
  creationDate: string | number | Date;
  monthlyInterestRate: number;
}
