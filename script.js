// ===== UTIL =====
function toast(msg){
let t=document.createElement("div");
t.className="toast show";
t.innerText=msg;
document.body.appendChild(t);

setTimeout(()=>{t.remove()},3000);
}

// ===== LOGIN =====
function login(){
let e=email.value;
let s=senha.value;

let u=JSON.parse(localStorage.getItem("usuarios"))||[];

let user=u.find(x=>x.email==e && x.senha==s);

if(user){
localStorage.setItem("auth","true");
toast("Login realizado!");
setTimeout(()=>window.location="dashboard.html",1000);
}else{
toast("Erro no login");
}
}

// ===== CADASTRO =====
function cadastrar(){
let u=JSON.parse(localStorage.getItem("usuarios"))||[];

if(!email.value.endsWith("@escola.pr.gov.br")){
toast("Use email escolar!");
return;
}

u.push({
email:email.value,
senha:senha.value,
data:data.value,
cgm:cgm.value
});

localStorage.setItem("usuarios",JSON.stringify(u));
toast("Cadastro realizado!");
}

// ===== RECLAMAÇÕES =====
function salvar(){
let lista=JSON.parse(localStorage.getItem("dados"))||[];

lista.push({
texto:document.getElementById("texto").value,
data:new Date().toLocaleString()
});

localStorage.setItem("dados",JSON.stringify(lista));
mostrar();
toast("Reclamação enviada!");
}

function mostrar(){
let lista=JSON.parse(localStorage.getItem("dados"))||[];
let div=document.getElementById("lista");
if(!div)return;

div.innerHTML="";
lista.forEach(i=>{
div.innerHTML+=`
<div class="card">
<p>${i.texto}</p>
<small>${i.data}</small>
</div>`;
});
}

// ===== CARRINHO =====
function addCarrinho(n,p){
let c=JSON.parse(localStorage.getItem("carrinho"))||[];
c.push({n,p});
localStorage.setItem("carrinho",JSON.stringify(c));
toast("Adicionado!");
}

function abrirCarrinho(){
document.getElementById("carrinho").classList.toggle("active");
renderCarrinho();
}

function renderCarrinho(){
let c=JSON.parse(localStorage.getItem("carrinho"))||[];
let div=document.getElementById("listaCarrinho");

let total=0;
div.innerHTML="";

c.forEach((i,index)=>{
div.innerHTML+=`
<p>${i.n} - R$${i.p}
<button onclick="remover(${index})">X</button></p>`;
total+=i.p;
});

div.innerHTML+=`<h3>Total: R$${total}</h3>`;
}

function remover(i){
let c=JSON.parse(localStorage.getItem("carrinho"))||[];
c.splice(i,1);
localStorage.setItem("carrinho",JSON.stringify(c));
renderCarrinho();
}

// ===== CHAT =====
function enviar(e){
if(e.key==="Enter"){
let t=e.target.value;
let chat=document.getElementById("chat");

chat.innerHTML+=`<p><b>Você:</b> ${t}</p>`;

let r="Pergunte sobre curso";

if(t.includes("curso")) r="Curso técnico completo!";
if(t.includes("duração")) r="Dura 2 a 3 anos";
if(t.includes("emprego")) r="Prepara para o mercado";

chat.innerHTML+=`<p><b>Bot:</b> ${r}</p>`;

e.target.value="";
}
}
