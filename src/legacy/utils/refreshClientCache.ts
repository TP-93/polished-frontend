// @ts-nocheck
export default () => {
  const clientAppVersion = localStorage.getItem('JorCustomVersion');
  const appVersion = process.env.REACT_APP_VERSION;

  if (clientAppVersion && appVersion) {
    if (!(clientAppVersion === appVersion) && window.caches) {
      caches
        .keys()
        .then((keyList) => {
          return Promise.all(
            keyList.map((key) => {
              return caches.delete(key);
            }),
          );
        })
        .then(() => {
          localStorage.setItem('JorCustomVersion', appVersion);
          window.location.reload();
        });
    }
  } else if (appVersion) {
    localStorage.setItem('JorCustomVersion', appVersion);
  }
};
