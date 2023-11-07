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
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
