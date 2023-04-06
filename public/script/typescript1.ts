// 기본 타입

// 소개

// 프로그램이 유용하려면 숫자, 문자열, 구조체, 불린 값과 같은 간단한 데이터 단위가 필요합니다.
// typescript 는 javascript 와 거의 동일한 데이터 타입을 지원하며, 열거 타입을 사용하여 더 편리하게 사용할 수 있습니다.

// boolean

let boolean1: boolean = true;
console.log(boolean1);

// number

let number1: number = 6;
let number2: number = 0xf00d;

console.log(number1,number2);

// string

let string1: string = 'study';
console.log(string1);

// array

// 배열 타입은 두 가지 방법으로 쓸 수 있습니다.
// 첫 번쨰 방법은 배열 요소들을 나타내는 타입 뒤에 [] 를 쓰는 것입니다.
let array1: number[] = [1,2,3];

// 두 번째 방법은 제네릭 배열 타입을 쓰는 것입니다.
let array2: Array<number> = [4,5,6];

console.log(array1, array2);

// 튜플(Tuple)

// 튜플 타입을 사용하면, 요소의 타입과 개수가 고정된 배열을 표현할 수 있습니다.
// 단 요소들의 타입이 모두 같을 필요는 없습니다.
// 예를 들어, number, string 이 쌍으로 있는 값을 나타내고 싶을 수 있습니다.

let tuple1: [string, number]; // 튜플 타입으로 선언
tuple1 = ['hello', 10]; // 초기화
console.log(tuple1);
// tuple1 = [10, 'hello']; // 오류, 잘못된 초기화

// 정해진 인덱스에 위치한 요소에 접근하면 해당 타입이 나타납니다.
console.log(tuple1[0].substring(1));
// console.log(tuple1[1].substring(1)); // 오류, number 에는 substring 메서드가 없습니다.

// 정해진 인덱스 외에 다른 인덱스에 있는 요소에 접근하면 오류가 발생하며 실패합니다.
// tuple1[3] = 'test';


// 열거 (Enum)

// javascript 의 표준 자료형 집합과 사용하면 도움이 될만한 데이터 형은 enum 입니다.
// enum 은 값의 집합에 더 나은 이름을 붙여줄 수 있습니다.

enum Color1 {Red, Green, Blue};
console.log(Color1);

let c1: Color1 = Color1.Green;
console.log(c1);

// 기본적으로 enum 은 0부터 시작하여 멤버들의 번호를 매깁니다.
// 멤버 중 하나의 값을 수동으로 설정하여 번호를 바꿀 수 있습니다.
// 예를 들어 위 예제를 0대신 1부터 시작해 번호를 매기도록 바꿀 수 있습니다.

enum Color2 {Red=1, Green, Blue};
console.log(Color2);

// 또는 모든 값을 수동으로 설정할 수 있습니다.

enum Color3 {Red=1, Green=4, Blue=6};
console.log(Color3);

// enum 의 유용한 기능 중 하나는 매겨진 값을 사용해 enum 멤버의 이름을 알아낼 수 있다는 것입니다.
// 예를 들어, 위의 예제에서 4라는 값이 위의 어떤 Color enum 멤버의 매칭되는지 알 수 없을 때, 이에 일치하는 이름을 알아낼 수 있습니다.

let colorName: string = Color3[4];
console.log(colorName);


// Any

// 애플리케이션을 만들 때, 알지 못하는 타입을 표현해야 할 수도 있습니다.
// 이 값들은 사용자로부터 받은 데이터나 서드 파티 라이브러리 같은 동적 인 컨텐츠에서 올 수도 있습니다.
// 이 경우 타입 검사를 하지 않고, 그 값들이 컴파일 시간에 검사를 통과하길 원합니다.
// 이를 위해, any 타입을 사용할 수 있습니다.

let any1: any = 1234;
any1 = 'test';
console.log(any1);

// any 타입은 기존에 javascript 로 작업할 수 있는 강력한 방법으로, 컴파일 중에 점진적으로 타입 검사를 하거나 하지 않을 수 있습니다.
console.log(Object.getPrototypeOf(any1));
console.log(any1.charAt(0));

// any 타입은 타입의 일부만 알고 전체는 알지 못할 때 유용합니다.
// 예를 들어, 여러 다른 타입이 섞인 배열을 다룰 수 있습니다.
let any2: any[] = [1,true,'test']; // 배열 자체를 다른 형으로 변환하지 못함
// any2 = 'test'; // 오류
let any3: any = [1,true,'test']; // 배열 자체를 다른 형으로 변환할수있음, array -> string 등등

