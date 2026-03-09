const container = document.getElementById("produto");

async function carregarProdutos(){

try{

const response = await fetch("http://localhost:8080/produtos");

const produtos = await response.json();

container.innerHTML = "";

produtos.forEach(produto => {

const div = document.createElement("div");

div.classList.add("product-card");

div.innerHTML = `

<h3 class="product-title">${produto.nome}</h3>

<p class="product-codigo">
Código: ${produto.codigo}
</p>

<p class="product-quantidade">
Estoque: ${produto.quantidade}
</p>

<p class="product-price">
R$ ${Number(produto.preco).toFixed(2)}
</p>

<div class="buttons">

<button onclick="editarProduto(${produto.id})">
Editar
</button>

<button onclick="removerProduto(${produto.id})">
Remover
</button>

</div>

`;

container.appendChild(div);

});

}catch(error){

console.error("Erro ao carregar produtos", error);

container.innerHTML = "<p>Erro ao carregar produtos</p>";

}

}

async function removerProduto(id){

await fetch(`http://localhost:8080/produtos/${id}`,{

method:"DELETE"

});

carregarProdutos();

}

function editarProduto(id){

localStorage.setItem("produtoEditar", id);

window.location.href="edit.html";

}

carregarProdutos();