const db = require('../config/db')

// funcoes responsaveis por gerenciar informaçoes relacionadas aos usuarios


// controller responsavel por listagem dos usuarios
exports.listarUsuarios = async (req,res) =>{

  try{
    const [usuarios] = await db.query(`
        SELECT id, nome, email, adm,
        DATE_FORMAT(dataCadastro, '%d/%m/%Y') AS dataCadastro
        FROM usuarios
    `);
    res.json(usuarios);
  }catch(err){
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }

};
// controller para inserir usuario novo no banco
exports.cadastrarUsuarios = async (req,res) =>{
    try {
    const { nome, email, senha, admin } = req.body;
      console.log('passou por aqui')
    await db.query(
      'INSERT INTO usuarios (nome, email, senha, adm) VALUES (?, ?, ?, ?)',
      [nome, email, senha, admin ? 1 : 0]
    );

    res.status(201).json({ mensagem: 'Usuário criado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }

};

// controller responsavel por atualizar as informaçoes
exports.atualizarUsuarios = async (req,res) =>{
    const { nome, email, adm } = req.body;

    console.log(req.body)
    try{
    const [result] = await db.query(
        'UPDATE usuarios SET nome=?, email=?, adm=? WHERE id=?',
        [nome, email, adm ? 1 : 0, req.params.id]
    );
    if (!result.affectedRows) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json({ mensagem: 'Usuário atualizado' });
  }catch(err){
    console.error(`erro ao atualizar usuario \n erro:${err}`)
  }


};
// controller responsavel por deletar os usuarios
exports.deletarUsuarios = async (req,res) => {

  const id = req.params.id;
  try{
    await db.query('delete from usuarios where id=?',[id])
    return res.status(201).json({mensagem:'usuario deletado'})
  }catch(err){
    console.error(`erro ao deletar usuario \n erro:${err}`)
  }

};

exports.contarUsuarios = async (req,res) =>{

  try{
    const [qtd_usuarios] = await db.query(`select count(*) as qtd_usuarios from usuarios`);
    res.status(201).json(qtd_usuarios);
  }catch(err){
    console.err(`erro ao buscar a quantidade de usuarios \n erro:${err}`)
  }


}

exports.contarAdms = async (req,res) =>{

  try{
    const [qtd_adms] = await db.query(`select count(*) as qtd_adms from usuarios where adm = 1`);
    res.status(201).json(qtd_adms)
    console.log('busca de administradores realizada')
  }catch(err){
    console.log(`erro ao buscar administradores \n erro:${err}`)
  }

}

