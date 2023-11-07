var express = require('express');
var router = express.Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: 'minimal'});

function exceptionHandler(e) {
  let error = {
    code: 500,
    message: 'internal server error'
  }
  
  if (
    e instanceof Prisma.PrismaClientKnownRequestError ||
    e instanceof Prisma.PrismaClientValidationError
  ) {
    error.code = 400;
    error.message = e.message
  }

  return error
}

/* GET api/viagens => lista todas as viagens */
router.get('/', async (req, res) => {
  try {

    const viagens = await prisma.viagem.findMany();
    res.status(200).json(viagens)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

/* POST api/viagens/cadastrar => cadastra uma viagem */ 
router.post('/', async (req, res) => {
  try {
    
    const dados = req.body

    const viagem = await prisma.viagem.create({
      data: dados
    })
    res.status(201).json(viagem)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

// PUT api/viagens/atualizar/5 => atualiza TODOS OS DADOS da viagem de id 5 
router.put('/atualizar/:id', async (req, res) => {
  
  try {
    const id = parseInt(req.params.id)
    const dados = req.body

    const viagem = await prisma.viagem.update({
      data: dados,
      where: {
        id: id
      }
    })
    res.status(200).json(viagem)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }

});

/* delete api/viagens/deletar/6 => deleta a viagem de id 6 */
router.delete('/deletar/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const viagem = await prisma.viagem.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(viagem)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

//          RELACIONAMENTO CLIENTE E VIAGEM

/* GET /api/viagens/2/clientes => pega todos os clientes que embarcaram na viagem de id 2 */
router.get('/:id/clientes', async (req, res) => {
  

  try {
    const id = parseInt(req.params.id)

    const viagemCliente = await prisma.viagemHasCliente.findMany({
      where: {
        viagem_id: id
      }
    });
    res.status(200).json(viagemCliente)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});



module.exports = router;
