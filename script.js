function emailValido(email){
  return email.endsWith("@escola.pr.gov.br");
}

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
}

function login(){
  let email = document.getElementById('email').value;
  let senha = document.getElementById('senha').value;

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  let user = usuarios.find(u => u.email === email && u.senha === senha);

  if(user){
    localStorage.setItem('auth', 'true');
    window.location.href = "dashboard.html";
  } else {
    alert("Erro");
  }
}

// RECLAMAÇÕES
function salvar(){
  let texto = document.getElementById('texto').value;
  let lista = JSON.parse(localStorage.getItem('dados')) || [];

  lista.push({texto});
  localStorage.setItem('dados', JSON.stringify(lista));

  mostrar();
}

function mostrar(){
  let lista = JSON.parse(localStorage.getItem('dados')) || [];
  let div = document.getElementById('lista');

  if(!div) return;

  div.innerHTML = '';

  lista.forEach(i => {
    div.innerHTML += `<p>${i.texto}</p>`;
  });
}

mostrar();
