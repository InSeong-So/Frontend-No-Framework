> 가상 DOM을 구현하고 조정(reconciliation)해봅시다.

## 가상 DOM이란?
React에 의해 유명해졌죠? 선언적 렌더링 엔진의 성능을 개선시키는 방법 중 하나입니다.

UI 표현이 메모리에 유지되고 실제 DOM에 동기화되므로, 실제 DOM은 최소한의 작업을 수행하게 됩니다. 이 과정이 바로 조정(reconciliation)입니다.

리스트(`<ul><li></li><ul>`)에 항목을 추가(`<li>`)하는 경우, 기존 실제 DOM은 해당 리스트 전체를 교체합니다. 즉, 원본을 **대체**하죠. 그러나 가상 DOM은 추가된 마지막 항목(`<li>`)만이 실제 DOM에 필요한 것을 동적(Dynamic)으로 이해합니다. 그 후 실제 DOM을 가상 DOM로 바꾸는 가장 최적화된 방법을 찾아내는 것이죠.

가상 DOM의 핵심은 유명한 `diff Algorithm`입니다. 저희는 이번에 이 diff 알고리즘을 구현해봅니다. 구현할 diff 알고리즘의 핵심은 **노드를 다른 노드와 비교하고, 변경되었는지 확인**하는 것입니다.
1. 속성(attributes)의 수가 다른가요?
2. 하나 이상의 속성이 수정되었나요?
3. 노드에 자식(children)이 없고 textContent가 다른가요?

구현을 위해 하나하나 진행해볼까요?
1. nodeCompare 함수를 작성합니다.
    ```js
    const nodeCompare = (target, real, virtual) => {};
    ```
    - 현재 DOM 노드인 target, 실제 DOM 노드인 real, 가상 DOM 노드인 virtual을 매개변수로 받습니다.
    - 이제 함수 몸체(내부)를 작성합니다.

2. 우선 새 노드가 정의되지 않았다면 실제 노드를 삭제합니다.
    ```js
    if(real && !virtual) real.remove();
    ```

3. 실제 노드가 정의되진 않았지만 가상 노드가 존재하는 경우 부모 노드(target)에 추가합니다.
    ```js
    if(!real && virtual) target.appendChild(virtual);
    ```

4. 두 노드가 모두 정의되면 노드를 비교합니다.
    ```js
    if(isChangedNode(virtual, real)) real.replaceWith(virtual)
    ```
5. isChangedNode 함수는 아래 항목을 비교합니다(위에서 언급한 것들입니다).
   1. 노드의 **속성 수**
       ```js
       // 1. 속성의 수
       if(real.attributes.length !== virtual.length) return true;
       ```
   2. 노드의 **속성 종류**
       ```js
       // 2. 속성의 종류
       const isDifferent = real.attributes.forEach(({name}) => real.getAttribute(name) !== virtual.getAttribute(name));
       ```
   3. **자식의 유무**
       ```js
       if(real.children.length === 0 && virtual.children.length === 0) return true;
       ```
   4. **내용**
       ```js
       if(real.textContent !== virtual.textContent) return true;
       ```

자, 이게 뼈대입니다. 각자가 작성할 애플리케이션에 맞는 diff 알고리즘을 작성하여 개선시킬 수 있지만, 문제에 직면하고 수정하는 것을 권장합니다.

직접 성능을 확인하고 최적화를 진행해보세요!

<br>