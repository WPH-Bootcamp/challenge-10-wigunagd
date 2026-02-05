'use client'

import Footer from "@/components/Footer";
import { useAppSelector } from "@/redux/3_redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NavigationWriteEdit from "@/components/NavigationWriteEdit";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { iconArrowExport, iconSelectUpload, iconTrash } from "../../../../public/asset/asset";
import { Badge } from "@/components/ui/badge";
import RichTextEditor from "@/components/RichTextEditor";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/apiresponse";
import { useGetPostDetail } from "@/app/detail/[id]/hooksDetail";
import { WritePostSkeleton } from "@/components/WritePostSkeleton";
import { Textarea } from "@/components/ui/textarea";
import { useDoEditPost } from "./hooksEditPost";

const EditPost = () => {
    const authState = useAppSelector((state) => state.auth);
    const meState = useAppSelector((state) => state.me);
    const isuser = (authState.accessToken !== "" && authState.isLoggedin);
    const router = useRouter();

    useEffect(() => {
        if (!isuser) {
            router.push('/login');
            return;
        }
    }, [isuser, router]);

    const params = useParams();
    const id = params?.id as string;
    const { data: dataPostDetail, isLoading: isLoadingPostDetail } = useGetPostDetail({ id: Number(id) });

    console.log(dataPostDetail);

    // redirect jika bukan post owner
    useEffect(() => {
        if (!isLoadingPostDetail && dataPostDetail) {
            if (dataPostDetail.author?.id !== meState.id) {
                router.push('/myprofile');
                return;
            }
        }
    }, [dataPostDetail, isLoadingPostDetail, meState.id, router]);

    const [postTitle, setPostTitle] = useState(dataPostDetail?.title ?? "");
    const [postContent, setPostContent] = useState(dataPostDetail?.content ?? "");
    const [postTags, setPostTags] = useState<string[]>(dataPostDetail?.tags ?? []);
    const [previewUrl, setPreviewUrl] = useState<string | null>(dataPostDetail?.imageUrl ?? null);


    const [tagInputValue, setTagInputValue] = useState("");
    const [postTitleValid, setPostTitleValid] = useState(true);
    const [postContentValid, setPostContentValid] = useState(true);
    const [postTagsValid, setPostTagsValid] = useState(true);
    const [removeImage, setRemoveImage] = useState(false);
    const [sendPostErrMsg, setSendPostErrMsg] = useState("");


    const profileImageMaxSize = 5 * 1024 * 1024;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [postImage, setPostImage] = useState<File | null>(null);

    // Inside EditPost component
    useEffect(() => {
        if (dataPostDetail) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPostTitle(dataPostDetail.title ?? "");
            setPostContent(dataPostDetail.content ?? "");
            setPostTags(dataPostDetail.tags ?? []);
            setPreviewUrl(dataPostDetail.imageUrl ?? null);
        }
    }, [dataPostDetail]); // Only fires when dataPostDetail arrives or changes

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleClearImageClick = () => {
        setPreviewUrl(null);
        setRemoveImage(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {

            if (file.size > profileImageMaxSize) {
                setSendPostErrMsg("Gambar maximum 5MB");
            } else {
                setSendPostErrMsg("");
            }

            setPostImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInputValue) {
            e.preventDefault();
            if (!postTags.includes(tagInputValue?.trim())) {
                setPostTags([...postTags, tagInputValue?.trim()]);
                setPostTagsValid(true);
            }
            setTagInputValue("");
        }

        else if (e.key === "Backspace" && (tagInputValue ?? "") === "" && postTags.length > 0) {
            e.preventDefault();
            const updatedTags = [...postTags];
            updatedTags.pop();
            setPostTags(updatedTags);
        }
    };

    const removeTag = (tagToRemove: string) => {
        setPostTags(postTags.filter((tag) => tag !== tagToRemove));
    };

    const { mutate: mutateEditPost, isPending: isPendingEditPost } = useDoEditPost();

    const onSubmitPost = (e: React.FormEvent) => {
        e.preventDefault();
        setSendPostErrMsg("");

        const isPostTitleValid = (postTitle?.length ?? 0) > 0;
        const isPostContentValid = (postContent?.length ?? 0) > 0;
        const isPostTagsValid = postTags.length > 0;
        setPostTitleValid(isPostTitleValid);
        setPostContentValid(isPostContentValid);
        setPostTagsValid(isPostTagsValid);

        if (!isPostTitleValid || !isPostContentValid || !isPostTagsValid) {
            setSendPostErrMsg("Lengkapi data Title, Content dan Tags.");
            return;
        }

        if (postImage) {
            if (postImage.size > profileImageMaxSize) {
                setSendPostErrMsg("Gambar maximum 5MB.");
                return;
            }
        }



        const formData = new FormData();
        formData.append("title", postTitle ?? "");
        formData.append("content", postContent ?? "");
        postTags.forEach((tag) => {
            formData.append("tags", tag);
        });
        if (postImage) {
            formData.append("image", postImage);
        } else {
            if (removeImage) {
                formData.append("removeImage", "1");
            }
        }

        const postId = Number(id);

        mutateEditPost({ id: postId, formdata: formData }, {
            onSuccess(response) {
                toast.success('Post berhasil disimpan.', { position: "bottom-center" });
                router.push(`/detail/${response.id}`);
            },
            onError(e) {
                const error = e as AxiosError<ApiErrorResponse>;
                const serverMessage = error.response?.data?.message || error.message;
                setSendPostErrMsg(serverMessage);
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <NavigationWriteEdit title="Edit Post" />
            <main className="container mt-20 mx-auto w-full max-w-360 py-2 grow">
                <div className="flex flex-col w-full max-w-200 mx-auto my-5 px-5 md:px-0 gap-5">

                    {isLoadingPostDetail && (
                        <WritePostSkeleton />
                    )}

                    {!isLoadingPostDetail && dataPostDetail && (

                        <form
                            key={dataPostDetail.id}
                            method="POST"
                            onSubmit={onSubmitPost}
                            className="grid gap-5">

                            <div className="grid gap-4">
                                <Label htmlFor="postTitle" className="text-sm">Title</Label>
                                <Field data-invalid={!postTitleValid}>
                                    <Input
                                        id="postTitle"
                                        type="text"
                                        placeholder="Enter your title"
                                        className="pr-10 h-12 rounded-xl text-sm"
                                        value={postTitle}
                                        onChange={(e) => setPostTitle(e.target.value)}
                                        aria-invalid={!postTitleValid}
                                    />
                                    {!postTitleValid && (<FieldLabel className="text-xs colorerrormsg" >Title required</FieldLabel>)}
                                </Field>
                            </div>

                            <div className="grid gap-4">
                                <Label htmlFor="postContent" className="text-sm">Content</Label>
                                <div>
                                    <RichTextEditor
                                        id="richtextareainput"
                                        content={postContent}
                                        onChange={(html) => {
                                            setPostContent(html);
                                            setPostContentValid(html.length > 7);
                                        }}
                                    />
                                    {!postContentValid && (<FieldLabel className="text-xs colorerrormsg" >Content required</FieldLabel>)}
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <Label htmlFor="postTags" className="text-sm">Cover Image</Label>
                                <Field data-invalid={!postTagsValid}>
                                    <div className="flex flex-col bg-neutral-50 gap-3 w-full border border-dashed rounded-2xl p-4 items-center">
                                        <div
                                            className="w-full max-w-[529px] overflow-hidden flex items-center justify-center bg-gray-50 rounded-lg cursor-pointer"
                                            onClick={handleImageClick}
                                        >
                                            {previewUrl ? (
                                                <Image
                                                    key={previewUrl}
                                                    src={previewUrl}
                                                    alt="Selected preview"
                                                    width={800}
                                                    height={600}
                                                    className="w-full h-full object-contain animate-in fade-in duration-300"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2">
                                                    <Image
                                                        src={iconSelectUpload}
                                                        alt="Upload icon"
                                                        width={40}
                                                        height={40}
                                                        className="w-10 h-10 object-contain opacity-50"
                                                    />

                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            {!previewUrl && (
                                                <Button
                                                    asChild
                                                    type="button"
                                                    onClick={handleImageClick}
                                                    className="w-15 h-15"
                                                    variant={'link'}>
                                                    <Link href="#">
                                                        Click to upload
                                                    </Link>
                                                </Button>
                                            )}

                                            {previewUrl && (
                                                <div className="flex flex-row gap-2">
                                                    <Button type="button" variant={'outline'} className="text-sm" onClick={handleImageClick}>
                                                        <Image src={iconArrowExport} width={20} height={20} alt="icon trash" />
                                                        Change Image
                                                    </Button>
                                                    <Button type="button" variant={'outline'} className="colorerrormsg text-sm" onClick={handleClearImageClick}>
                                                        <Image src={iconTrash} width={20} height={20} alt="icon trash" />
                                                        Delete Image
                                                    </Button>
                                                </div>
                                            )}
                                            <span className="text-xs">PNG or JPG  (max. 5mb)</span>
                                        </div>
                                    </div>

                                    {!postTagsValid && (<FieldLabel className="text-xs colorerrormsg" >Image required</FieldLabel>)}
                                </Field>
                            </div>

                            <div className="grid gap-4">
                                <Label htmlFor="postTags" className="text-sm">Tags</Label>
                                <Field data-invalid={!postTagsValid}>
                                    <div className="flex flex-wrap items-center gap-2 p-2 border rounded-xl min-h-12 bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                                        {postTags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm font-normal rounded-lg border flex items-center gap-1">
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="ml-1 hover:text-danger transition-colors"
                                                >
                                                    x
                                                </button>
                                            </Badge>
                                        ))}
                                        <input
                                            id="postTags"
                                            type="text"
                                            value={tagInputValue}
                                            onChange={(e) => setTagInputValue(e.target.value)}
                                            onKeyDown={handleTagKeyDown}
                                            placeholder={postTags.length === 0 ? "Enter your tags and press Enter" : ""}
                                            className="flex-1 bg-transparent outline-none text-sm min-w-[120px] h-8"
                                        />
                                    </div>
                                    {!postTagsValid && (<FieldLabel className="text-xs colorerrormsg" >Tags required</FieldLabel>)}
                                </Field>
                            </div>

                            <div className="flex flex-col items-end">
                                {sendPostErrMsg.length > 0 && (<FieldLabel className="text-xs colorerrormsg w-full" >{sendPostErrMsg}</FieldLabel>)}
                                <Button
                                    disabled={isPendingEditPost}
                                    type="submit"
                                    className="w-full md:max-w-66.25 rounded-full h-12 text-sm">
                                    {isPendingEditPost && (<Spinner />)}
                                    Finish
                                </Button>
                            </div>
                        </form>
                    )}

                </div>
            </main>
            <Footer />
        </div>
    );
}

export default EditPost;

