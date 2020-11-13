// @ts-ignore
chrome.storage.sync.get(['active'], (items) => {
  if (items.active) {
    const body = document.body;
    const element = document.createElement('div');
    element.id = 'singha-protector-alert';
    element.textContent = '本番環境！！！！！！！！！';

    element.style.color = '#fff';
    element.style.backgroundColor = '#f00';
    element.style.position = 'fixed';
    element.style.width = '100vw';
    element.style.height = '20px';
    element.style.opacity = '.85';
    element.style.zIndex = '2147483647';

    body.insertBefore(element, body.firstChild);
  }
});

