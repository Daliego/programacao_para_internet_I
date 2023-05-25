import express, { Request, Response, json, response } from 'express';
import { PrismaClient } from '@prisma/client'
import {PostError} from '../errors'
import cors from 'cors';
import { MyBlog, Post, posts } from '../microBlogs/microBlog';
import { list } from '@chakra-ui/react';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient()

app.get('/posts', async (req: Request, res: Response) => {
  try {
    const allPosts = await prisma.post.findMany();

    res.json(allPosts);
  } catch(error) {
    if (error instanceof PostError) {
      return res.status(404).json({ PostError: 'Post not found' });
    }

    return res.status(500).json({
      error
    })
  }
});

app.get('/posts/:id', async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (post == null) {
      throw new PostError('Post not found')
    }

    res.json(post);
  } catch (error) {
    if (error instanceof PostError) {
      return res.status(404).json({ PostError: error.message });
    }
    
    return res.status(500).json({error})
  }
});

app.post('/posts', async (req: Request, res: Response) => {
  try {
    const { title, text, likes }: Post = req.body;
    const postId = await prisma.post.count();

    await prisma.post.create({
      data: {
        id: postId,
        title: title,
        text: text,
        likes: likes,
        comments: {
          connect: []
        }
      }
    })

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    if (post == null) {
      throw new PostError('Post not registered')
    }

    res.status(201).json(post);

  } catch (error) {
    if (error instanceof PostError) {
      return res.status(404).json({ PostError: 'Post not found' });
    }

    return res.status(500).json({
      error
    })
  }

});

app.put('/posts/:id', async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  const { title, text, likes }: Post = req.body;

  try {
    if (isNaN(likes)) {
      throw new Error("You cant sign type number to string")
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        text: text,
        likes: likes,
        comments: {
          connect: [],
        },
      },
    })

    const newPost = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    if (newPost == null){
      throw new PostError('Post not updated')
    }
    res.json("Post updated");

  } catch(error) {
    if (error instanceof PostError) {
      return res.status(404).json({ PostError: error.message });
    }
  }
});


app.delete('/posts/:id', async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  
  try {
    await prisma.post.delete({
      where: {
        id: postId
      }
    })

    res.status(204).end()
  } catch (error) {
    if (error instanceof PostError) {
      return res.status(404).json({PostError: error.message})
    }

    return res.status(500).json({error})
  }
});

app.patch('/posts/:id', async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  try {
    const { text, likes }: Post = req.body;
    //console.log(title + '\n', text + '\n', date + '\n', likes + '\n');

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })
    
    if (post == null){
      throw new PostError('Post not updated')
    }
    
    await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        text: text == undefined ? post.text : text,
        likes: likes == undefined ? post.likes : likes
      }
    })
    
    res.status(200).json("Post Updated")

  } catch (error) {
    if (error instanceof PostError) {
      res.status(404).json({PostError: 'Post not found'})
    }
  }
})

app.patch('/posts/:id/:likes', async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  const likesReq: number = parseInt(req.params.likes);
  
  try {
    const { text }: Post = req.body;

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })
    
    if (post == null){
      throw new PostError('Post not updated')
    }
    
    await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        text: text == undefined ? post.text : text,
        likes: likesReq
      }
    })
    
    res.status(200).json("Post Updated")

  } catch (error) {
    if (error instanceof PostError) {
      res.status(404).json({PostError: 'Post not found'})
    }
  }
});

app.get('/posts/:id/comments', async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (post == null) {
      throw new PostError('Post not found')
    }
    
    const comments = await prisma.comments.findMany({
      where: {
        postId: postId
      }
    })
    res.json(comments);
  } catch (error) {
    if (error instanceof PostError) {
      return res.status(404).json({ PostError: error.message });
    }
    
    return res.status(500).json({error})
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});