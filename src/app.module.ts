import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyModule } from './study/study.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [StudyModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
