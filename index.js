
async function CarregarUsuarios() {

    try{
        const resposta = await fetch('http://localhost:3000/usuario', {
            credentials: 'include'
        });
        const usuarios = await resposta.json();


        const div = document.getElementById('user-data')

        div.innerHTML = '';
        usuarios.forEach( u => {
            div.innerHTML = `
                    <td><img src="https://via.placeholder.com/40" class="rounded-circle"></td>
                    <td>${u.nome}</td>
                    <td>${u.email}</td>
                    <td>${u.admin}</td>
                    <td>${u.dataCadastro}</td>
                    <td>
                      <button class="btn btn-sm btn-primary">Editar</button>
                      <button class="btn btn-sm btn-danger">Excluir</button>
                    </td>
            `
        });

    }catch(e){
        console.log(`erro ao caregar usuarios:${e}`)
    }

    
}


document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    nome: e.target.querySelector('[placeholder="Digite o nome"]').value,
    email: e.target.querySelector('[type="email"]').value,
    senha: e.target.querySelector('[type="password"]').value,
    admin: e.target.querySelector('[type="checkbox"]').checked
  };

  await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });

  carregarUsuarios();
  e.target.reset();
});