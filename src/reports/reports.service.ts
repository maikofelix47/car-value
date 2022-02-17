import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository <Report>){

  }

  create(reportDto: CreateReportDto, user: User){
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean){
     const report =  await this.repo.findOne(id);
     if(!report){
        throw new NotFoundException('Report Not Found');
     }
     report.approved = approved;
     return this.repo.save(report)
  }

  findOne(id: string){
     const report = this.repo.findOne(id);
     if(!report){
      throw new NotFoundException('Report Not Found');
     }

     return report;
  }

}
