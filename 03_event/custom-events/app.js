const input = document.querySelector('[name="user-id"]');
const EVENT_NAME = 'FiveCharInputValue';

input.addEventListener('change', () => {
  const { length } = input.value;
  console.log(`input length, `, length);
  if (length === 5) {
    const time = new Date().getTime();
    const event = new CustomEvent(EVENT_NAME, {
      detail: {
        time,
        valid: true,
      },
    });

    input.dispatchEvent(event);
  }
});

input.addEventListener(EVENT_NAME, e => {
  console.log('handling custom event, ', e.detail);
});
