/**
 * Blog Types
 * 
 * TODO: Define types sesuai dengan response dari API
 * Contoh structure (sesuaikan dengan API response yang sebenarnya):
 */

// blog
export interface Author {
    id: number;
    name: string;
    email: string;
    headline: string;
    avatarUrl: string;
}

export interface BlogPost {
    id: number;
    title?: string;
    content?: string;
    tags?: string[];
    imageUrl?: string;
    author?: Author;
    createdAt?: Date;
    likes?: string;
    comments?: string;
}

export interface BlogResponse {
    data?: BlogPost[];
    total?: number;
    limit?: number;
    page?: number;
    lastPage?: number;
    query?: string;
}

// comment
export interface Author {
    id: number;
    name: string;
    username: string;
    headline: string;
    avatarUrl: string;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    author: Author;
}

export type CommentListResponse = Comment[];

// send comment
export interface CommentSendBody {
    postId: number;
    content: string;
}

export interface CommentAuthor {
  id: number;
  name: string;
  email: string;
}

export interface CommentPost {
  id: number;
}

export interface CommentSendResponse {
  id: number;
  content: string;
  author: CommentAuthor;
  post: CommentPost;
  createdAt: string;
}