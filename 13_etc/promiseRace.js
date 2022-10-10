function limited(timeout = 3000, timeoutResponse = 'Timeout') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (timeoutResponse instanceof Error) {
        reject(timeoutResponse);
      } else {
        resolve(timeoutResponse);
      }
    }, timeout);
  });
}

export function race(p, timeout = 3000, timeoutResponse = 'Timeout') {
  return Promise.race([Promise.resolve(p), limited(timeout, timeoutResponse)]);
}
