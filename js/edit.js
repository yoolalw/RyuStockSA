const form = document.getElementById("registerForm");

// pega o id salvo pela home
const produtoId = localStorage.getItem("produtoEditar");

form.addEventListener("submit", async function(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const codigo = document.getElementById("codigo").value;
    const quantidade = document.getElementById("quantidade").value;
    const preco = document.getElementById("preco").value;

    const produto = {
        nome: nome,
        codigo: Number(codigo),
        quantidade: Number(quantidade),
        preco: Number(preco)
    };

    try{

        const response = await fetch(`http://localhost:8080/produtos/${produtoId}`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(produto)
        });

        if(!response.ok){
            throw new Error("Erro ao atualizar produto");
        }

        alert("Produto atualizado com sucesso!");

        // limpa o id salvo
        localStorage.removeItem("produtoEditar");

        // volta para home
        window.location.href = "home.html";

    }catch(error){

        console.error("Erro:", error);
        alert("Erro ao atualizar produto");

    }

});