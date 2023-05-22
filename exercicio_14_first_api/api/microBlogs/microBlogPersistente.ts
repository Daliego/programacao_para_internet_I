import PromptSync from "prompt-sync";
import { PostError } from "../errors/index";
import { Post, posts } from "./microBlog";
import { PrismaClient } from '@prisma/client'

// export interface Post {
//     id(await deletedPost).id: number;
//     title: string;
//     text: string;
//     date: string;
//     likes: number;
// }
//const prisma: PrismaClient = new PrismaClient();

export class MicroblogPersistente {
    //array_post : Post[];
    prisma: PrismaClient;
    
    constructor (){
        //this.array_post = postagens;
        this.prisma = new PrismaClient()
    }

    async create(post : Post) {
        try {
            await this.prisma.post.create({
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
            
            //this.array_post.push(post);
        } catch (error) {
            console.error(error);
        } finally {
            await this.prisma.$disconnect();
        }
        
        
        
    }
    
    // retrieve(id : number){
    //     let post = this.array_post.find(post => post.id == id)
    //     if (post) {
    //         return post;
    //     }
    //     throw new PostError ('The post dont exist')
        
    // }

    async retrievePrisma(id: number) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: id
            }
        })

        if (post) {
            return post
        }

        throw new PostError ('The post dont exist')
    }

    async update(post: Post) {
        try {
            let old_post = this.retrievePrisma(post.id);
            
            await this.prisma.post.update({
                where: {
                    id: (await old_post).id,
                },
                data: {
                    id: post.id,
                    title: post.title,
                    text: post.text,
                    likes: post.likes,
                    //comments: []
                }
            })
            
            //this.array_post[old_post.id] = post;
        } catch (error) {
            console.error(error);
          } finally {
            await this.prisma.$disconnect();
          }
    }

    async delete(id: number) {
        try {
            let deletedPost = this.retrievePrisma(id);
            
            await this.prisma.post.delete({
                where: {
                    id: (await deletedPost).id,
                },
            });
            
            // for (let i = (await deletedPost).id; i < this.array_post.length; i++){
            //     this.array_post[i] = this.array_post[i+1];
            // }

            // this.array_post.pop();
          } catch (error) {
            console.error(error);
          } finally {
            await this.prisma.$disconnect();
          }
    }

    async retrieveAll() {
        return await this.prisma.post.findMany()
    }

    async blogComment(id: number) {
        let post =  await this.prisma.post.findUnique({
            where: {
                id: 1,
            },
        }).comments
        return post
    }
}

export const microblogPersistente: MicroblogPersistente = new MicroblogPersistente()