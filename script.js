// VALIDAR EMAIL ESCOLAR
function emailValido(email){
  return email.endsWith("@escola.pr.gov.br");
}

// CADASTRO
function cadastrar(){
  let email = document.getElementById('email').value;
  let senha = document.getElementById('senha').value;
  let data = document.getElementById('data').value;
  let cgm = document.getElementById('cgm').value;

  if(!emailValido(email)){
    alert("Use email escolar!");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios.push({email, senha, data, cgm});
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert("Cadastrado!");
  window.location.href = "login.html";
}

// LOGIN
function login(){
  let email = document.getElementById('email').value;
  let senha = document.getElementById('senha').value;

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  let user = usuarios.find(u => u.email === email && u.senha === senha);

  if(user){
    localStorage.setItem('auth', 'true');
    window.location.href = "dashboard.html";
  } else {
    alert("Erro no login");
  }
}

// LOGOUT
function logout(){
  localStorage.removeItem('auth');
}

// PROTEGER PÁGINA
if(window.location.pathname.includes("dashboard")){
  if(localStorage.getItem('auth') !== 'true'){
    window.location.href = "login.html";
  }
}

// SALVAR RECLAMAÇÃO
function salvar(){
  let texto = document.getElementById('texto').value;
  let arquivo = document.getElementById('foto').files[0];
  let lista = JSON.parse(localStorage.getItem('dados')) || [];

  if(arquivo){
    let reader = new FileReader();
    reader.onload = function(e){
      lista.push({texto, imagem: e.target.result});
      localStorage.setItem('dados', JSON.stringify(lista));
      mostrar();
    }
    reader.readAsDataURL(arquivo);
  } else {
    lista.push({texto, imagem: null});
    localStorage.setItem('dados', JSON.stringify(lista));
    mostrar();
  }
}

// MOSTRAR RECLAMAÇÕES
function mostrar(){
  let lista = JSON.parse(localStorage.getItem('dados')) || [];
  let div = document.getElementById('lista');

  if(!div) return;

  div.innerHTML = '';

  lista.forEach(item => {
    div.innerHTML += `
      <div class="card">
        <p>${item.texto}</p>
        ${item.imagem ? `<img src="${item.imagem}">` : ''}
      </div>
    `;
  });
}

mostrar();
