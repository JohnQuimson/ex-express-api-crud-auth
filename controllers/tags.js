const { PrismaClient } = require('@prisma/client');
const errorHandlerFunction = require('../utils/errorHandlerFunction');
const RestError = require('../utils/restError.js');
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { name } = req.body;
  const data = { name };
  try {
    const tag = await prisma.tag.create({ data });
    res.status(200).send(tag);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tag = await prisma.tag.findUnique({
      where: { id },
    });
    if (tag) {
      res.json(tag);
    } else {
      throw new RestError(`tag con id ${id} non trovato.`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tag = await prisma.tag.update({
      where: { id },
      data: req.body,
    });
    res.json(tag);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.tag.delete({
      where: { id },
    });
    res.json(`tag con id ${id} eliminato con successo.`);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  store,
  show,
  index,
  update,
  destroy,
};
