import { Controller, Post, Body, UseGuards, Patch, Param, Get } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serlialize.interceptor';
import { ApproveReportDto } from './dtos/approve-reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService){

  }
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
     return this.reportsService.create(body, user);
  }


  @Get('/:id')
  getReport(@Param('id') id: string){
     return this.reportsService.findOne(id);
  }

  @Patch('approve/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto){

    const report = this.reportsService.changeApproval(id, body.approved);

  }
}
