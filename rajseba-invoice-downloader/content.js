// Inject script to set the extension status flag in page context
try {
  const script = document.createElement('script');
  script.textContent = 'window.__rajseba_extension_active = true;';
  (document.head || document.documentElement).appendChild(script);
  script.remove();
} catch (e) {
  console.error('Failed to inject extension active flag:', e);
}

// Listen for custom download events dispatched by the webpage
window.addEventListener('rajseba-direct-download', async (event) => {
  const { dataUrl, filename } = event.detail;
  if (dataUrl && filename) {
    chrome.runtime.sendMessage({
      action: 'download',
      url: dataUrl,
      filename: filename
    });
  }
});

// Intercept clicks on links or buttons that trigger PDF or invoice downloads
document.addEventListener('click', async (event) => {
  let target = event.target;
  
  // Walk up to find anchor or button
  while (target && target !== document.body) {
    const isInvoiceBtn = 
      (target.tagName === 'A' || target.tagName === 'BUTTON') && 
      (
        target.textContent?.toLowerCase().includes('download pdf') || 
        target.textContent?.toLowerCase().includes('download invoice') ||
        target.title?.toLowerCase().includes('download invoice') ||
        target.getAttribute('aria-label')?.toLowerCase().includes('download invoice')
      );
      
    const isPdfLink = target.tagName === 'A' && (
      target.href?.toLowerCase().endsWith('.pdf') || 
      target.href?.toLowerCase().startsWith('blob:')
    );

    if (isInvoiceBtn || isPdfLink) {
      // If it's a PDF link or a download button with a href
      const href = target.href || target.getAttribute('href');
      if (href) {
        event.preventDefault();
        event.stopPropagation();
        
        let urlToDownload = href;
        
        // If it's a blob URL, convert it to a Base64 data URL because background page can't access page-origin blobs
        if (href.startsWith('blob:')) {
          try {
            const response = await fetch(href);
            const blob = await response.blob();
            urlToDownload = await blobToDataURL(blob);
          } catch (e) {
            console.error('Failed to convert blob to data URL:', e);
          }
        }
        
        const filename = getFilenameFromElement(target) || 'invoice';
        
        chrome.runtime.sendMessage({
          action: 'download',
          url: urlToDownload,
          filename: filename
        });
        return;
      }
    }
    target = target.parentNode;
  }
}, true);

// Utility to convert blob to base64 data URL
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Utility to extract a clean filename from clicked element context
function getFilenameFromElement(element) {
  if (element.dataset.filename) {
    return element.dataset.filename;
  }
  
  // Try extracting from title or text
  const text = element.textContent || element.title || '';
  const match = text.match(/(INV-RS-\d+-\d+|TXN-RS-\d+-\d+|STMT-[A-Z]+-\d+-\d+)/i);
  if (match) {
    return match[0];
  }
  
  // Try extracting from booking/invoice table row text
  const row = element.closest('tr');
  if (row) {
    const rowText = row.textContent || '';
    const rowMatch = rowText.match(/(INV-RS-\d+-\d+|TXN-RS-\d+-\d+|STMT-[A-Z]+-\d+-\d+)/i);
    if (rowMatch) {
      return rowMatch[0];
    }
  }
  
  return null;
}
