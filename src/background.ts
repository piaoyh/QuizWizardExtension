// Copyright 2026. PARK Youngho. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// https://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or https://opensource.org/licenses/MIT>, at your option.
// This file may not be copied, modified, or distributed
// except according to those terms.
///////////////////////////////////////////////////////////////////////////////


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