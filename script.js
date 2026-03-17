document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    const alertMessage = document.getElementById('alert-message');

    // Validação de login
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const emailPattern = /^[a-zA-Z0-9._%+-]+@escola\.pr\.gov\.br$/;

            // Verifica se o email possui o domínio correto
            if (!email.match(emailPattern)) {
                alertMessage.innerText = 'O e-mail deve ser @escola.pr.gov.br';
                alertMessage.style.display = 'block';
                e.preventDefault();
            } else if (!password) {
                alertMessage.innerText = 'A senha é obrigatória';
                alertMessage.style.display = 'block';
                e.preventDefault();
            }
        });
    }

    // Exibição de alertas de sucesso ou erro após o envio da reclamação
    const reclamacaoForm = document.getElementById('reclamacao-form');
    if (reclamacaoForm) {
        reclamacaoForm.addEventListener('submit', function (e) {
            const descricao = document.getElementById('descricao').value;
            const imagem = document.getElementById('imagem').files.length;

            if (!descricao) {
                alert('Por favor, descreva o problema');
                e.preventDefault();
            } else if (imagem > 1) {
                alert('Você pode enviar apenas uma imagem');
                e.preventDefault();
            }
        });
    }
});
