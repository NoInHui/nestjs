import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get() // '/' 루트를 말하는것임, 루트는 생략 가능
  // @Controller 데커레이터에도 인수를 전달할 수 있습니다.
  // 이를 통해 라우팅 경로의 접두어 prefix 를 지정합니다.
  // 예를 들어 @Controller('app') 이라고 했다면 이제 http://localhost:3000/app/hello 경로로 접근해야 합니다.
  // 보통 컨트롤러가 맡은 리소스의 이름을 지정하는 경우가 많습니다.

  // 요청 객체
  // 클라이언트는 요청을 보내면서 종종 서버가 원하는 정보를 함께 전송합니다.
  // Nest 는 요청과 함께 전달되는 데이터를 핸들러(요청을 처리할 구성 요소, 컨트롤러가 이 역할을 합니다)가 다룰 수 있는 객체로 변환합니다.
  // 이렇게 변화된 객체는 @Req 데커레이터를 이용하여 다룰 수 있습니다.


  @Get('/hello')
  getHello(@Req() req : Request): string {
    console.log(req);
    return this.appService.getHello();
  }

  // 요청 객체는 HTTP 요청을 나타냅니다.
  // 요청 객체(req) 가 어떻게 구성되어 있는지 console 로 출력해보세요.
  // 쿼리 스트링, 매개변수, 헤더와 본문 외 많은 정보를 가지고 있습니다.
  
  // 여러분이 API 를 작성할 때 요청 객체를 직접 다루는 경우는 드뭅니다.
  // Nest 는 @Query() , @Param(key?: string), @Body() 데커레이터를 이용해서 요청에 포함된 쿼리 매개변수, 패스(경로) 매개변수, 본문body 을 쉽게 받을 수 있게 해줍니다.


  



  // 와일드 카드 사용
  // 라우팅 패스는 와일드 카드를 이용하여 작성할 수 있습니다.
  // 예를 들 어 별표(*) 문자를 사용하면 문자열 가운데 어떤 문자가 와도 상관없이 라우팅 패스를 구성하겠다는 뜻입니다.
  // * 외에 ?,+,() 문자 역시 정규 표현식에서의 와일드 카드와 동일하게 동작합니다.
  // 단, 하이픈(-), 점(.) 은 문자열로 취급합니다.
  // 즉, @Get('te.t')  는 test 로 요청할 수 없습니다.
  // 와일드 카드는 컨트롤러의 패스를 정할 때만 사용하는 것이 아닙니다.
  // 앞으로 배우게 될 많은 컴포넌트에서 이름을 정할 때 사용할 수 있습니다.
  @Get('te*t')
  getTest1(): string {
    return this.appService.getTest1();
  }

  

  


}
