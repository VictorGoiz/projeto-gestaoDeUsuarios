const db = require('../config/db')


// controller responsavel por listagem dos usuarios
exports.listarUsuarios = async (req,res) =>{

    const [usuarios] = await db.query(`
        SELECT id, nome, email, admin,
        DATE_FORMAT(dataCadastro, '%d/%m/%Y') AS dataCadastro,
        foto
        FROM usuarios
    `);
    res.json(usuarios);

};
// controller para inserir usuario novo no banco
exports.cadastrarUsuarios = async (req,res) =>{

    const { nome, email, senha, admin } = req.body;
    await db.query(
        'INSERT INTO usuarios (nome, email, senha, admin) VALUES (?, ?, ?, ?)',
        [nome, email, senha, admin ? 1 : 0]
    );

    res.status(201).json({ mensagem: 'Usuário criado' });

};

// controller responsavel por
exports.atualizarUzuarios = async (req,res) =>{

    const { nome, email, admin } = req.body;

    const [result] = await db.query(
        'UPDATE usuarios SET nome=?, email=?, admin=? WHERE id=?',
        [nome, email, admin ? 1 : 0, req.params.id]
    );

    if (!result.affectedRows) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({ mensagem: 'Usuário atualizado' });


};

