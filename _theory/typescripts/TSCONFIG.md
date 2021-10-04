```json
{
    // https://github.com/Microsoft/TypeScript/tree/master/tests/cases/compiler
    // https://github.com/Microsoft/TypeScript/tree/master/tests/baselines/reference
    // 공식문서 외에도 위 테스트 코드를 참고시 도움이 됩니다.
    
    "compilerOptions": {
        "allowJs": false, // 자바스크립트 파일 컴파일 허용 여부. 
        // import add from './add.js' 와 같이 js파일 import 허용

        "allowSyntheticDefaultImports": false, // export default 를 export 한 값들을 가지는 객체로 설정
        // export class Foo { member: string; } 을 할시 (b.ts)
        // export default { Foo } 가 기본으로 설정된다.

        "allowUnreachableCode": false, // 도달 불가능한 코드에 대한 허용 여부.
        /* 
        function foo() {
            if (true) {
                return 42;
            }
            else {
                return "42"; // 도달 불가능
            }
        };
        */

        "allowUnusedLabels": false, // 사용하지 않는 라벨에 대한 허용 여부
        /*
        target1:
        target2: // 사용하지 않는 라벨
        while (true) {
            break target1;
        }
        */

        "alwaysStrict": false, // 항상 strict mode로 분석할지 여부
        // 모든 코드를 strict mode로 분석함
        // "use strict"; 를 컴파일된 js파일에 추가
        // @TODO noImplicitUseStrict 와 비교 필요

        "baseUrl": ".", // Non-relativ 모듈 혹은 paths 옵션의 기준 디렉토리

        "charset": "utf8", // 입력파일의 문자집합 형식

        "checkJs": false, // allowJs 옵션이 true여서 js파일 모듈을 사용시 js파일의 오류 검사 여부

        "declaration": false, // .d.ts 파일의 생성 여부

        "declarationDir": "", // .d.ts 파일이 생성되는 디렉토리 설정

        "diagnostics": false, // @TODO 테스트 필요
        // Show diagnostic information.

        "disableSizeLimit": false, // @TODO 테스트 필요
        // Disable size limitation on JavaScript project.

        "downlevelIteration": false, // target이 ES3 및 ES5 일때도 for..of, spread, destructuring 문법 지원
        // TypeScript 2.3 이전에는 target이 ES6/ES2015 이후 버전일때만 지원함

        "emitBOM": false,// 출력 파일의 시작 부분에 UTF-8 바이트 순서표 (BOM) 추가여부
        // 윈도우 스토어 인증을 통과하기 위해 필요
        // https://stackoverflow.com/questions/33722915/typescript-generated-js-files-encoding

        "emitDecoratorMetadata": false, // @TODO 테스트 필요
        // Emit design-type metadata for decorated declarations in source. See issue #2577 for details.

        "experimentalDecorators": false, // ES Decorator에 대한 실험적 기능 사용 여부
        // vue에서는 vue와 Typescript를 같이 쓸때는 활성화를 권장하고 있다.

        "forceConsistentCasingInFileNames": false, // 파일명에 대소문자 구분하지 않아도 되는 기능 사용 여부
        // 직역: 파일 이름에 일관된 casing 강제 적용

        "importHelpers": false, // tslib에서 helpers (e.g. __extends, __rest, etc..)를 가져온다.
        // 중복코드를 없애기 위한 최적화용 옵션
        // https://github.com/Microsoft/tslib

        "inlineSourceMap": false, // 소스맵을 결과코드에 추가
        // @TODO 테스트 필요

        "inlineSources": false, // 변환전 파일 .ts 코드를 결과코드에 추가
        // @TODO 테스트 필요

        "isolatedModules": false, // @TODO 뭘까...
        // https://github.com/Microsoft/TypeScript/issues/2499
        
        "jsx": false, // jsx 지원

        "jsxFactory": "React.createElement", // jsx 팩토리 함수 설정,

        "lib": [], // 컴파일에 포함될 라이브러리 파일 목록
        // target 옵션 값에 따라 기본으로 포함되는 라이브러리가 있다.
        // lib 옵션 설정시 그 라이브러리 파일만 포함된다.
        // target ES5 -> DOM,ES5,ScriptHost
        // target ES6 -> DOM,ES6,DOM.Iterable,ScriptHost
        /*
        ES5 
        ES6 
        ES2015 
        ES7 
        ES2016 
        ES2017 
        ESNext 
        DOM 
        DOM.Iterable 
        WebWorker 
        ScriptHost 
        ES2015.Core 
        ES2015.Collection 
        ES2015.Generator 
        ES2015.Iterable 
        ES2015.Promise 
        ES2015.Proxy 
        ES2015.Reflect 
        ES2015.Symbol 
        ES2015.Symbol.WellKnown 
        ES2016.Array.Include 
        ES2017.object 
        ES2017.SharedMemory 
        ES2017.TypedArrays 
        esnext.asynciterable 
        */

        "listEmittedFiles": false, // 컴파일된 결과 파일들 이름을 터미널에 출력

        "listFiles": false, // 컴파일된 파일들 이름을 터미널에 출력

        "locale": "ko", // 에러메세지 출력 언어 설정

        "mapRoot": "", // "source map 파일을 저장할 root 디렉토리 지정
        // 지정하지 않으면 변환된 파일과 동일한 디렉토리에 저장된다.

        "maxNodeModuleJsDepth": 0, // js 모듈을 검색할 최대 깊이
        // allowJs 옵션이 활성화 되있을때만 적용
        // https://github.com/Microsoft/TypeScript/tree/master/tests/cases/projects/NodeModulesSearch/maxDepthIncreased

        "module": "es3", // 모듈 설정
        // "AMD", "System" 사용시 outFile 옵션을 설정하면 여러개의 모듈이 포함된 단일파일로 출력
        // "ES6", "ES2015"는 target값이 "ES5" 이하일때 사용 가능

        "moduleResolution": "node", // 모듈 (검색)해석 방식 설정

        "newLine": "lf", // end of line sequence 설정
        // 기본적으로 플랫폼에 따라 "crlf" (windows) or "lf" (unix) 가 설정됨

        "noEmit": false, // 결과파일을 저장하지 않음
        // @TODO 테스트 필요

        "noEmitHelpers": false, // helpers (e.g. __extends, __rest, etc..)를 결과파일에 포함시키지 않음
        // https://github.com/ngParty/ts-helpers
        // 이 옵션 대신 importHelpers 옵션을 사용시 더 깔끔하게 최적화 가능

        "noEmitOnError": false, // 에러 발생시 결과파일을 저장하지 않음

        "noFallthroughCasesInSwitch": false, // 잘못 적혔다고 판단되는 switch문에 대한 에러 발생
        // 예를 들어 case문에 break가 없으면 오류 발생
        
        "noImplicitAny": false, // any타입 금지

        "noImplicitReturns": false, // 함수의 모든 경로가 값을 반환하지 않으면 에러 발생

        "noImplicitThis": false, // this 타입을 명시적으로 지정하지 않으면 에러 발생

        "noImplicitUseStrict": false, // @TODO 테스트 필요

        "noLib": false, // 기본 라이브러리(lib.d.ts)를 가져오지 않는다.
        // @TODO 옵션 사용처

        "noResolve": false, // @TODO 테스트 필요

        "noStrictGenericChecks": false, // 함수에서 generic의 엄격한 검사 해제 여부
        /*
        type A = <T, U>(x: T, y: U) => [T, U];
        type B = <S>(x: S, y: S) => [S, S];

        function f(a: A, b: B) {
            a = b;  // 엄격한 검사시 Error
            b = a;  // Ok
        }
        */

        "noUnusedLocals": false, // 사용안된 지역변수에 대한 오류 보고 여부

        "noUnusedParameters": false,  // 사용안된 파라미터에 대한 오류 보고 여부

        "outDir": "", // 출력할 디덱토리
        // @TODO 테스트 필요

        "outFile": "", // 단일파일로 출력시 파일명
        // @TODO 테스트 필요

        "paths": { }, // baseUrl 옵션을 기준디렉토리로 불러올 모듈의 위치 설정이 가능
        // https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping

        "plugins": [ ], // 편집환경을 더 좋게 변경하기 위한 플러그인 기능
        // 새로운 구문이나 다른 형식 검사 동작등 새로운 언어 기능을 추가할수는 없음
        // https://github.com/Microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin

        "preserveConstEnums": false, // const enum형 선언을 지우지 않을건지 여부
        // 본래 컴파일 하는동안 완전히 제거되어 성능과 메모리상 이점을 얻기위해
        // const enum형 선언은 지우고 코드상에 직접 맵핑되는데 이 옵션을 활성화시
        // const enum형 선언을 지우지 않는다
        /*
        // js파일
        const enum E {
            Value = 1, Value2 = Value
        }
        console.log(E.value)
        console.log(E.value2)

        // 비활성화시 결과파일
        console.log(1 /* Value * /);
        console.log(1 /* Value2 * /);


        // 활성화시 결과파일
        var E;
        (function (E) {
            E[E["Value"] = 1] = "Value";
            E[E["Value2"] = 1] = "Value2";
        })(E || (E = {}));

        console.log(E.value)
        console.log(E.value2)
        */

        "preserveSymlinks": false, // Symlink파일에서 다른 모듈을 import시 기준경로를 Symlink 경로로 설정
        // 기존에는 Symlink파일에서 다른 모듈을 import시
        // Symlink파일의 실제 경로에서 모듈을 가져왔다.
        // https://nodejs.org/api/cli.html#cli_preserve_symlinks

        "pretty": false, // 에러 메시지를 예쁘게 설정
        // @TODO 테스트 필요

        "reactNamespace": "", // React 네임스페이스 설정. 권장되지 않는 옵션.
        // jsxFactory 옵션을 사용하십시오

        "removeComments": false, // 주석 삭제
        // @TODO '/*!' 주석 테스트 필요

        "rootDir": "", // 입력파일의 rootDir 설정
        // outDir옵션을 사용할때만 사용

        "rootDirs": [ ], // 가상 디덱토리를 설정
        // https://www.typescriptlang.org/docs/handbook/module-resolution.html#virtual-directories-with-rootdirs

        "skipDefaultLibCheck": false, // 사용을 권장하지 않음 skipLibCheck 옵션을 사용

        "skipLibCheck": false, // 모든 선언파일(*.d.ts)의 유형검사를 건너뛸지 여부

        "sourceMap": false, // 소스맵(*.map) 파일 생성 여부

        "sourceRoot": "", // 디버거가 알아야될 .ts파일 root 위치. 소스맵(*.map)에 적용된다.
        // @TODO 테스트 필요

        "strict": false, // 모든 엄격한 타입 검사 옵션을 활성화
        // noImplicitAny, noImplicitThis, alwaysStrict, strictNullChecks, strictFunctionTypes

        "strictFunctionTypes": false, //@TODO 테스트 필요

        "strictNullChecks": false, // null과 undefined 타입 구분 여부
        // https://basarat.gitbooks.io/typescript/docs/options/strictNullChecks.html

        "stripInternal": false, // /** @ internal * /JSDoc annotation이 있는 코드에 대한 선언을 내 보내지 않을지 여부
        // @TODO 부가설명 필요

        "suppressExcessPropertyErrors": false, // 객체 리터럴에 대한 초과 속성 검사 억제 여부
        // @TODO 부가설명 필요

        "suppressImplicitAnyIndexErrors": false, // 인덱스 서명이없는 개체를 인덱싱하는 경우 --noImplicitAny 오류 억제여부
        // 자세한 내용은 문제 #1232를 참조
        // @TODO 부가설명 필요

        "target": "es3", // 코드에서 사용할 ECMAScript 버전 설정

        "traceResolution": false, // 모듈 검색에 대한 로그메세지 출력 여부

        "typeRoots": [ ], // 타입(*.d.ts)파일을 가져올 디렉토리 설정
        // 설정 안할시 기본적으로 ./node_modules/@types

        "types": [ ], // 타입을 가져올 패키지목록 (따른 패키지는 (*.d.ts)파일을 가져오지 않음)
        // ["node", "lodash", "express"] 설정시
        // ./node_modules/@types/node, ./node_modules/@types/lodash, ./node_modules/@types/express
        // 위 3개를 가져오고 node_modules/@types/* 의 다른 패키지는 가져오지 않음

        "watch": false // 파일 변경시 컴파일
    }
}
```