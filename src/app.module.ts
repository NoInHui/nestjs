import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { StudyModule } from './study/study.module';

@Module({
  imports: [UsersModule, StudyModule],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
