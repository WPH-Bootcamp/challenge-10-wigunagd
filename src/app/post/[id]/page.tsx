'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useGetPostDetail, useGetPostDetailComment } from "./hooksDetail";
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


const Detail = () => {

  const params = useParams();
  const id = params?.id as string;

  const { data: dataPostDetail, isLoading: isLoadingPostDetail, isFetching: isFetchingPostDetail } = useGetPostDetail({ id: id?.toString() });
  const { data: dataComments, isLoading: isLoadingComments, isFetching: isFetchingComments } = useGetPostDetailComment(id);

  const {
    data: dataRecommendation,
    isLoading: isLoadingRecommendation,
    isFetching: isFetchingRecommendation
  } = useGetRecommendations({ page: 1, limit: 1 });

  console.log(dataPostDetail, 'dataPostDetail');
  console.log(dataComments, 'dataComments');

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="container mt-[80px] mx-auto w-full max-w-[1440px] py-2 flex-grow">

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
                    <span key={tag} className="p-2 border-1 rounded-lg">{tag}</span>
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

              {
                (!isLoadingComments && !isFetchingComments) && (
                  <div className="flex flex-col gap-5 border-t border-b py-5">
                    <h3 className="text-xl font-bold">Comment ({dataPostDetail?.likes})</h3>

                    <div className="flex gap-1 items-center">
                      Please
                      <Button variant={'link'} asChild className="font-bold underline p-0">
                        <a href="/login">Login</a>
                      </Button>
                      or
                      <Button variant={'link'} asChild className="font-bold underline p-0">
                        <a href="/register">Register</a>
                      </Button>
                      to write a comment
                    </div>

                    <div className="grid w-full justify-start">

                      {
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
                      }

                      {(dataComments?.length ?? 0) > 0 && (
                        <div className="flex gap-1 items-center">
                          <Button variant={'link'} className="font-bold underline p-0">
                            See All Comments
                          </Button>
                        </div>
                      )}

                    </div>

                  </div>
                )
              }



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