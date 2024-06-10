const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bodyData = {
  title: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'title è obbligatorio',
      bail: true,
    },
    isString: {
      errorMessage: 'Name deve essere una stringa.',
      bail: true,
    },
    isLength: {
      errorMessage: 'Name deve essere di almeno 3 caratteri',
      options: { min: 3 },
    },
  },

  content: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'content è obbligatorio',
      bail: true,
    },
    isString: {
      errorMessage: 'content deve essere una stringa.',
      bail: true,
    },
    isLength: {
      errorMessage: 'content deve essere di almeno 5 caratteri',
      options: { min: 5 },
    },
  },

  published: {
    in: ['body'],
    isBoolean: {
      errorMessage: 'Available deve essere un booleano.',
    },
  },

  categoryId: {
    in: ['body'],
    isInt: {
      errorMessage: 'CategoryId deve essere numero intero',
      bail: true,
    },
    custom: {
      options: async (value) => {
        const categoryId = parseInt(value);
        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });
        if (!category) {
          throw new Error(`Non esiste una Category con id ${categoryId}`);
        }
        return true;
      },
    },
  },

  tags: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'tags è un campo obbligatorio.',
      bail: true,
    },
    isArray: {
      errorMessage: 'tags deve essere un array',
      bail: true,
    },
    custom: {
      options: async (ids) => {
        if (ids.length === 0) {
          throw new Error(`Una pizza deve avere almeno un ingrediente`);
        }
        const notIntegerId = ids.find((id) => isNaN(parseInt(id)));
        if (notIntegerId) {
          throw new Error(`Uno o più ID non sono dei numeri interi.`);
        }
        const tags = await prisma.ingredient.findMany({
          where: { id: { in: ids } },
        });
        if (tags.length !== ids.length) {
          throw new Error(`Uno o più ingredienti specificati non esistono.`);
        }
        return true;
      },
    },
  },
};

module.exports = {
  bodyData,
};
