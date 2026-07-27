// Default folder name if none is set
const DEFAULT_FOLDER = 'Rajseba Invoices';

// Listen for download requests from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'download') {
    // Get custom folder setting from storage
    chrome.storage.local.get(['downloadFolder'], (result) => {
      const folder = (result.downloadFolder || DEFAULT_FOLDER).trim();
      
      // Clean filename
      let filename = (message.filename || 'invoice').replace(/[^a-z0-9_-]/gi, '_');
      if (!filename.toLowerCase().endsWith('.pdf')) {
        filename += '.pdf';
      }

      // Prepend folder to enforce folder download path
      const filePath = folder ? `${folder}/${filename}` : filename;

      chrome.downloads.download({
        url: message.url,
        filename: filePath,
        conflictAction: 'uniquify',
        saveAs: false // Enforce silent download without save-as dialog
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error('Download failed:', chrome.runtime.lastError.message);
          
          // Try downloading to the default downloads folder as a fallback
          chrome.downloads.download({
            url: message.url,
            filename: filename,
            conflictAction: 'uniquify',
            saveAs: false
          });
        }
      });
    });
  }
});
