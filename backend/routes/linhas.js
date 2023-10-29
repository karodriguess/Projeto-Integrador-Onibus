var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/listar", async function (req, res, next) {
  const linhas = await prisma.linha.findMany();
  res.json(linhas);
});

router.get("/buscar/:id", async function (req, res, next) {
  const linhaId = parseInt(req.params.id); 

  try {
    const linha = await prisma.linha.findUnique({
      where: {
        id: linhaId,
      },
    });

    if (linha) {
      res.json(linha);
    } else {
      res.status(404).json({ error: 'Linha não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar linha por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post("/cadastrar", async (req, res, next) => {
  try {
    const { nome, origem, destino, horarioPartida, duracao } = req.body;

    const novaLinha = await prisma.linha.create({
      data: {
        nome,
        origem,
        destino,
        horarioPartida: `1970-01-01T${horarioPartida}:00Z`,
        duracao: parseInt(duracao)
      },
    });

    res.json(novaLinha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a linha." });
  }
});

router.put('/editar/:id', async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, origem, destino, horarioPartida, duracao } = req.body;
    
    const linhaAtualizada = await prisma.linha.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        origem: origem,
        destino: destino,
        horarioPartida: `1970-01-01T${horarioPartida}:00Z`,
        duracao: parseInt(duracao),
      },
    });

    res.json(linhaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a linha.' });
  }
});

router.delete("/excluir/:id", async function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const linhaExcluida = await prisma.linha.delete({
      where: {
        id: id,
      },
    });

    if (linhaExcluida) {
      res.json({ message: "Linha excluída com sucesso." });
    } else {
      res.status(404).json({ error: "Linha não encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir a linha." });
  }
});

router.get("/qtd-horarios-por-linha", async function (req, res, next) {
  try {
    const linhas = await prisma.linha.groupBy({
      by: ["nome"],
      _count: true,
      orderBy: {
        _count: {
          nome: "desc",
        },
      },
    });

    res.json(linhas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar consulta." });
  }
});

module.exports = router;
