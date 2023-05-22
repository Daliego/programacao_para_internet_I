import { PostError } from "../errors/index";

export interface Post {
    id: number;
    title: string;
    text: string;
    date: string;
    likes: number;
}

export class Microblog {
    array_post : Post[];
    
    constructor (postagens : Post[]){
        this.array_post = postagens;
    }

    create(post : Post) {
        this.array_post.push(post);
        console.log("Post adcionado");
    }
    
    retrieve(id : number){
        //let indice = -1;
        let post = this.array_post.find(post => post.id == id)
        if (post) {
            return post;
        }
        throw new PostError ('The post dont exist')
        
    }

    update(post: Post) {
        let old_post = this.retrieve(post.id);
        this.array_post[old_post.id] = post;
    }

    delete(id: number) {
        let deletedPost = this.retrieve(id);
        for (let i = deletedPost.id; i < this.array_post.length; i++){
            this.array_post[i] = this.array_post[i+1];
        }
        this.array_post.pop();
    }

    get retrieveAll() {
        return this.array_post
    }
}

export const posts: Post[] = [
    { id: 0, title: 'Post 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique vestibulum ipsum. Sed rutrum consectetur condimentum.', date: '2022-01-01', likes: 5 },
    { id: 1, title: 'Post 2', text: 'Pellentesque auctor, ligula a rutrum eleifend, lectus nunc suscipit metus, ut finibus nisl lacus id justo.', date: '2022-02-15', likes: 3 },
    { id: 2, title: 'Post 3', text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras a gravida elit.', date: '2022-04-10', likes: 10 },
    { id: 3, title: 'Post 4', text: 'Integer a consectetur nisi, at tempor mauris. Aliquam erat volutpat.', date: '2022-06-20', likes: 2 },
    { id: 4, title: 'Post 5', text: 'Quisque nec dapibus metus. Aliquam pulvinar risus vitae dui finibus, at commodo erat fermentum.', date: '2022-08-05', likes: 8 },
    { id: 5, title: 'Post 6', text: 'Nulla facilisi. Duis condimentum venenatis diam, sit amet interdum leo eleifend vitae.', date: '2022-10-15', likes: 1 },
    { id: 6, title: 'Post 7', text: 'Sed commodo gravida aliquam. Cras pharetra, sem in dignissim dignissim, purus urna vulputate risus, a congue quam felis in purus.', date: '2022-12-25', likes: 7 },
    { id: 7, title: 'Post 8', text: 'Morbi fringilla enim vitae odio fermentum, ac dignissim nisi rutrum. Mauris euismod felis a nunc rutrum, id luctus lacus iaculis.', date: '2023-02-10', likes: 4 },
    { id: 8, title: 'Post 9', text: 'Etiam bibendum velit ligula, id maximus purus molestie nec. Sed auctor tortor vitae nisl dictum rhoncus.', date: '2023-04-01', likes: 6 },
    { id: 9, title: 'Post 10', text: 'Suspendisse vel fringilla lectus. Sed et leo non lacus feugiat venenatis eu id lacus.', date: '2023-06-15', likes: 9 },
    { id: 10, title: 'Post 11', text: 'Fusce vitae leo sed ex elementum tempor. Donec id purus semper, facilisis nunc non, cursus dui.', date: '2023-09-01', likes: 12 },
    { id: 11, title: 'Post 12', text: 'Nam congue auctor semper. Sed interdum sem et nisi dignissim consectetur', date: '2023-09-01', likes: 20},
    { id: 12, title: 'Post 12', text: 'Nam congue auctor semper. Sed interdum sem et nisi dignissim consectetur.', date: '2023-12-10', likes: 5 },
    { id: 13, title: 'Post 13', text: 'Curabitur ut tellus sem. Vestibulum et velit id orci finibus feugiat. Phasellus ele', date: '2024-02-20', likes: 3 },
    { id: 14, title: 'Post 14', text: 'Duis aliquam ultrices feugiat. Donec pharetra iaculis mauris id cursus.', date: '2024-05-01', likes: 7 },
    { id: 15, title: 'Post 15', text: 'Proin scelerisque felis ligula, sed suscipit arcu aliquam vitae. Curabitur accumsan tellus in enim dapibus, at placerat diam tristique.', date: '2024-07-15', likes: 9 },
    { id: 16, title: 'Post 16', text: 'Sed ac ante et eros tincidunt lacinia. Ut consequat, mi id viverra finibus, ligula velit semper mi, ac fringilla lacus libero at lectus.', date: '2024-10-01', likes: 2 },
    { id: 17, title: 'Post 17', text: 'Vivamus ut quam ut sem convallis luctus. Suspendisse dapibus justo nec ante luctus ullamcorper.', date: '2024-12-10', likes: 6 },
    { id: 18, title: 'Post 18', text: 'Praesent vehicula gravida nisi in congue. In ac tellus vitae enim rhoncus rhoncus.', date: '2025-02-28', likes: 4 },
    { id: 19, title: 'Post 19', text: 'Fusce ut vestibulum dolor, sit amet eleifend ligula. Curabitur nec velit ex.', date: '2025-05-10', likes: 8 },
    { id: 20, title: 'Post 20', text: 'Nulla at ligula eu eros ultrices congue et sed nisi. Nulla malesuada ipsum ac varius consequat.', date: '2025-08-01', likes: 3 },
];

export const MyBlog: Microblog = new Microblog(posts);