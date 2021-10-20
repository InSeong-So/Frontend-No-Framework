# 유틸/공통 함수

## 깊은 복사를 위한 많은 방법
- `JSON.parse(JSON.stringify(obj));`
- 직접 구현하기
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