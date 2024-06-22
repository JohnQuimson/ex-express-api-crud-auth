const { PrismaClient } = require('@prisma/client');
const errorHandlerFunction = require('../utils/errorHandlerFunction');
const RestError = require('../utils/restError.js');
const prisma = new PrismaClient();

const generateSlug = (title) => {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

const store = async (req, res) => {
  const { title, content, categoryId, tags } = req.body;

  const slug = generateSlug(title);

  const data = {
    title,
    slug,
    content,
    published: req.body.published ? true : false,
    tags: {
      connect: tags.map((id) => ({ id: parseInt(id) })),
    },
  };

  if (categoryId) {
    data.categoryId = parseInt(categoryId, 10);
  }

  if (req.file) {
    data.img = `${HOST}:${port}/post_pics/${req.file.filename}`;
  }

  try {
    // Creare un post
    const post = await prisma.post.create({ data });
    res.status(200).send(post);
  } catch (err) {
    if (req.file) {
      deletePic('post_pics', req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await prisma.post.findUnique({
      where: { slug: slug },
      include: {
        tags: true,
      },
    });
    if (post) {
      res.json(post);
    } else {
      throw new RestError(`Post con slug ${slug} non trovato.`, 404);
    }
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};

// ---------------- with pagination -----------------------

// const index = async (req, res) => {
//   try {
//     let { page, limit, published } = req.query;
//     page = parseInt(page) || 1;
//     limit = parseInt(limit) || 5;

//     const offset = (page - 1) * limit; // elementi da saltare per la visualizzazione

//     // filtro per pubblicazione
//     const where = {};
//     if (published === 'true') {
//       where.published = true;
//     } else if (published === 'false') {
//       where.published = false;
//     }

//     const posts = await prisma.post.findMany({
//       where,
//       take: limit,
//       skip: offset,
//       include: {
//         tags: true,
//       },
//     });

//     res.json({ data: posts });
//   } catch (error) {
//     console.error('Qualcosa è andato storto', error);
//     res.status(500).send('Errore durante il recupero dei post');
//   }
// };

const index = async (req, res) => {
  try {
    let { published } = req.query;

    // filtro per pubblicazione
    const where = {};
    if (published === 'true') {
      where.published = true;
    } else if (published === 'false') {
      where.published = false;
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        tags: true,
        category: true,

        tags: {
          select: {
            name: true,
            id: true,
          },
        },
        category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    res.json({ data: posts });
  } catch (error) {
    console.error('Qualcosa è andato storto', error);
    res.status(500).send('Errore durante il recupero dei post');
  }
};

const update = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, published } = req.body;

    const newSlug = title ? generateSlug(title) : undefined;

    const data = {
      title,
      content,
      published,
      ...(newSlug && { slug: newSlug }),
    };

    const post = await prisma.post.update({
      where: { slug: slug },
      data,
      include: {
        tags: true,
      },
    });
    res.json(post);
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};

const destroy = async (req, res) => {
  const { slug } = req.params;
  await prisma.post.delete({
    where: { slug: slug },
  });
  res.json(`Post con slug ${slug} eliminato con successo.`);
};

module.exports = {
  store,
  show,
  index,
  update,
  destroy,
};
