'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useDoComment, useGetPostDetail, useGetPostDetailComment } from "./hooksDetail";
import { useParams } from "next/navigation";
import Image from "next/image";
import { iconComment, iconLike, tmpBlogimg, tmpProfilePicture } from "../../../../public/asset/asset";
import { formattedDate } from "@/lib/formatDate";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api";
import { useGetRecommendations } from "@/app/(homepagecontent)/hooksHomepageContents";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import BlogCard from "@/components/BlogCard";
import PostDetailSkeleton from "@/components/PostDetailSkeleton";
import PostCommentSkeleton from "@/components/PostCommentSkeleton";
import { useAppSelector } from "@/redux/3_redux";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



const Detail = () => {

  const params = useParams();
  const id = params?.id as string;

  const authState = useAppSelector((state) => state.auth);
  const meState = useAppSelector((state) => state.me);
  const isuser = (authState.accessToken !== "" && authState.isLoggedin);
  const [comment, setComment] = useState('');
  const [commentValid, setCommentValid] = useState(true);
  const [isDialogCommentOpen, setIsDialogCommentOpen] = useState(false);
  const { mutate, isPending } = useDoComment()

  const { data: dataPostDetail, isLoading: isLoadingPostDetail, isFetching: isFetchingPostDetail } = useGetPostDetail({ id: Number(id) });
  const { data: dataComments, isLoading: isLoadingComments, isFetching: isFetchingComments } = useGetPostDetailComment(Number(id));

  const {
    data: dataRecommendation,
    isLoading: isLoadingRecommendation,
    isFetching: isFetchingRecommendation
  } = useGetRecommendations({ page: 1, limit: 1 });

  const handleComment = (text: string) => {
    setComment(text);
    // sengaja always true untuk menghilangkan error message, nanti divalidasi saat send
    setCommentValid(true);
  }

  const sendComment = () => {
    const isCommentValid = comment.length > 0;
    setCommentValid(isCommentValid);

    if (isCommentValid) {
      if (dataPostDetail?.id && comment.length > 0) {
        mutate(
          {
            postId: dataPostDetail?.id, content: comment
          }, {
          onSuccess: () => {
            setComment('');
          }
        }
        );
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="container mt-20 mx-auto w-full max-w-360 py-2 grow">

        {
          (isLoadingPostDetail || isFetchingPostDetail) && (
            <PostDetailSkeleton />
          )
        }

        {
          (!isLoadingPostDetail && !isFetchingPostDetail) && (
            <div className="flex flex-col gap-3 w-full max-w-200 mx-auto my-5 px-5 md:px-0">
              <h1 className="text-3xl font-bold">{dataPostDetail?.title}</h1>
              <div className="flex flex-row flex-wrap gap-2">
                {
                  dataPostDetail?.tags?.map((tag) => (
                    <span key={tag} className="p-2 border rounded-lg">{tag}</span>
                  ))
                }
              </div>

              <div className="flex flex-row items-center gap-2 text-sm">
                <Image src={dataPostDetail?.author?.avatarUrl ?? tmpProfilePicture} width={40} height={40} alt="Profile-Img" className="rounded-full" />
                <b>{dataPostDetail?.author?.name ?? 'John Doe'}</b> &middot; {dataPostDetail?.createdAt && (<span>{formattedDate(dataPostDetail?.createdAt, 'DD MMMM YYYY')}</span>)}
              </div>

              <div className="flex flex-row items-center gap-5 text-sm border-t border-b py-5">
                <span className="flex items-center gap-2 text-sm">
                  <Image
                    src={iconLike}
                    width={20}
                    height={20}
                    alt="Icon Like"
                    className="shrink-0 object-contain"
                  />
                  {dataPostDetail?.likes}
                </span>

                <span className="flex items-center gap-2 text-sm">
                  <Image
                    src={iconComment}
                    width={20}
                    height={20}
                    alt="Icon Comment"
                    className="shrink-0 object-contain"
                  />
                  {dataPostDetail?.comments}
                </span>
              </div>

              <AspectRatio ratio={16 / 9}>
                <Image
                  src={dataPostDetail?.imageUrl ?? tmpBlogimg}
                  alt="Post Image"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </AspectRatio>

              <div className="flex w-full">
                <div dangerouslySetInnerHTML={{ __html: dataPostDetail?.content || "" }} />
              </div>

              {
                (isLoadingComments || isFetchingComments) && (
                  <PostCommentSkeleton />
                )
              }


              <div className="flex flex-col gap-5 border-t border-b py-5">
                <h3 className="text-xl font-bold">Comment ({dataComments?.length})</h3>

                {!isuser && (
                  <div className="flex gap-1 items-center">
                    Please
                    <Button variant={'link'} asChild className="font-bold underline p-0">
                      <a href={`/login?redirect=post/${id}`}>Login</a>
                    </Button>
                    or
                    <Button variant={'link'} asChild className="font-bold underline p-0">
                      <a href={`/register?redirect=post/${id}`}>Register</a>
                    </Button>
                    to write a comment
                  </div>
                )}

                {isuser && (
                  <div className="grid items-center w-full gap-2">
                    <div className="h-auto py-1 flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 border rounded-full overflow-hidden">
                        <Image src={meState.avatarUrl ?? tmpProfilePicture} alt="profile" />
                      </div>
                      <span className="font-semibold">{meState.name}</span>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                      <span className="font-semibold w-full">Give your Comments</span>
                      <Field data-invalid={!isDialogCommentOpen && !commentValid}>
                        <Textarea
                          value={!isDialogCommentOpen ? comment : ''}
                          onChange={(e) => handleComment(e.target.value)}
                          aria-invalid={!isDialogCommentOpen && !commentValid}
                          placeholder="Enter your comment"
                          className="h-35 w-full rounded-xl px-4 py-2" />
                        {(!isDialogCommentOpen && !commentValid) && (<FieldLabel className="text-xs colorerrormsg" htmlFor="input-invalid">Comment required</FieldLabel>)}
                      </Field>
                      <Button
                        disabled={!isDialogCommentOpen && isPending}
                        onClick={sendComment}
                        className="rounded-full w-full max-w-51 h-12 self-end">
                        {(!isDialogCommentOpen && isPending) && (<Spinner />)}
                        Send
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid w-full justify-start">

                  {dataComments && dataComments.length > 0 ? (
                    dataComments?.slice(0, 3).map((comment) => (
                      <div key={comment.id}
                        className="grid border-t py-3 text-sm gap-3">
                        <div className="flex gap-2 items-center">
                          <Image
                            src={comment.author.avatarUrl
                              ? `${API_BASE_URL}${comment.author.avatarUrl}`
                              : tmpProfilePicture
                            }
                            alt={comment.author.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div className="grid gap-2">
                            <b>{comment.author.name}</b>
                            <span>{comment.createdAt && (formattedDate(comment.createdAt, 'DD MMMM YYYY'))}</span>
                          </div>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground italic">
                      No comments yet. Be the first to share your thoughts!
                    </div>
                  )}

                  {(dataComments?.length ?? 0) > 0 && (
                    <div className="flex gap-1 items-center">
                      <Dialog open={isDialogCommentOpen} onOpenChange={() => setIsDialogCommentOpen(!isDialogCommentOpen)}>
                        <DialogTrigger asChild>
                          <Button variant="link" className="font-bold underline p-0">
                            See All Comments
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="md:max-w-[613px] md:max-h-[902px] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
                          <DialogHeader className="p-6 pb-2 flex-none">
                            <DialogTitle className="text-xl font-bold">
                              Comment({dataComments?.length || 0})
                            </DialogTitle>
                          </DialogHeader>

                          <div className="px-6 py-4 flex flex-col gap-3 border-b bg-white z-10 flex-none">
                            <span className="font-semibold text-sm">Give your Comments</span>
                            <Field data-invalid={!commentValid}>
                              <Textarea
                                value={comment}
                                onChange={(e) => handleComment(e.target.value)}
                                aria-invalid={!commentValid}
                                placeholder="Enter your comment"
                                className="h-35 w-full rounded-xl px-4 py-2" />
                              {!commentValid && (<FieldLabel className="text-xs colorerrormsg" htmlFor="input-invalid">Comment required</FieldLabel>)}
                            </Field>
                            <Button
                              disabled={isPending}
                              onClick={sendComment}
                              className="rounded-full w-full max-w-[180px] h-11 self-end"
                            >
                              {isPending && <Spinner className="mr-2" />}
                              Send
                            </Button>
                          </div>

                          <div
                            id="commentInDialog"
                            className="flex-1 overflow-y-auto px-6 no-scrollbar bg-gray-50/30"
                          >
                            {dataComments && dataComments.length > 0 ? (
                              dataComments?.map((comment) => (
                                <div key={comment.id}
                                  className="grid border-t py-3 text-sm gap-3">
                                  <div className="flex gap-2 items-center">
                                    <Image
                                      src={comment.author.avatarUrl
                                        ? `${API_BASE_URL}${comment.author.avatarUrl}`
                                        : tmpProfilePicture
                                      }
                                      alt={comment.author.name}
                                      width={40}
                                      height={40}
                                      className="rounded-full object-cover"
                                    />
                                    <div className="grid gap-2">
                                      <b>{comment.author.name}</b>
                                      <span>{comment.createdAt && (formattedDate(comment.createdAt, 'DD MMMM YYYY'))}</span>
                                    </div>
                                  </div>
                                  <p>{comment.content}</p>
                                </div>
                              ))
                            ) : (
                              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground italic">
                                No comments yet. Be the first to share your thoughts!
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col relative">
                <h3 className="text-xl font-bold">Another Post</h3>
                {
                  (isLoadingRecommendation || isFetchingRecommendation) ? (
                    <BlogCardSkeleton />
                  ) : (
                    dataRecommendation?.data?.map((post) => (
                      <BlogCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        tags={post.tags}
                        imageUrl={post.imageUrl}
                        author={post.author}
                        createdAt={post.createdAt}
                        likes={post.likes}
                        comments={post.comments}
                      />
                    ))
                  )
                }
              </div>

            </div>
          )
        }

      </main>
      <Footer />
    </div>
  );
}

export default Detail;