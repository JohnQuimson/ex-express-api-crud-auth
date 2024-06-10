// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const generateSlug = (title) => {
//   return title
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, '-')
//     .replace(/[^\w-]+/g, '');
// };

// const posts = [];
// for (let i = 0; i < 100; i++) {
//   const title = `Post ${i}`;
//   const content = `testo post ${i}`;
//   const slug = generateSlug(title);
//   const post = {
//     title,
//     content,
//     slug,
//     published: true,
//   };
//   posts.push(post);
// }

// prisma.post
//   .createMany({
//     data: posts,
//   })
//   .then((count) => console.log(count))
//   .catch((err) => console.error(err));
