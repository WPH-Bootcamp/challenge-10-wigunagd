/**
 * Blog Types
 * 
 * TODO: Define types sesuai dengan response dari API
 * Contoh structure (sesuaikan dengan API response yang sebenarnya):
 */

export interface Author {
    id: number;
    name: string;
    email: string;
}

export interface BlogPost {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imageUrl: string;
    author: Author;
    createdAt: Date;
    likes: string;
    comments: string;
}

export interface BlogResponse{
    data?: BlogPost[];
    total?: number;
    limit?: number;
    page?: number;
    lastPage?: number;
}