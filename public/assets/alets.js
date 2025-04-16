// Function to get alerts from the server
async function getAlerts() {
    try {
      const response = await fetch('/api/alerts');
      const alerts = await response.json();
      return alerts;
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  }
  
  // Function to render alerts in the UI
  function renderAlerts(alerts) {
    const alertListElement = document.getElementById('alertList');
    
    if (!alertListElement) return; // Check if element exists
    
    if (!alerts || alerts.length === 0) {
      alertListElement.innerHTML = '<div class="no-alerts">No alerts to display</div>';
      return;
    }
  
    alertListElement.innerHTML = '';
    
    alerts.forEach(alert => {
      // Get severity class or default to info
      const severityClass = alert.severity ? 
        `severity-${alert.severity.toLowerCase()}` : 'severity-info';
      
      // Format timestamp
      const timestamp = new Date(alert.timestamp).toLocaleString();
      
      // Create alert element
      const alertElement = document.createElement('div');
      alertElement.className = `alert-item ${severityClass}`;
      alertElement.innerHTML = `
        <div class="alert-header">
          <div class="alert-title">${alert.title || 'Untitled Alert'}</div>
          <div class="alert-timestamp">${timestamp}</div>
        </div>
        <div class="alert-message">${alert.message || 'No message provided'}</div>
      `;
      
      alertListElement.appendChild(alertElement);
    });
  }
  
  // Load alerts on page load
  window.addEventListener('load', async () => {
    const alerts = await getAlerts();
    renderAlerts(alerts);
  });
  
  // Set up refresh button
  const refreshButton = document.getElementById('refreshButton');
  if (refreshButton) { // Check if button exists
    refreshButton.addEventListener('click', async () => {
      const alerts = await getAlerts();
      renderAlerts(alerts);
    });
  }
  
  // Poll for new alerts every 30 seconds
  setInterval(async () => {
    const alerts = await getAlerts();
    renderAlerts(alerts);
  }, 30000);