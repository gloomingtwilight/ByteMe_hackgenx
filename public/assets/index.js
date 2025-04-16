<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    res.render('index');
        document.getElementById('departmentLoginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const departmentId = document.getElementById('departmentId').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            
            window.location.href = 'department-dashboard.html';
        });
    