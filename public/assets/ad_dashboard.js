function toggleAlertPanel() {
    const panel = document.getElementById('alertPanel');
    panel.classList.toggle('active');
}

async function fetchAlerts() {
    try {
        // Replace with your actual webhook URL
        const response = await fetch('YOUR_WEBHOOK_URL');
        const alerts = await response.json();
        
        const alertContent = document.getElementById('alertContent');
        alertContent.innerHTML = ''; 

        alerts.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = 'alert-item';
            alertItem.innerHTML = `
                <div class="alert-item-header">
                    <span class="alert-title">${alert.title}</span>
                    <span class="alert-time">${alert.time}</span>
                </div>
                <div class="alert-message">${alert.message}</div>
                <span class="alert-status status-${alert.status}">${alert.status}</span>
            `;
            alertContent.appendChild(alertItem);
        });

        
        const badge = document.querySelector('.alert-badge');
        badge.textContent = alerts.length;
    } catch (error) {
        console.error('Error fetching alerts:', error);
    }
}


document.addEventListener('DOMContentLoaded', fetchAlerts);

// periodic refresh (every 5 minutes)
setInterval(fetchAlerts, 300000);

function editUser(userId) {
const user = <%- JSON.stringify(users) %>.find(u => u._id === userId);
if (user) {
    document.getElementById('editUserId').value = user._id;
    document.getElementById('editUserName').value = user.username;
    document.getElementById('editUserRole').value = user.role;
    document.getElementById('editUserDepartment').value = user.department || '';
    document.getElementById('editUserStatus').value = user.status || 'Active';
    document.getElementById('editUserModal').style.display = 'block';
}
}

function closeModal() {
document.getElementById('editUserModal').style.display = 'none';
}