const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerBody = {
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email è un campo obbligatorio.',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Email deve essere una mail valida',
      bail: true,
    },
    custom: {
      options: async (value) => {
        const user = await prisma.user.findUnique({
          where: { email: value },
        });
        if (user) {
          throw new Error(`User associato a questa email già presente.`);
        }
        return true;
      },
    },
  },
  name: {
    in: ['body'],
    isString: {
      errorMessage: 'Name deve essere una stringa.',
      bail: true,
    },
    isLength: {
      errorMessage: 'Name deve essere di almeno 3 caratteri',
      options: { min: 3 },
    },
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Password è un campo obbligatorio.',
      bail: true,
    },
    isString: {
      errorMessage: 'Password deve essere una stringa.',
      bail: true,
    },
    isLength: {
      errorMessage: 'Password deve essere di almeno 8 caratteri',
      options: { min: 8 },
    },
  },
};

const loginBody = {
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email è un campo obbligatorio.',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Email deve essere una mail valida',
    },
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Password è un campo obbligatorio.',
      bail: true,
    },
    isString: {
      errorMessage: 'Password deve essere una stringa.',
    },
  },
};

module.exports = {
  registerBody,
  loginBody,
};
