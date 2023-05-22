import { PrismaClient } from '@prisma/client'
import { text } from 'express'
import { all } from 'axios'
import { Post } from './microBlogs/microBlog'
const prisma = new PrismaClient()

// const newBlog = async () => {await prisma.blog.create({
//         data: {
//             id: 1,
//             title: "My MicroBlog",
//             text: "Its my first micro blog"
//         },
//     })
// }

const createPost = async (post: Post) => {
    await prisma.post.create({
        data: {
            id: post.id,
            title: post.title,
            text: post.text,
            likes: post.likes,
            comments: {
                connect: []
            },
            microblog: {
                connect: {
                    id: 1
                }
            }
        }
    })
} 

async function connectPostsToBlog() {
//   // Encontre o blog pelo ID
//   const blogId = 1; // ID do blog
//   const blog = await prisma.blog.findUnique({
//     where: { id: blogId },
//     include: { posts: true },
//   });

//   if (!blog) {
//     console.log('Blog não encontrado');
//     return;
//   }

//   // Obtenha todos os posts existentes
//   const allPosts = await prisma.post.findMany();

//   // Conecte os posts existentes ao array de posts do blog
//   const connectedPosts = allPosts.map((post) => ({
//     id: post.id,
//   }));

//   // Atualize o blog com os posts conectados
//   await prisma.blog.update({
//     where: { id: blogId },
//     data: {
//       posts: {
//         connect: connectedPosts,
//       },
//     },
//   });

//   console.log('Posts conectados com sucesso ao blog');
}

// connectPostsToBlog()
//   .catch((error) => {
//     console.error(error);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function createRandomComments(postID: number) {
    //const postID = 1; // ID do post ao qual os comentários serão conectados
  
    const comments = [
      { text: 'Ótimo post!' },
      { text: 'Gostei das informações compartilhadas.' },
      { text: 'Excelente conteúdo!' },
      { text: 'Muito útil para mim.' },
      { text: 'Parabéns pelo artigo!' },
    ];  
    
      for (let i = 0; i < comments.length; i++) {
        await prisma.comments.create({
          data: {
              id: i,
              text: comments[i].text,
              post: { connect: { id: postID} },
              likes: i * 10,
          },
        });  
      }
      
    console.log('Comentários criados com sucesso:');
}


// async function main() {
//     const data = await prisma.post.findUnique({
//         where: {
//             id: 1
//         }
//     })
//     console.log(data)
// }

// main()
// .catch((error) => {
//     console.error(error);
// })
// .finally(async () => {
//     await prisma.$disconnect();
// });

async function getCommentsByPostId(postId: number) {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          comments: true,
        },
      });

      if (post) {
          console.log(post.comments);
      }

    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  //getCommentsByPostId(1);

  async function connectCommentsToPosts() {
    try {
      // Obtém todos os posts do banco de dados
      const posts = await prisma.post.findMany();
  
      // Percorre cada post e conecta os comentários ao array de comentários
      for (const post of posts) {
        await prisma.post.update({
          where: { id: post.id },
          data: {
            comments: {
              connect: {
                id: 1
              },
            },
          },
        });
      }
  
      console.log('Comentários conectados com sucesso aos posts.');
    } catch (error) {
      console.error('Ocorreu um erro ao conectar os comentários aos posts:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  // Array de comentários a serem conectados aos posts
  // const comments = [
  //   { id: 1, text: 'Comentário 1', likes: 20, post: connec },
  //   { id: 2, text: 'Comentário 2' },
  //   { id: 3, text: 'Comentário 3' },
  //   { id: 4, text: 'Comentário 4' },
  //   { id: 5, text: 'Comentário 5' },
  // ];

  connectCommentsToPosts();