console.log(any2);
console.log(any3);


// Void

// void 는 어떤 타입도 존재할 수 없음을 나타내기 때문에, any 의 반대 타입 같습니다.
// void 는 보통 함수에서 반환 값이 없을 때 반환 타입을 표현하기 위해 쓰이는 것을 볼 수 있습니다.

function func1(): void {
    console.log('func1');
    // return '1234'; // 오류
}

// void 를 타입 변수를 선언하는 것은 유용하지 않은데, 왜냐하면 그 변수에는 null 또는 undefined 만 할당할 수 있기 때문입니다.
// tsconfig.json -> strictNullChecks 을 사용하지 않을때만
let void1: void = undefined;
// void1 = null;
console.log(void1);


// null and undefined

// typescript 는 undefined 와 null 둘 다 각각 자신의 타입 이름으로 undefined, null 을 사용합니다.
// void 처럼 그 자체로 유용한 경우는 거의 없습니다.
let undefined1: undefined = undefined;
let null1: null = null;
// undefined1 = 1;

console.log(undefined1, null1);

// 기본적으로 null 과 undefined 는 다른 모든 타입의 하위 타입입니다.
// 이건 null 과 undefined 를 number 같은 타입에 할당할 수 있다는 것을 의미합니다.
// 하지만 --strictNullChecks 를 사용하면, null 과 undefined 는 오직 any 와 각각 자신들 타입에만 할당 가능합니다.
// 이건 많은 일반적인 에러를 방지하는 데 도움을 줍니다.

let union1: string | null | undefined;
union1 = 'test';
union1 = null;
union1 = undefined;
// union1 = 1; // error
console.log(union1);

// 유니언 타입은 상급 주제로, 이후 챕터에서 다룹니다.



// Never

// never 타입은 절대 발생할 수 없는 타입을 나타냅니다.
// 예를 들어 never 는 함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환 타입으로 쓰입니다.
// 변수 또한 타입 가드에 의해 아무 타입도 얻지 못하게 좁혀지면 never 타입을 얻게 될 수 있습니다.
// never 타입은 모든 타입에 할당 가능한 하위 타입입니다.
// 하지만 어떤 타입도 never 에 할당할 수 있거나, 하위 타입이 아닙니다.
// 심지어 any 도 never 에 할당할 수 없습니다.


// never 를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message: string) : never {
    throw new Error(message);
}

// 반환 타입이 never 로 추론된다.
function fail() {
    return error('someting failed');
}

// never 를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop(): never {
    while(true) {

    }
}


// 객체 (Object)

// object 타입을 쓰면, Object.create 같은 API 가 더 잘 나타납니다.
declare function create(o: object | null): void;
// create({a:1});
// create(null);
// create(1); // error


// 타입 단언(Type assertions)

// 가끔 typescript 보다 개발자가 값에 대해 더 잘 알고 있을 때가 있습니다.
// 대개 이런 경우는 어떤 엔티티의 실제 타입이 현재 타입보다 더 구체적일 때 발생합니다.
// 타입 단언은 컴파일러에게 '날 믿어, 난 내가 뭘 하고 있는지 알아' 라고 말해주는 방법입니다.
// 타입 단언은 다른 언어의 타입 변화(형 변화) 와 유사하지만, 다른 특별한 검사를 하거나 데이터를 재구성하지 않습니다.
// 이는 런타임에 영향을 미치지 않으며, 온전히 컴파일러만 이를 사용합니다.
// 타입 스크립트는 개발자가 필요한 어떤 특정 검사를 수행했다고 인지합니다.

// 타입 단언은 두 가지 형태가 있습니다.
// 하나는 angle-bracket 문법입니다.

let someValue1: any = 'this is a string';
let strLength1: number = (<string>someValue1).length;

console.log(strLength1);

// 두번째는 as 문법 입니다.
let someValue2: any = 'this is a string';
let strLength2: number = (someValue2 as string).length;

console.log(strLength2);

// 위 두 예제는 동일합니다. 어떤 것을 사용할지는 주로 선호에 따른 선택입니다.
// 하지만 typescript 를 jsx 와 함께 사용할 때는 as 스타일의 단언만 허용됩니다.


// document.addEventListener('DOMContentLoaded', function() {
    
// });