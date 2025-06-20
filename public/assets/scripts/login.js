document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    
    // Función para obtener parámetros de la URL
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    // Función para mostrar el formulario de login
    function showLoginForm() {
        registerForm.classList.remove('active');
        registerForm.classList.remove('slide-in-right');
        registerForm.classList.remove('slide-in-left');
        
        setTimeout(() => {
            loginForm.classList.add('active');
            loginForm.classList.add('slide-in-left');
        }, 10);
    }
    
    // Función para mostrar el formulario de registro
    function showRegisterForm() {
        loginForm.classList.remove('active');
        loginForm.classList.remove('slide-in-right');
        loginForm.classList.remove('slide-in-left');
        
        setTimeout(() => {
            registerForm.classList.add('active');
            registerForm.classList.add('slide-in-right');
        }, 10);
    }
    
    // Verificar si se debe mostrar el registro directamente
    const formType = getUrlParameter('form');
    if (formType === 'register') {
        // Mostrar registro directamente
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    } else {
        // Por defecto mostrar login
        loginForm.classList.add('active');
    }
    
    // Event listeners para cambiar entre formularios
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm();
        // Actualizar URL sin recargar la página
        window.history.pushState({}, '', '?form=register');
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm();
        // Actualizar URL sin recargar la página
        window.history.pushState({}, '', window.location.pathname);
    });
    
    // Manejar el botón de retroceso del navegador
    window.addEventListener('popstate', function(e) {
        const formType = getUrlParameter('form');
        if (formType === 'register') {
            showRegisterForm();
        } else {
            showLoginForm();
        }
    });
    
    // Validación del formulario de registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            // Crear mensaje de error más elegante
            showError('Las contraseñas no coinciden', confirmPassword.parentElement);
            return;
        }
        
        if (password.length < 8) {
            showError('La contraseña debe tener al menos 8 caracteres', password.parentElement);
            return;
        }
        
        // Aquí iría la lógica para enviar el formulario de registro
        showSuccess('Registro exitoso. Serás redirigido al login.');
        
        // Cambiar a login después de registro exitoso
        setTimeout(() => {
            showLoginForm();
            registerForm.reset();
        }, 1500);
    });
    
    // Validación del formulario de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            showError('Por favor completa todos los campos', loginForm);
            return;
        }
        
        // Aquí iría la lógica para enviar el formulario de login
        showSuccess('Inicio de sesión exitoso. Redirigiendo...');
        
        // Simular redirección
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    });
    
    // Función para mostrar errores
    function showError(message, element) {
        // Remover errores anteriores
        const existingError = element.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.8rem;
            margin-top: 0.3rem;
            animation: fadeIn 0.3s ease;
        `;
        
        element.appendChild(errorDiv);
        
        // Remover el error después de 3 segundos
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    // Función para mostrar éxito
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 2000);
    }
    
    // Animaciones para los enlaces
    [showRegister, showLogin].forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Validación en tiempo real para las contraseñas
    const regPassword = document.getElementById('regPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (this.value && regPassword.value && this.value !== regPassword.value) {
                this.style.borderColor = '#dc3545';
            } else if (this.value && this.value === regPassword.value) {
                this.style.borderColor = '#28a745';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    }
    
    // Mostrar/ocultar contraseña
    document.querySelectorAll('input[type="password"]').forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            opacity: 0.6;
            transition: opacity 0.3s ease;
        `;
        
        toggleBtn.addEventListener('click', function() {
            if (input.type === 'password') {
                input.type = 'text';
                toggleBtn.innerHTML = '👁️‍🗨️';
            } else {
                input.type = 'password';
                toggleBtn.innerHTML = '👁️';
            }
        });
        
        toggleBtn.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });
        
        toggleBtn.addEventListener('mouseleave', function() {
            this.style.opacity = '0.6';
        });
        
        wrapper.appendChild(toggleBtn);
    });
});

// Agregar estilos de animación al documento
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
