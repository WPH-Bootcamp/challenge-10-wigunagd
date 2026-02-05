export interface UserBase {
  id: number;
  name: string;
  headline: string;
  avatarUrl: string;
}

export type LikeAuthor = UserBase;
export type PostLikeList = LikeAuthor[];

export interface CommentAuthor extends UserBase {
  username: string;
}

export interface PostComment {
  id: number;
  content: string;
  createdAt: Date; 
  author: CommentAuthor;
}

export type PostCommentList = PostComment[];