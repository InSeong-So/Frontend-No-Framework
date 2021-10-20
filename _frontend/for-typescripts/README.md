# 타입스크립트를 적용하여 확장하기
> TOTO

## 상태 관리

깊은 복사를 위한 많은 방법
1. JSON.parse(JSON.stringify(obj))
2. 직접 구현하기
    ```js
    function deepCopy(obj) {
      obj = obj ?? '';
      if (typeof obj !== "object") return obj

      const result = Array.isArray(obj) ? [] : {}

      for (let key of Object.keys(obj)) {
        result[key] = deepCopy(obj[key])
      }

      return result
    }
    ```