document.addEventListener('DOMContentLoaded', () => {
  const folderInput = document.getElementById('folderName');

  // Load saved setting
  chrome.storage.local.get(['downloadFolder'], (result) => {
    if (result.downloadFolder) {
      folderInput.value = result.downloadFolder;
    }
  });

  // Save setting on input change
  folderInput.addEventListener('input', () => {
    const value = folderInput.value.trim();
    chrome.storage.local.set({ downloadFolder: value });
  });
});
