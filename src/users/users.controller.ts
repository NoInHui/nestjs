import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpCode, BadRequestException, Header, Redirect, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // 응답

  // 앞에서 nest g resource Users 명령어로 USERS 리소스에 대한 CRUD API 를 만들어봤습니다.
  // HTTP 메서드 : POST, GET, PATCH, DELETE

  // 각 요청의 성공 응답 코드는 POST 일 경우에만 201 이고, 나머지는 200 입니다.

  // 서버를 실행하면 어떤 라우팅 패스를 통해 요청을 받을 수 있는지 콘솔 로그를 통해 확인할 수 있습니다.

  // Nest 는 응답을 어떤 방식으로 처리할지 미리 정의해뒀습니다. string, number, boolean 과 같은 자바스크립트 원시 타입을 리턴할 경우 직렬화 없이 바로 보내지만, 객체를 리턴한다면 직렬화를 통해 JSON 으로 자동 변환해줍니다.
  // 예를 들어 Express 를 사용한다면 @Req 데커레이터를 이용해서 Express 응답 객체를 다룰 수 있습니다.

  @Get()
  findAll(@Req() req: Request, @Res() res) {
    const users = this.usersService.findAll();
    return res.status(200).send(users);
  }

  

  // 요청을 처리하는 도중 에러가 발생하거나 예외를 던져야 한다면 어떻게 해야 할까요?
  // 예를 들어 유저 정보 조회를 요청했는데 id 는 1부터 시작해야하는 규칙을 가지고 있다고 합시다.
  // id 가 1보다 작은 값일 경우 400 Bad Request 예외를 던져야 합니다.

  // 헤더
  // Nest 는 응답 헤더 역시 자동 구성해줍니다.
  // 만약 응답에 커스텀 헤더를 추가하고 싶다면 @Header 데커레이터를 사용하면 됩니다.
  // 인수로 헤더 이름과 값을 받습니다.
  // 물론 라이브러리에서 제공하는 응답 객체를 사용해서 res.header() 메서드로 직접 설정도 가능합니다.

  // 리다이렉션
  // 종종 서버가 요청을 처리한 후, 요청을 보낸 클라이언트를 다른 페이지로 이동하고 싶은 경우가 있습니다.
  // 이를 리다이렉션(redirection) 이라 합니다.
  // 응답 본문에 리디렉션할 URL 을 포함해서 클라이언트가 스스로 페이지를 이동하게 해도 되지만, @Redirect 데커레이터를 사용하면 쉽게 구현이 가능합니다.
  // 데커레이터의 두 번째 인수는 상태 코드입니다.
  // 301 Moved Permanently 는 요청한 리소스가 헤더에 주어진 리소스로 완전히 이동했다는 뜻입니다.
  // 이 상태 코드를 200과 같이 다른 것으로 바꾸어 응답 할 수 있습니다.
  // 하지만 301, 307, 308 과 같이 Redirect 로 정해진 응답코드가 아닐 경우 브라우저가 제대로 반응하지 않을 수 있습니다.

  

  @Redirect('http://nestjs.com', 301)
  @Header('Custom', 'Test Header')
  @Get(':id')
  findOne(@Param('id') id: string) {
    if(+id < 1) {
      throw new BadRequestException('id 는 0보다 큰 값이어야 합니다.');
    }
    return this.usersService.findOne(+id);
  }

  // 요청 처리 결과에 따라 동적으로 리디렉트하고자 한다면 응답으로 다음과 같은 객체를 리턴하면 됩니다.
  // {
  //   url: string,
  //   statusCode: number
  // }

  // 예를 들어 쿼리 매개변수로 버전 숫자를 전달받아 해당 버전의 페이지로 이동한다고 하면 다음처럼 구현할 수 있습니다.
  
  @Get('redirect/docs')
  @Redirect('http://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if(version && version === '5') {
      return {url: 'http://docs.nestjs.com/v5/'};
    }
  }

  // http://localhost:3000/users/redirect/docs -> http://docs.nestjs.com
  // http://localhost:3000/users/redirect/docs?version=5 -> http://docs.nestjs.com/v5/


  // 라우팅 매개 변수
  // 라우트(라우팅) 매개변수는 패스 매개변수라고도 합니다.
  // 이미 앞선 예제에서 사용했습니다.
  // 1번 유저의 정보를 가져오려면 http://localhost:300/users/1 로 요청을 합니다.
  // 여기서 1에 해당하는 부분이 유저 ID 인데 당연히 동적으로 구성됩니다.
  // 즉 경로를 구성하는 매개변수가 됩니다.
  // 전달받은 매개변수는 함수 인수에 @Param 데커레이터로 주입받을 수 있습니다.
  
  // 라우트 매개변수를 전달받는 방법은 2가지가 있습니다.
  // 먼저 매개변수가 여러 개 전달될 경우 객체로 한 번에 받는 방법입니다.
  // 이 방법은 params 의 타입이 any 가 되어 권장하지 않습니다.
  


  



  // 앞서 Nest 는 CRUD 에 대해 성공 응답으로 POST 는 201, 그 외는 200 을 보낸다고 했습니다.
  // 만약 이 상태 코드를 다른 값으로 바꾸길 원한다면 어떻게 해야 할까요?
  // Nest 는 이를 손쉽게 적용할 수 있는 또 다른 데커레이터 @HttpCode 를 마련해뒀습니다.

  @HttpCode(202)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // HTTP 202(Accepted) 에 대한 설명은 MDN 문서를 인용합니다.
  // 요청이 성공적으로 접수되었으나, 아직 해당 요청에 대해 처리 중이거나 처리 시작 전임을 의미합니다.
  // 요청 처리 중 실패할 수도 있기 떄문에 요청은 실행될 수도 실행되지 않을 수도 있습니다.
  // 이 상태 코드는 비확약적, 즉 HTTP 가 나중에 요청 처리 결과를 나타내는 비동기 응답을 보낼 방법이 없다는 것을 의미합니다.


  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
