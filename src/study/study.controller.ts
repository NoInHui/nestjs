import { Controller, Get, Query, Render, Req, Res } from '@nestjs/common';
import { StudyService } from './study.service';
import { Response } from 'express';

@Controller('study')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  // 데코레이션을 통한 렌더링
  @Get('/index')
  @Render('study/typescript1.hbs')
  getIndexPage(@Res() res: Response) {
    return {message: 'Noh In Hui'}
  }

  // 동적 템플릿 렌더링
  // http://localhost:3000/study/getStudyPage?page=study/typescript1
  @Get('/getStudyPage')
  getStudyPage(
    @Req() req: Request,
    @Res() res: Response,
    @Query('page') page,
  ) {
    // console.log(req);
    return res.render(
      page,
      {message: 'Noh In Hui'}
    )
  }
}