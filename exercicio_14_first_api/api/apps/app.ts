import express, { Request, Response, json, response } from 'express';
import {PostError} from '../errors'
import cors from 'cors';
import { MyBlog, Post, posts } from '../microBlogs/microBlog';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/posts', (req: Request, res: Response) => {
  res.json(MyBlog.retrieveAll);
});

app.get('/posts/:id', (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  try {
    const post: Post = MyBlog.retrieve(postId);
    res.json(post);
  } catch (error) {
    if (error instanceof PostError) {
      return res.status(404).json({ PostError: 'Post not found' });
    }
  }
});

app.post('/posts', (req: Request, res: Response) => {
  const { title, text, date, likes }: Post = req.body;
  const newPost: Post = { id: posts.length, title, text, date, likes };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  const { title, text, date, likes }: Post = req.body;
  try {
    const updatedPost: Post = { id: postId, title, text, date, likes };
    MyBlog.update(updatedPost)
    res.json(updatedPost)
  } catch(error) {
    if (error instanceof PostError) {
      return res.status(404).json({ PostError: 'Post not found' });
    }
  }
});


app.delete('/posts/:id', (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  try {
    const deleted_Post: Post = MyBlog.retrieve(postId)
    MyBlog.delete(deleted_Post.id)

    res.status(204).end()
  } catch (error) {
    if (error instanceof PostError) {
      res.status(404).json({PostError: 'Post not found'})
    }
  }
});

app.patch('/posts/:id', (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);
  try {
    const { text, likes }: Post = req.body;
    //console.log(title + '\n', text + '\n', date + '\n', likes + '\n');
    const post: Post = MyBlog.retrieve(postId);
    
    post.text = text == undefined ? post.text : text;
    post.likes = likes == undefined ? post.likes : likes;
    
    MyBlog.update(post)
    
    res.status(200).json(MyBlog.retrieve(postId))

  } catch (error) {
    if (error instanceof PostError) {
      res.status(404).json({PostError: 'Post not found'})
    }
  }
})

app.patch('/posts/:id/:likes', (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const likes = parseInt(req.params.likes);
  
 try {
  const post = MyBlog.retrieve(postId);

  post.likes += likes == undefined ? post.likes : likes;

  res.status(200).json(post);
 } catch (error) {
  if (error instanceof PostError) {
    res.status(404).json({PostError: 'Post not found'})
  }
 }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});