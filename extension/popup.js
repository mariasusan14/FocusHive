document.getElementById("open-notes").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            document.getElementById("yt-notes-panel").style.display = "flex";
          },
        });
      } else {
        alert("Please open a YouTube video to use this feature.");
      }
    });
  });
  
