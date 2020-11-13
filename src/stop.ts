const handler = (e: Event) => {
  e.preventDefault();
  alert("Singha Protector: 拡張機能によって機能を停止しています。");
};

const isNavigationButton = (button: HTMLButtonElement) => {
  const text = button.innerText;
  return /^(\d+|最後 >>|次 >|< 前|<< 最初)$/.test(text);
};

const stopButtonClick = () => {
  console.log('stop button');
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    if (!isNavigationButton(button)) {
      const clone = button.cloneNode(true);
      clone.addEventListener('click', handler);
      button.parentNode.replaceChild(clone, button);
    }
  });
};

const stopEditLinkClick = () => {
  console.log('stop edit link');
  const spans = document.querySelectorAll('span');
  const editLinks = Array.from(spans).filter((editLinks) => (
    editLinks.innerText === '編集'
  ));
  editLinks.forEach((editLink) => {
    const clone = editLink.cloneNode(true);
    clone.addEventListener('click', handler);
    editLink.parentNode.replaceChild(clone, editLink);
  });
};
// @ts-ignore
chrome.storage.sync.get(['active'], (items) => {
  if (items.active) {
    setTimeout(() => {
      stopButtonClick();
      stopEditLinkClick();
    }, 1000);
  }
});
