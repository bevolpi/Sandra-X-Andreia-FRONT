
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const errorDiv = document.getElementById('error');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const senha = senhaInput.value;

        // Minimal validation
        if (!email || !senha) {
            showError('Por favor, preencha email e senha.');
            return;
        }

        // Buscar no DB.usuarios
        const user = DB.usuarios.find(u => u.email === email && u.senha === senha);

        if (user) {
            // Salvar sessionStorage
            const session = {
                id: user.id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfil
            };
            sessionStorage.setItem("session", JSON.stringify(session));

            // Redirecionar
            let redirect = '';
            switch(user.perfil) {
                case 'aluno':
                    redirect = '/aluno/dashboard.html';
                    break;
                case 'professor':
                    redirect = '/professor/dashboard.html';
                    break;
                case 'curador':
                    redirect = '/curador/dashboard.html';
                    break;
                default:
                    showError('Perfil não reconhecido.');
                    return;
            }
            window.location.href = redirect;
        } else {
            showError('Email ou senha inválidos.');
        }
    });

    function showError(msg) {
        errorDiv.textContent = msg;
        errorDiv.style.display = 'block';
        // Auto hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
});