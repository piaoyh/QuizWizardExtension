chrome.action.onClicked.addListener(async () => {
  const url = chrome.runtime.getURL('index.html');
  const tabs = await chrome.tabs.query({ url: url });
  
  if (tabs.length > 0) {
    const firstTab = tabs[0];
    if (firstTab && firstTab.id !== undefined) {
      chrome.tabs.update(firstTab.id, { active: true });
    }
  } else {
    chrome.tabs.create({ url: url });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Quiz Wizard extension installed.');
});

export {};