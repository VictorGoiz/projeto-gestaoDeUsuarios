

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
 
  const data = {
    nome: e.target.querySelector('[placeholder="Digite o nome"]').value,
    email: e.target.querySelector('[type="email"]').value,
    senha: e.target.querySelector('[type="password"]').value,
    admin: e.target.querySelector('[type="checkbox"]').checked
  };


  try{
  await fetch('http://localhost:3000/usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  carregarUsuarios()
  contarUsuarios();
  contarAdministradores();
  }catch(e){
    console.log(`erro ao enviar fetch:${e}`)
  }
 
  e.target.reset();
});



function abrirModalEditar(id, nome, email, adm) {
  document.getElementById('edit-id').value = id;
  document.getElementById('edit-nome').value = nome;
  document.getElementById('edit-email').value = email;
  document.getElementById('edit-adm').checked = adm;

  const modal = new bootstrap.Modal(
    document.getElementById('modalEditarUsuario')
  );

  modal.show();
}

async function salvarEdicao() {
  const id = document.getElementById('edit-id').value;

  const dados = {
    nome: document.getElementById('edit-nome').value,
    email: document.getElementById('edit-email').value,
    adm: document.getElementById('edit-adm').checked
  };

  try {
    const response = await fetch(`http://localhost:3000/usuario/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      alert('Erro ao atualizar usuário');
      return;
    }

    // fecha o modal
    bootstrap.Modal.getInstance(
      document.getElementById('modalEditarUsuario')
    ).hide();

    // recarrega tabela
    carregarUsuarios();

  } catch (err) {
    console.error(err);
  }
}

function abrirModalExcluir(id) {
  document.getElementById('delete-id').value = id;

  const modal = new bootstrap.Modal(
    document.getElementById('modalExcluirUsuario')
  );

  modal.show();
}

async function confirmarExclusao() {
  const id = document.getElementById('delete-id').value;

  try {
    const response = await fetch(`http://localhost:3000/usuario/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      alert('Erro ao excluir usuário');
      return;
    }

    bootstrap.Modal.getInstance(
      document.getElementById('modalExcluirUsuario')
    ).hide();

    carregarUsuarios();

  } catch (err) {
    console.error(err);
  }
}


async function carregarUsuarios() {
try{
  const dados = await fetch('http://localhost:3000/usuario',{
    credentials : 'include',
    method : 'GET'
  })
  const usuarios = await dados.json()

  const div = document.getElementById('user-data')
        div.innerHTML = '';
        usuarios.forEach( u => {
            div.innerHTML += `
            <tr>
              <td><img src="https://via.placeholder.com/40" class="rounded-circle"></td>
              <td>${u.nome}</td>
              <td>${u.email}</td>
              <td>${u.adm ? 'Sim' : 'Não'}</td>
              <td>${u.dataCadastro}</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="abrirModalEditar(${u.id}, '${u.nome}', '${u.email}', ${u.adm})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="abrirModalExcluir(${u.id})">Excluir</button>
              </td>
            </tr>
            `
        });

}catch(err){
    console.log(`erro ao buscar usuarios,\n erro:${err}`)
  }
}

carregarUsuarios()

async function contarUsuarios() {
  const areaUser = document.getElementById('qtdUsuarios');
  const dados = await fetch('http://localhost:3000/usuario/contarUsuarios',{
    credentials : 'include',
    method : 'GET'
  })
  const qtd_usuarios = await dados.json()
  console.log(qtd_usuarios)

  areaUser.innerText = `${qtd_usuarios[0].qtd_usuarios}`

}

async function contarAdministradores() {
  const areaAdm = document.getElementById('qtdAdms');
  const dados = await fetch('http://localhost:3000/usuario/contarAdms',{
    credentials: 'include',
    method:'GET'
  });
  const qtd_adms = await dados.json();

  areaAdm.innerText = qtd_adms[0].qtd_adms;
  
}


contarUsuarios();
contarAdministradores();