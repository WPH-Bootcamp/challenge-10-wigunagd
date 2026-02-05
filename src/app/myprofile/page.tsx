'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useGetMe } from "../(getme)/hooksGetMe";
import { useAppSelector } from "@/redux/3_redux";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { iconAddPicture, iconBlankDocument, iconEye, iconEyeOff, iconPageNext, iconPagePrevious, tmpProfilePicture } from "../../../public/asset/asset";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDoDelete, useDoDeleteComment, useDoUpdatePassword, useDoUpdateProfile, useGetComments, useGetLikes, useGetMyPosts } from "./hooksMyProfile";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import BlogCard from "@/components/BlogCard";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { BiLike } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/apiresponse";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import ButtonWriteNewPost from "./CommonComponentMyProfile";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import CommentCard from "@/components/CommentCard";


const MyProfile = () => {
    const authState = useAppSelector((state) => state.auth);
    const isuser = (authState.accessToken !== "" && authState.isLoggedin);
    const { data: dataMe, isLoading: isLoadingDataMe } = useGetMe({ enabled: isuser });
    const router = useRouter();

    useEffect(() => {
        if (authState.accessToken === "" || !authState.isLoggedin) {
            router.push('/login');
        }
    }, [authState.accessToken, authState.isLoggedin, router]);

    // posts
    const [isDialogStatisticOpen, setIsDialogStatisticOpen] = useState(false);
    const [idStatistic, setIdStatistic] = useState(0);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [idDelete, setIdDelete] = useState(0);
    const [isDialogDeleteCommentOpen, setIsDialogDeleteCommentOpen] = useState(false);
    const [idDeleteComment, setIdDeleteComment] = useState(0);
    const [pageQuery, setPageQuery] = useState(1);
    const {
        data: dataPosts,
        isLoading: isLoadingPosts,
        isFetching: isFetchingPosts
    } = useGetMyPosts({ page: pageQuery, limit: 10 });

    // variabel untuk pagination
    const maxPagePosts = dataPosts?.lastPage ?? 1;
    const p = pageQuery;
    const X = maxPagePosts;
    const n = 3;
    let start = Math.max(1, p - Math.floor(n / 2));
    const end = Math.min(X, start + n - 1);
    if (end === X) {
        start = Math.max(1, X - n + 1);
    }
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    // variabel untuk pagination

    const { data: dataLikes } = useGetLikes(idStatistic);
    const { data: dataComments } = useGetComments(idStatistic);

    const { mutate: mutateHapus, isPending: ispendingHapus } = useDoDelete();
    const { mutate: mutateHapusComment, isPending: ispendingHapusComment } = useDoDeleteComment();

    const handlePageNextPrev = (i: number) => {
        let valPageQuery = pageQuery + i;

        if (valPageQuery < 1) {
            valPageQuery = 1;
        }

        if (valPageQuery > maxPagePosts) {
            valPageQuery = maxPagePosts;
        }

        setPageQuery(valPageQuery);
    }

    const handlePage = (i: number) => {
        if (i !== pageQuery) {
            setPageQuery(Math.abs(i));
        }
    }

    const onStatistikClick = ({ id, openDialogStatisticParam }: { id: number, openDialogStatisticParam: boolean }) => {
        setIdStatistic(id);
        setIsDialogStatisticOpen(openDialogStatisticParam);
    }

    const onDeleteClick = ({ id, openDialogDeleteParam }: { id: number, openDialogDeleteParam: boolean }) => {
        setIdDelete(id);
        setIsDialogDeleteOpen(openDialogDeleteParam);
    }

    const handleDoDelete = () => {
        if (idDelete && idDelete > 0) {
            mutateHapus(idDelete, {
                onSuccess: () => {
                    toast.success('Berhasil menghapus', { position: "bottom-center" });
                    setIsDialogDeleteOpen(false);
                },
                onError: (e) => {
                    const error = e as AxiosError<ApiErrorResponse>;
                    const serverMessage = error.response?.data?.message || error.message;
                    toast.error(`Gagal menghapus. Status: ${serverMessage}`, { position: "bottom-center" })
                }
            });
        }
    }

    const handleDeleteComment = (idComment: number) => {
        setIdDeleteComment(idComment);
        setIsDialogDeleteCommentOpen(true);
    };

    const handleDoDeleteComment = () => {
        if (idDeleteComment && idDeleteComment > 0) {
            mutateHapusComment(idDeleteComment, {
                onSuccess: () => {
                    toast.success('Berhasil menghapus komentar', { position: "bottom-center" });
                    setIsDialogDeleteCommentOpen(false);
                },
                onError: (e) => {
                    const error = e as AxiosError<ApiErrorResponse>;
                    const serverMessage = error.response?.data?.message || error.message;
                    toast.error(`Gagal menghapus. Status: ${serverMessage}`, { position: "bottom-center" })
                }
            });
        }
    }

    const scrolltToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (!isFetchingPosts && !isLoadingPosts && dataPosts) {
            scrolltToTop();
        }
    }, [dataPosts, isFetchingPosts, isLoadingPosts]);
    // posts

    // change password
    const [currentPassword, setCurrentPassword] = useState("");
    const [currentPasswordValid, setCurrentPasswordValid] = useState(true);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordValid, setNewPasswordValid] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [confirmNewPasswordValid, setConfirmNewPasswordValid] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [updatePasswordGagal, setUpdatePasswordGagal] = useState(false);
    const [updatePasswordGagalMsg, setUpdatePasswordGagalMsg] = useState("");
    const { mutate: mutateGantiPassword, isPending: ispendingGantiPassword } = useDoUpdatePassword();

    const handleCurrentPasswordChange = (text: string) => {
        setCurrentPassword(text);
        setCurrentPasswordValid(text.length > 0);
    }

    const handleNewPasswordChange = (text: string) => {
        setNewPassword(text);
        setNewPasswordValid(text.length > 0);
    }

    const handleConfirmNewPasswordChange = (text: string) => {
        setConfirmNewPassword(text);
        setConfirmNewPasswordValid(text.length > 0);
    }

    const onChangePassword = () => {
        setUpdatePasswordGagal(false);
        setUpdatePasswordGagalMsg("");
        const varIsCurrentPasswordValid = currentPassword.length > 0;
        const varIsNewPasswordValid = newPassword.length > 0;
        const varIsConfirmNewPasswordValid = (confirmNewPassword.length > 0);

        setCurrentPasswordValid(varIsCurrentPasswordValid);
        setNewPasswordValid(varIsNewPasswordValid);
        setConfirmNewPasswordValid(varIsConfirmNewPasswordValid);

        if (newPassword !== confirmNewPassword) {
            setNewPasswordValid(false);
            setConfirmNewPasswordValid(false);
            setUpdatePasswordGagal(true);
            setUpdatePasswordGagalMsg("New password dan Confirm new password harus sama.");
            return;
        }

        if (varIsCurrentPasswordValid && varIsNewPasswordValid && varIsConfirmNewPasswordValid) {
            mutateGantiPassword({
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmPassword: confirmNewPassword,
            }, {
                onSuccess() {
                    toast.success('Password berhasil diganti.', { position: 'bottom-center' });
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');

                    setShowCurrentPassword(false);
                    setShowNewPassword(false);
                    setShowConfirmPassword(false);
                },
                onError(e) {
                    const error = e as AxiosError<ApiErrorResponse>;
                    const serverMessage = error.response?.data?.message || error.message;
                    setUpdatePasswordGagal(true);
                    setUpdatePasswordGagalMsg(`${serverMessage}`);
                }
            })
        } else {
            setUpdatePasswordGagal(true);
            setUpdatePasswordGagalMsg("Lengkapi data Current password, New password dan Confirm new password.");
        }
    }

    const handleOnChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        onChangePassword();
    }
    // change password

    // update profile
    const profileImageMaxSize = 5 * 1024 * 1024;
    const [isDialogUpdateProfileOpen, setIsDialogUpdateProfileOpen] = useState(false);
    const [name, setName] = useState(dataMe?.name ?? "");
    const [nameValid, setNameValid] = useState(true);
    const [headline, setHeadline] = useState(dataMe?.headline ?? "");
    const [headlineValid, setHeadlineValid] = useState(true);
    const [updateProfileErrMsg, setUpdateProfileErrMsg] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { mutate: mutateUpdateProfile, isPending: isPendingUpdateProfile } = useDoUpdateProfile();

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {

            if (file.size > profileImageMaxSize) {
                setUpdateProfileErrMsg("Gambar maximum 5MB");
            } else {
                setUpdateProfileErrMsg("");
            }

            setAvatar(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleName = (text: string) => {
        setName(text);
        setNameValid(text.length > 0);
    }

    const handleHeadline = (text: string) => {
        setHeadline(text);
        setHeadlineValid(text.length > 0);
    }

    const handleDialogUpdateProfileOpen = (b: boolean) => {
        setIsDialogUpdateProfileOpen(b);
        setName(dataMe?.name ?? "");
        setHeadline(dataMe?.headline ?? "");
    }

    const onUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateProfileErrMsg("");

        const isNameValid = name.trim().length > 0;
        const isHeadlineValid = headline.trim().length > 0;
        setNameValid(isNameValid);
        setHeadlineValid(isHeadlineValid);

        if (!isNameValid || !isHeadlineValid) {
            setUpdateProfileErrMsg("Lengkapi data Name dan Headline.");
            return;
        }

        if (avatar) {
            if (avatar.size > profileImageMaxSize) {
                setUpdateProfileErrMsg("Gambar maximum 5MB.");
                return;
            }
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("headline", headline);
        if (avatar) {
            formData.append("avatar", avatar);
        }


        mutateUpdateProfile(formData, {
            onSuccess() {
                toast.success('Profile berhasil diperbarui.', { position: "bottom-center" });
                setIsDialogUpdateProfileOpen(false);
                setAvatar(null);
                setPreviewUrl(null);
            },
            onError(e) {
                const error = e as AxiosError<ApiErrorResponse>;
                const serverMessage = error.response?.data?.message || error.message;
                setUpdateProfileErrMsg(serverMessage);
            }
        });
    };
    // update profile

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="container mt-20 mx-auto w-full max-w-360 py-2 grow">
                {isuser && (
                    <div className="flex flex-col w-full max-w-200 mx-auto my-5 px-5 md:px-0 gap-5">
                        <Card>
                            <CardContent className="flex flex-row items-center gap-3">
                                {isLoadingDataMe && (
                                    <ProfileSkeleton />
                                )}

                                {!isLoadingDataMe && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center w-3/4">
                                            <div className="flex flex-col items-center justify-center w-20 h-20 border rounded-full overflow-hidden">
                                                <Image src={dataMe?.avatarUrl ?? tmpProfilePicture} alt="profile" width={80} height={80} className="w-20 h-20" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold">{dataMe?.name}</span>
                                                <span className="text-md">{dataMe?.headline ?? '-'}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center justify-end w-1/4">
                                            <Button onClick={() => handleDialogUpdateProfileOpen(true)} variant='link' className="font-semibold underline">
                                                Edit Profile
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Tabs defaultValue="yourpost" className="w-full">
                            <TabsList className="bg-transparent h-auto p-0 flex gap-4 border-b-2">
                                <TabsTrigger value="yourpost" asChild>
                                    <Button
                                        variant="tabs"
                                        className=" 
                                        rounded-none
                                        h-11
                                        w-44.25
                                        data-[state=active]:shadow-none 
                                        data-[state=active]:border-b-3 
                                        data-[state=active]:border-b-primary 
                                        data-[state=active]:text-primary
                                        "
                                    >
                                        Your Post
                                    </Button>
                                </TabsTrigger>
                                <TabsTrigger value="changepassword" asChild>
                                    <Button
                                        variant="tabs"
                                        className=" 
                                        rounded-none
                                        h-11
                                        w-44.25
                                        data-[state=active]:shadow-none 
                                        data-[state=active]:border-b-3 
                                        data-[state=active]:border-b-primary 
                                        data-[state=active]:text-primary
                                        "
                                    >
                                        Change Password
                                    </Button>
                                </TabsTrigger>

                            </TabsList>

                            <TabsContent value="yourpost" className="mt-6">
                                {(isLoadingPosts || isLoadingDataMe) && (
                                    <BlogCardSkeleton />
                                )}

                                {!isLoadingPosts && !isLoadingDataMe && (dataPosts?.data?.length ?? 0) < 1 && (
                                    <div className="w-full flex flex-col relative items-center text-center mt-[55.5px] md:px-0 px-16 gap-4">
                                        <Image src={iconBlankDocument} width={118} height={135} alt="No Result" />
                                        <b className="text-sm">Your writing journey starts here</b>
                                        <p className="text-sm">No posts yet, but every great writer starts with the first one.</p>
                                        <ButtonWriteNewPost
                                            className="w-full max-w-[182] h-11"
                                        />
                                    </div>
                                )}

                                {!isLoadingPosts && (dataPosts?.data?.length ?? 0) > 0 && (
                                    <div className="w-full flex flex-col relative">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold">{dataPosts?.data?.length ?? 0} Post</span>
                                            <ButtonWriteNewPost
                                                className="w-full max-w-[182] h-11"
                                            />
                                        </div>
                                        {
                                            dataPosts?.data?.map((post) => (
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
                                                    action
                                                    onStatistikClick={(id: number) => onStatistikClick({ id, openDialogStatisticParam: true })}
                                                    onDeleteClick={(id: number) => onDeleteClick({ id, openDialogDeleteParam: true })}
                                                />
                                            ))
                                        }
                                    </div>
                                )}

                                {(maxPagePosts > 1) && (
                                    <div id="pagination"
                                        className={`flex flex-row w-full justify-center items-center my-2 gap-2 
                                        ${isFetchingPosts ? 'opacity-50 pointer-events-none' : ''}`}>

                                        <Button
                                            disabled={pageQuery === 1}
                                            onClick={() => handlePageNextPrev(-1)}
                                            variant={'ghost'} className="flex">
                                            <Image src={iconPagePrevious} alt="Icon Page Previous" /> Previous
                                        </Button>

                                        <div className="flex items-center gap-2">
                                            {start > 1 && (
                                                <span className="bg-transparent px-1">...</span>
                                            )}

                                            {pages.map((pageNum) => (
                                                <Button
                                                    key={pageNum}
                                                    onClick={() => handlePage(pageNum)}
                                                    variant={p === pageNum ? 'default' : 'ghost'}
                                                    className="rounded-full w-12 h-12"
                                                >
                                                    {pageNum}
                                                </Button>
                                            ))}

                                            {end < X && (
                                                <span className="bg-transparent px-1">...</span>
                                            )}
                                        </div>

                                        <Button
                                            disabled={pageQuery === maxPagePosts}
                                            onClick={() => handlePageNextPrev(1)}
                                            variant={'ghost'} className="flex">
                                            Next <Image src={iconPageNext} alt="Icon Next Previous" />
                                        </Button>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="changepassword" className="mt-6">
                                <div className="w-full max-w-134.5 flex flex-col gap-5 py-2 ">
                                    <form method="POST" onSubmit={handleOnChangePassword} className="grid gap-5">
                                        <div className="grid gap-4">
                                            <Label htmlFor="currentPassword" className="text-sm">Current Password</Label>
                                            <Field data-invalid={!currentPasswordValid}>
                                                <div className="relative">
                                                    <Input
                                                        id="currentPassword"
                                                        type={showCurrentPassword ? "text" : "password"}
                                                        placeholder="Enter current password"
                                                        className="pr-10 h-12 rounded-xl text-sm"
                                                        value={currentPassword}
                                                        onChange={(e) => handleCurrentPasswordChange(e.target.value)}
                                                        aria-invalid={!currentPasswordValid}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                                                    >
                                                        <Image src={showCurrentPassword ? iconEyeOff : iconEye} alt="toggle" width={20} height={20} />
                                                    </button>
                                                </div>
                                                {!currentPasswordValid && (<FieldLabel className="text-xs colorerrormsg">Current password required</FieldLabel>)}
                                            </Field>
                                        </div>

                                        <div className="grid gap-4">
                                            <Label htmlFor="newPassword" className="text-sm">New Password</Label>
                                            <Field data-invalid={!newPasswordValid}>
                                                <div className="relative">
                                                    <Input
                                                        id="newPassword"
                                                        type={showNewPassword ? "text" : "password"}
                                                        placeholder="Enter new password"
                                                        className="pr-10 h-12 rounded-xl text-sm"
                                                        value={newPassword}
                                                        onChange={(e) => handleNewPasswordChange(e.target.value)}
                                                        aria-invalid={!newPasswordValid}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                                                    >
                                                        <Image src={showNewPassword ? iconEyeOff : iconEye} alt="toggle" width={20} height={20} />
                                                    </button>
                                                </div>
                                                {!newPasswordValid && (<FieldLabel className="text-xs colorerrormsg">New password required</FieldLabel>)}
                                            </Field>
                                        </div>

                                        <div className="grid gap-4">
                                            <Label htmlFor="confirmPassword" className="text-sm">Confirm New Password</Label>
                                            <Field data-invalid={!confirmNewPasswordValid}>
                                                <div className="relative">
                                                    <Input
                                                        id="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Enter confirm new password"
                                                        className="pr-10 h-12 rounded-xl text-sm"
                                                        value={confirmNewPassword}
                                                        onChange={(e) => handleConfirmNewPasswordChange(e.target.value)}
                                                        aria-invalid={!confirmNewPasswordValid}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                                                    >
                                                        <Image src={showConfirmPassword ? iconEyeOff : iconEye} alt="toggle" width={20} height={20} />
                                                    </button>
                                                </div>
                                                {!confirmNewPasswordValid && (<FieldLabel className="text-xs colorerrormsg">Confirm new password required</FieldLabel>)}
                                            </Field>
                                        </div>

                                        <div className="grid gap-4 pt-2">
                                            {updatePasswordGagal && (<FieldLabel className="text-xs colorerrormsg">{updatePasswordGagalMsg}</FieldLabel>)}
                                            <Button
                                                disabled={ispendingGantiPassword}
                                                onClick={onChangePassword}
                                                type="submit"
                                                className="w-full px-10 rounded-full h-12 text-sm"
                                            >
                                                {ispendingGantiPassword && (<Spinner />)}
                                                Update Password
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                )}

                <Dialog open={isDialogStatisticOpen} onOpenChange={() => setIsDialogStatisticOpen(!isDialogStatisticOpen)}>
                    <DialogContent className="md:max-w-153.25 md:max-h-225.5 min-h-[50vh] flex flex-col p-0 gap-0 overflow-hidden">
                        <DialogHeader className="px-6 h-16 flex flex-row items-center justify-between flex-none ">
                            <DialogTitle className="text-xl font-bold">
                                Statistic
                            </DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="liketab" className="w-full px-5">
                            <TabsList className="bg-transparent h-auto p-0 flex gap-4 border-b-2 w-full">
                                <TabsTrigger value="liketab" asChild>
                                    <Button
                                        variant="tabs"
                                        className=" 
                                        rounded-none
                                        h-11
                                        w-44.25
                                        data-[state=active]:shadow-none 
                                        data-[state=active]:border-b-3 
                                        data-[state=active]:border-b-primary 
                                        data-[state=active]:text-primary
                                        "
                                    >
                                        <BiLike />
                                        Like
                                    </Button>
                                </TabsTrigger>
                                <TabsTrigger value="commenttab" asChild>
                                    <Button
                                        variant="tabs"
                                        className=" 
                                        rounded-none
                                        h-11
                                        w-44.25
                                        data-[state=active]:shadow-none 
                                        data-[state=active]:border-b-3 
                                        data-[state=active]:border-b-primary 
                                        data-[state=active]:text-primary
                                        "
                                    >
                                        <VscComment />
                                        Comment
                                    </Button>
                                </TabsTrigger>

                            </TabsList>

                            <TabsContent value="liketab" className="mt-6 flex flex-col gap-2">
                                <span className="text-lg font-bold">Like ({dataLikes?.length ?? 0})</span>
                                <div className="flex flex-col gap-2">
                                    {
                                        dataLikes?.map((likes, i) => (
                                            <div key={i} className={`flex flex-row py-3 gap-3 ${i < (dataLikes.length - 1) ? 'border-b' : ''}`}>
                                                <Image src={likes.avatarUrl ?? tmpProfilePicture} alt={likes.name} width={48} height={48} className="w-12 h-12 rounded-full" />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-semibold">{likes.name}</span>
                                                    <span className="text-sm">{likes.headline}</span>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </TabsContent>

                            <TabsContent value="commenttab" className="mt-6 flex flex-col gap-3">
                                <span className="text-lg font-bold">Comment ({dataComments?.length ?? 0})</span>
                                <div className="flex flex-col gap-2 border-b">
                                    {
                                        dataComments?.map((comment, i) => (
                                            <div key={i} className="flex flex-col ">
                                                <CommentCard
                                                    action={(idDeleteComment: number) => handleDeleteComment(idDeleteComment)}
                                                    id={comment.id}
                                                    author={comment.author}
                                                    createdAt={comment.createdAt}
                                                    content={comment.content}
                                                />

                                            </div>
                                        ))
                                    }
                                </div>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>

                <Dialog open={isDialogDeleteOpen} onOpenChange={() => setIsDialogDeleteOpen(!isDialogDeleteOpen)}>
                    <DialogContent className="md:max-w-134.25 flex flex-col gap-4 overflow-hidden rounded-3xl p-3">
                        <DialogHeader className="px-6 h-16 flex flex-row items-center justify-between flex-none ">
                            <DialogTitle className="text-xl font-bold">
                                Delete
                            </DialogTitle>
                        </DialogHeader>
                        <p className="mx-6">Are you sure to delete?</p>
                        <DialogFooter className="flex flex-row justify-end px-6">
                            <Button 
                            onClick={() => setIsDialogDeleteOpen(false)}
                            variant={'ghost'} className="rounded-full text-sm w-full md:max-w-30 max-w-[156.5px] h-12">Cancel</Button>
                            <Button
                                disabled={ispendingHapus}
                                onClick={handleDoDelete}
                                className="rounded-full text-sm font-semibold bg-danger w-full md:max-w-42.75 max-w-[156.5px] h-12">
                                {ispendingHapus && (<Spinner />)}
                                Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isDialogDeleteCommentOpen} onOpenChange={() => setIsDialogDeleteCommentOpen(!isDialogDeleteCommentOpen)}>
                    <DialogContent className="md:max-w-134.25 flex flex-col gap-4 overflow-hidden rounded-3xl p-3">
                        <DialogHeader className="px-6 h-16 flex flex-row items-center justify-between flex-none ">
                            <DialogTitle className="text-xl font-bold">
                                Delete Comment
                            </DialogTitle>
                        </DialogHeader>
                        <p className="mx-6">Are you sure to delete comment?</p>
                        <DialogFooter className="flex flex-row justify-end px-6">
                            <Button 
                            onClick={() => setIsDialogDeleteCommentOpen(false)}
                            variant={'ghost'} className="rounded-full text-sm w-full md:max-w-30 max-w-[156.5px] h-12">Cancel</Button>
                            <Button
                                disabled={ispendingHapusComment}
                                onClick={handleDoDeleteComment}
                                className="rounded-full text-sm font-semibold bg-danger w-full md:max-w-42.75 max-w-[156.5px] h-12">
                                {ispendingHapusComment && (<Spinner />)}
                                Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isDialogUpdateProfileOpen}
                    onOpenChange={() => setIsDialogUpdateProfileOpen(!isDialogUpdateProfileOpen)}>
                    <DialogContent className="w-[92%] md:w-full max-w-112.75 flex flex-col p-0 gap-0"
                        onOpenAutoFocus={(e) => {
                            e.preventDefault();
                            document.getElementById("imagetoedit")?.focus();
                        }}
                    >
                        <DialogHeader className="px-6 h-16 flex flex-row items-center justify-between flex-none">
                            <DialogTitle className="text-xl font-bold">
                                Edit Profile
                            </DialogTitle>
                        </DialogHeader>
                        <div className="w-full flex flex-col gap-5 px-6 pb-6">
                            <form method="POST" onSubmit={onUpdateProfile} className="grid gap-5">
                                <div className="relative flex w-20 h-20 mx-auto">
                                    <div className="flex flex-col items-center justify-center w-20 h-20 border rounded-full overflow-hidden mx-auto">
                                        <Image
                                            onClick={handleImageClick}
                                            id="imagetoedit"
                                            src={previewUrl || dataMe?.avatarUrl || tmpProfilePicture}
                                            alt="profile"
                                            priority
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 cursor-pointer" />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <Button
                                        asChild
                                        type="button"
                                        onClick={handleImageClick}
                                        className="absolute -right-4 -bottom-5 cursor-pointer w-15 h-15"
                                        variant={'transparent'}>
                                        <Link href="#">
                                            <Image src={iconAddPicture} alt="add picture" width={24} height={24} />
                                        </Link>
                                    </Button>
                                </div>
                                <div className="grid gap-4">
                                    <Label htmlFor="name" className="text-sm">Name</Label>
                                    <Field data-invalid={!nameValid}>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your name"
                                            className="pr-10 h-12 rounded-xl text-sm"
                                            required
                                            onChange={(e) => handleName(e.target.value)}
                                            value={name}
                                            aria-invalid={!nameValid}
                                        />
                                        {!nameValid && (<FieldLabel className="text-xs colorerrormsg" >Name required</FieldLabel>)}
                                    </Field>
                                </div>

                                <div className="grid gap-4">
                                    <Label htmlFor="headline" className="text-sm">Profile Headline</Label>
                                    <Field data-invalid={!headlineValid}>
                                        <Input
                                            id="headline"
                                            type="text"
                                            placeholder="Enter your headline"
                                            className="pr-10 h-12 rounded-xl text-sm"
                                            required
                                            onChange={(e) => handleHeadline(e.target.value)}
                                            value={headline}
                                            aria-invalid={!headlineValid}
                                        />
                                        {!headlineValid && (<FieldLabel className="text-xs colorerrormsg" >Headline required</FieldLabel>)}
                                    </Field>
                                </div>

                                <div className="grid gap-4">
                                    {updateProfileErrMsg.length > 0 && (<FieldLabel className="text-xs colorerrormsg" >{updateProfileErrMsg}</FieldLabel>)}
                                    <Button
                                        disabled={isPendingUpdateProfile}
                                        onClick={onUpdateProfile}
                                        className="w-full rounded-full h-12 text-sm">
                                        {isPendingUpdateProfile && (<Spinner />)}
                                        Update Profile</Button>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>

            </main>
            <Footer />
        </div>
    );
}

export default MyProfile;
