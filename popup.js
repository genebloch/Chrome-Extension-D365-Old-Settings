document.addEventListener('DOMContentLoaded', () => {
  const message = document.getElementById('message');
  const redirectBtn = document.getElementById('redirectBtn');
  
  const manifest = chrome.runtime.getManifest();
  document.getElementById('version').textContent = `Version ${manifest.version}`;

  redirectBtn.disabled = true;

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    let tab = tabs[0];
    let url = new URL(tab.url);

    if (url.hostname.endsWith('.crm.dynamics.com')) {
      message.textContent = 'Tool is ready.';
      message.style.color = '#28a745';
      redirectBtn.disabled = false;
    } else {
      message.textContent = 'Use tool on CRM page.';
      message.style.color = '#dc3545';
      redirectBtn.disabled = true;
    }

    redirectBtn.addEventListener('click', () => {
      if (!redirectBtn.disabled) {
        let newUrl = `${url.origin}/main.aspx?settingsonly=true`;
        chrome.tabs.create({ url: newUrl });
      }
    });
  });
});
