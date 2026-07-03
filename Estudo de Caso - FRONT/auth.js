document.addEventListener('DOMContentLoaded', function() {
    
    // --- ELEMENTOS DA TELA ---
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const errorDiv = document.getElementById('error');

    // --- FUNÇÃO PARA EXIBIR ERROS NA TELA ---
    function showError(msg) {
        errorDiv.textContent = msg;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000); // Some depois de 5 segundos
    }

    // --- LÓGICA DE ALTERNÂNCIA (LOGIN <-> CADASTRO) ---
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });

    // ==========================================
    // INTEGRAÇÃO: CADASTRAR ALUNO (POST)
    // ==========================================
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede a página de recarregar

        // 1. Coleta os dados do DOM
        const alunoDTO = {
            nome: document.getElementById('reg-nome').value,
            email: document.getElementById('reg-email').value,
            cpf: document.getElementById('reg-cpf').value,
            genero: document.getElementById('reg-genero').value,
            dataNascimento: document.getElementById('reg-dataNascimento').value,
            ra: document.getElementById('reg-ra').value,
            senha: document.getElementById('reg-senha').value,
            status: "ATIVO" // Enviamos um status padrão conforme exige a API
        };

        // 2. Dispara o fetch para a sua API Java
        fetch("http://localhost:8080/aluno", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alunoDTO)
        })
        .then(async (resposta) => {
            if (resposta.status === 201) {
                // Sucesso absoluto!
                alert('Conta criada com sucesso! Você já pode fazer login.');
                registerForm.reset(); // Limpa os campos
                // Volta para a tela de login
                registerSection.classList.add('hidden');
                loginSection.classList.remove('hidden');
            } else {
                // Se o Java retornou um erro (ex: 400 Bad Request)
                // Tentamos ler a mensagem de erro que o Java mandou
                const erroData = await resposta.json().catch(() => null);
                const mensagem = erroData ? erroData.message : 'Erro ao cadastrar. Verifique os dados e tente novamente.';
                showError(mensagem);
            }
        })
        .catch(erro => {
            console.error("Erro no Fetch:", erro);
            showError("Servidor indisponível. O Backend está rodando?");
        });
    });

    // ==========================================
    // INTEGRAÇÃO: FAZER LOGIN 
    // ==========================================
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // ATENÇÃO: Para o login funcionar de verdade, você precisará criar um Controller 
        // no seu Java especificamente para Autenticação (ex: POST /login).
        // Como ainda não temos essa rota, vou deixar uma mensagem de aviso.
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        showError("A API de Login ainda não foi construída no Backend Java!");
        
        /* Quando você construir a rota de login no Java, o código será parecido com este:
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, senha: senha })
        }).then(...)
        */
    });
});