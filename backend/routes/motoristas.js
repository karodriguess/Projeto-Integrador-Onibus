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

/* GET api/motoristas => lista todos os motoristas */
router.get('/', async (req, res) => {
  try {
    
    const motoristas = await prisma.motorista.findMany();
    res.status(200).json(motoristas)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

/* GET api/motoristas/3 => mostra apenas o motorista de id 3 */
router.get('/:id', async (req, res) => {
  try {
    
    const id = parseInt(req.params.id)

    const motorista = await prisma.motorista.findUnique({
      where: {
        id: id
      },
      select: {
        nomeCompleto: true,
        email: true,
        nascimento: true,
        numeroTel: true
      }
    });
    res.status(200).json(motorista)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

/* POST api/motoristas/cadastrar => cadastra um motorista */
router.post('/cadastrar', async (req, res) => {

  try {

    const dados = req.body

    const motorista = await prisma.motorista.create({
      data: dados
    })
    res.status(200).json(motorista)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
  
});

/* PUT api/motoristas/atualizar/5 => atualiza TODOS OS DADOS do motorista de id 5 */
router.put('/atualizar/:id', async (req, res) => {
  
  try {
    const id = parseInt(req.params.id)
    const dados = req.body

    const motorista = await prisma.motorista.update({
      data: dados,
      where: {
        id: id
      }
    })
    res.status(200).json(motorista)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }

});

/* delete api/motoristas/deletar/6 => deleta o motorista de id 6 */
router.delete('/deletar/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const motorista = await prisma.motorista.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(motorista)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});


//                RELACIONAMENTO MOTORISTA E ONIBUS

// GET /api/motoristas/7/onibus => pega todos os onibus que o motorista de id 7 já dirigiu
router.get('/:id/onibus', async (req, res) => {
  try {
    
    const id = parseInt(req.params.id)

    const motoristaOnibus = await prisma.motoristaOnibus.findMany({
      where: {
        motorista_id: id
      }
    })
    res.status(200).json(motoristaOnibus)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
})

module.exports = router;
