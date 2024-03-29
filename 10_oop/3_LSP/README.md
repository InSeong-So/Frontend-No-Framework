# LSP - 리스코프 치환 원칙
> Liskov Substitution Principle

LSP(Liskov Substitution Principle)는 객체 지향 프로그래밍의 기본 원리이자 SOLID 설계 원리의 하위 집합입니다.
슈퍼 클래스의 객체는 프로그램의 정확성에 영향을 미치지 않고 서브 클래스의 객체로 대체할 수 있어야 한다고 명시합니다.
즉, 프로그램이 특정 유형의 객체를 사용하는 경우 의도하지 않은 동작을 유발하거나 프로그램을 중단시키지 않고 하위 유형의 객체로 이러한 객체를 대체할 수 있어야 합니다.

LSP를 준수하면 하위 클래스가 슈퍼 클래스의 동작을 적절하게 확장하고 기존 코드와 호환되도록 보장하는 데 도움이 됩니다. 또한 새로운 하위 클래스를 더 쉽게 추가하고 기존 하위 클래스를 수정하며 시스템의 기능을 확장함으로써 보다 유연하고 유지보수 가능한 코드베이스를 촉진합니다. LSP를 따름으로써 개발자들은 시간이 지남에 따라 유지보수 및 수정이 쉽고 변화하는 요구사항에 적응할 수 있는 유연한 객체 지향 설계를 만들 수 있습니다.