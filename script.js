// =============================
// VALIDAÇÃO DE EMAIL
// =============================
function emailValido(email){
  let regex = /^[a-zA-Z0-9._%+-]+@escola\.pr\.gov\.br$/;
  return regex.test(email);
}

// =============================
// CADASTRO
// =============================
function cadastrar(){
  let email = document.getElementById('email').value.trim();
  let senha = document.getElementById('senha').value.trim();
  let data = document.getElementById('data').value;
  let cgm = document.getElementById('cgm').value.trim();

  if(!email || !senha || !data || !cgm){
    alert("Preencha todos os campos!");
    return;
  }

  if(!emailValido(email)){
    alert("Use um email válido da escola!");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  let existe = usuarios.find(u => u.email === email);
  if(existe){
    alert("Usuário já cadastrado!");
    return;
  }

  usuarios.push({email, senha, data, cgm});
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

// =============================
// LOGIN
// =============================
function login(){
  let email = document.getElementById('email').value.trim();
  let senha = document.getElementById('senha').value.trim();

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  let user = usuarios.find(u => u.email === email && u.senha === senha);

  if(user){
    localStorage.setItem('auth', 'true');
    localStorage.setItem('usuarioLogado', email);
    window.location.href = "dashboard.html";
  } else {
    alert("Email ou senha incorretos!");
  }
}

// =============================
// LOGOUT
// =============================
function logout(){
  localStorage.removeItem('auth');
  localStorage.removeItem('usuarioLogado');
}

// =============================
// PROTEÇÃO DE PÁGINA
// =============================
if(window.location.pathname.includes("dashboard")){
  if(localStorage.getItem('auth') !== 'true'){
    window.location.href = "login.html";
  }
}

// =============================
// SALVAR RECLAMAÇÃO
// =============================
function salvar(){
  let texto = document.getElementById('texto').value.trim();
  let arquivo = document.getElementById('foto').files[0];
  let usuario = localStorage.getItem('usuarioLogado');

  if(!texto){
    alert("Digite a reclamação!");
    return;
  }

  let lista = JSON.parse(localStorage.getItem('dados')) || [];

  if(arquivo){
    let reader = new FileReader();
    reader.onload = function(e){
      lista.push({
        texto,
        imagem: e.target.result,
        usuario,
        data: new Date().toLocaleString()
      });

      localStorage.setItem('dados', JSON.stringify(lista));
      limparCampos();
      mostrar();
    }
    reader.readAsDataURL(arquivo);
  } else {
    lista.push({
      texto,
      imagem: null,
      usuario,
      data: new Date().toLocaleString()
    });

    localStorage.setItem('dados', JSON.stringify(lista));
    limparCampos();
    mostrar();
  }
}

// =============================
// MOSTRAR RECLAMAÇÕES
// =============================
function mostrar(){
  let lista = JSON.parse(localStorage.getItem('dados')) || [];
  let div = document.getElementById('lista');

  if(!div) return;

  div.innerHTML = '';

  lista.reverse().forEach((item, index) => {
    div.innerHTML += `
      <div class="card">
        <p><strong>Aluno:</strong> ${item.usuario || "Anônimo"}</p>
        <p><strong>Data:</strong> ${item.data}</p>
        <p>${item.texto}</p>

        ${item.imagem ? `<img src="${item.imagem}">` : ''}

        <button onclick="remover(${index})">🗑 Remover</button>
      </div>
    `;
  });
}

// =============================
// REMOVER RECLAMAÇÃO
// =============================
function remover(index){
  let lista = JSON.parse(localStorage.getItem('dados')) || [];

  if(confirm("Deseja remover esta reclamação?")){
    lista.splice(index, 1);
    localStorage.setItem('dados', JSON.stringify(lista));
    mostrar();
  }
}

// =============================
// LIMPAR CAMPOS
// =============================
function limparCampos(){
  let texto = document.getElementById('texto');
  let foto = document.getElementById('foto');

  if(texto) texto.value = '';
  if(foto) foto.value = '';
}

// =============================
// FUNÇÕES EXTRAS (INDEX)
// =============================
function modoEscuro(){
  document.body.classList.toggle("dark");
}

function mostrarMensagem(){
  let el = document.getElementById('saida');
  if(el) el.innerText = "Bem-vindo ao sistema escolar!";
}

function verData(){
  let el = document.getElementById('saida');
  if(el) el.innerText = new Date().toLocaleString();
}

function infoSistema(){
  let el = document.getElementById('saida');
  if(el) el.innerText = "Sistema escolar versão 2.0 🚀";
}

function carregarNoticias(){
  let el = document.getElementById('noticias');
  if(!el) return;

  el.innerHTML = `
    <p>📢 Feira de ciências chegando!</p>
    <p>⚽ Jogos escolares iniciando!</p>
    <p>📚 Semana de provas!</p>
  `;
}

// =============================
// INICIAR
// =============================
mostrar();
