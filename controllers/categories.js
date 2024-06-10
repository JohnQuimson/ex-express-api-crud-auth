const { PrismaClient } = require('@prisma/client');
const errorHandlerFunction = require('../utils/errorHandlerFunction');
const RestError = require('../utils/restError.js');
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { name } = req.body;

  const data = { name };

  try {
    const category = await prisma.category.create({ data });
    res.status(200).send(category);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (category) {
      res.json(category);
    } else {
      throw new RestError(`Category con id ${id} non trovata.`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const category = await prisma.category.update({
      where: { id },
      data: req.body,
    });
    res.json(category);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.category.delete({
      where: { id },
    });
    res.json(`Category con id ${id} eliminata con successo.`);
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
