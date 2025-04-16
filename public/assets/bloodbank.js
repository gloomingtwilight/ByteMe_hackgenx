document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const transferButtons = document.querySelectorAll('.transfer-btn');
    const transferModal = new bootstrap.Modal(document.getElementById('transferModal'));

    transferButtons.forEach(button => {
        button.addEventListener('click', function() {
            const storageType = this.dataset.storage;
            const storageSelect = document.querySelector('#transferForm select:nth-child(2)');
            
            if (storageSelect) { // Check if select exists
                Array.from(storageSelect.options).forEach(option => {
                    option.disabled = option.value === storageType;
                });
            }
            
            transferModal.show();
        });
    });

    const confirmTransfer = document.getElementById('confirmTransfer');
    if (confirmTransfer) { // Check if button exists
        confirmTransfer.addEventListener('click', function() {
            const form = document.getElementById('transferForm');
            
            if (form) { // Check if form exists
                const formData = new FormData(form);
                
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                alert('Transfer successful!');
                transferModal.hide();
                form.reset();
            }
        });
    }

    function checkExpiringUnits() {
        const bloodUnits = document.querySelectorAll('.blood-unit');
        
        bloodUnits.forEach(unit => {
            const expiryWarning = unit.querySelector('.expiry-warning');
            if (!expiryWarning) return; // Skip if no warning element
            
            const expiresIn = parseInt(expiryWarning.dataset.expiresIn);
            if (isNaN(expiresIn)) return; // Skip if invalid number
            
            if (expiresIn <= 2) {
                expiryWarning.style.color = 'var(--danger-color)';
                unit.style.borderColor = 'var(--danger-color)';
            } else if (expiresIn <= 4) {
                expiryWarning.style.color = 'var(--warning-color)';
                unit.style.borderColor = 'var(--warning-color)';
            }
        });
    }

    setInterval(function() {
        const warnings = document.querySelectorAll('.expiry-warning');
        
        warnings.forEach(warning => {
            let expiresIn = parseInt(warning.dataset.expiresIn);
            if (isNaN(expiresIn)) return; // Skip if invalid number
            
            if (expiresIn > 0) {
                expiresIn--;
                warning.dataset.expiresIn = expiresIn;
                
                const unit = warning.closest('.blood-unit')?.querySelector('.storage-info')?.textContent.includes('hours') ? 'hours' : 'days';
                warning.textContent = `Expires in ${expiresIn} ${unit}`;
                
                checkExpiringUnits();
            }
        });
    }, 60000); 

    checkExpiringUnits();

    function updateQuantity(bloodGroup, storageType, change) {
        const storageCard = document.querySelector(`.${storageType}-storage`);
        if (!storageCard) return; // Check if storage card exists
        
        const bloodUnit = storageCard.querySelector(`[data-group="${bloodGroup}"]`);
        if (!bloodUnit) return; // Check if blood unit exists
        
        const quantityElement = bloodUnit.querySelector('.quantity');
        if (!quantityElement) return; // Check if quantity element exists
        
        let currentQuantity = parseInt(quantityElement.textContent);
        if (isNaN(currentQuantity)) currentQuantity = 0;
        
        currentQuantity += change;
        quantityElement.textContent = currentQuantity;
        
        quantityElement.style.color = change > 0 ? 'var(--success-color)' : 'var(--danger-color)';
        setTimeout(() => {
            quantityElement.style.color = '#333';
        }, 1000);
    }

    window.updateBloodStorage = function(bloodGroup, fromStorage, toStorage, quantity) {
        updateQuantity(bloodGroup, fromStorage, -quantity);
        updateQuantity(bloodGroup, toStorage, quantity);
    };
});