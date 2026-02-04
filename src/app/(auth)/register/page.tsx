'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { iconEye, iconEyeOff } from "../../../../public/asset/asset";
import { useSearchParams } from "next/navigation";
import { Field, FieldLabel } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/3_redux";
import { useDoRegister } from "./hooksRegister";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ApiErrorResponse } from "@/types/apiresponse";
import { AxiosError } from "axios";

const Register = () => {
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect');
    const destination = redirectPath
        ? `/${redirectPath}`
        : '/';

    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(true);
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passwd, setPasswd] = useState("");
    const [passwdValid, setPasswdValid] = useState(true);
    const [confirmpasswd, setConfirmPasswd] = useState("");
    const [confirmpasswdValid, setConfirmPasswdValid] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const router = useRouter();
    const authState = useAppSelector((state) => state.auth);
    const { mutate, isPending } = useDoRegister();

    const handleName = (text: string) => {
        setName(text);
        setNameValid(text.length > 0);
    }

    const handleEmail = (text: string) => {
        setEmail(text);
        setEmailValid(text.length > 0);
    }

    const handlePassword = (text: string) => {
        setPasswd(text);
        setPasswdValid(text.length > 0);
    }

    const handleConfirmPassword = (text: string) => {
        setConfirmPasswd(text);
        setConfirmPasswdValid(text.length > 0);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordConfirmVisibility = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const onRegister = () => {

        setErrorMsg("");
        const isNameValid = name.length > 0;
        const isEmailValid = email.length > 0;
        const isPasswdValid = passwd.length > 0;
        const isConfirmValid = confirmpasswd.length > 0;
        const passwordsMatch = passwd === confirmpasswd;

        setNameValid(isNameValid);
        setEmailValid(isEmailValid);
        setPasswdValid(isPasswdValid);
        setConfirmPasswdValid(isConfirmValid);

        if (!passwordsMatch) {
            setErrorMsg("Password dan confirm password tidak cocok");
            return;
        }

        if (isNameValid && isEmailValid && isPasswdValid && passwordsMatch) {
            mutate({
                name: name,
                username: name,
                email: email,
                password: passwd
            }, {
                onSuccess: () => {
                    toast.success("Registrasi berhasil", { position: "bottom-center" });
                    setName('');
                    setEmail('');
                    setPasswd('');
                    setConfirmPasswd('');
                },
                onError: (e) => {
                    const error = e as AxiosError<ApiErrorResponse>;
                    const backendMessage = error.response?.data?.message;
                    setErrorMsg(backendMessage ?? "Periksa kembali data Anda.");
                }
            })
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister();
    }

    useEffect(() => {
        if (authState.accessToken !== "" && authState.isLoggedin) {
            router.push(destination);
        }
    }, [authState.accessToken, authState.isLoggedin, destination, router]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-90 shadow-lg gap-5">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5">
                    <form method="POST" onSubmit={handleSubmit} className="grid gap-5">
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
                                {!nameValid && (<FieldLabel className="text-xs colorerrormsg">Name required</FieldLabel>)}
                            </Field>

                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="email" className="text-sm">Email</Label>
                            <Field data-invalid={!emailValid}>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pr-10 h-12 rounded-xl text-sm"
                                    required
                                    onChange={(e) => handleEmail(e.target.value)}
                                    value={email}
                                    aria-invalid={!emailValid}
                                />
                                {!emailValid && (<FieldLabel className="text-xs colorerrormsg">Email required</FieldLabel>)}
                            </Field>
                        </div>

                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm">Password</Label>
                            </div>

                            <Field data-invalid={!passwdValid}>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="pr-10 h-12 rounded-xl text-sm"
                                        required
                                        onChange={(e) => handlePassword(e.target.value)}
                                        value={passwd}
                                        aria-invalid={!passwdValid}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none hover:opacity-70 transition-opacity"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        <Image
                                            src={showPassword ? iconEyeOff : iconEye}
                                            alt="Toggle Visibility"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </div>
                                {!passwdValid && (<FieldLabel className="text-xs colorerrormsg">Password required</FieldLabel>)}
                            </Field>

                        </div>


                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="passwordconfirm" className="text-sm">Confirm Password</Label>
                            </div>
                            <Field data-invalid={!confirmpasswdValid}>
                                <div className="relative">
                                    <Input
                                        id="passwordconfirm"
                                        type={showPasswordConfirm ? "text" : "password"}
                                        placeholder="Enter your confirm password"
                                        className="pr-10 h-12 rounded-xl text-sm"
                                        required
                                        onChange={(e) => handleConfirmPassword(e.target.value)}
                                        value={confirmpasswd}
                                        aria-invalid={!confirmpasswdValid}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordConfirmVisibility}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none hover:opacity-70 transition-opacity"
                                        aria-label={showPasswordConfirm ? "Hide password" : "Show password"}
                                    >
                                        <Image
                                            src={showPasswordConfirm ? iconEyeOff : iconEye}
                                            alt="Toggle Visibility"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </div>
                                {!confirmpasswdValid && (<FieldLabel className="text-xs colorerrormsg">Confirm password required</FieldLabel>)}
                            </Field>


                        </div>

                        <div className="grid gap-4">
                            <Button
                                disabled={isPending}
                                onClick={onRegister}
                                className="w-full rounded-full h-12 text-sm">{isPending && (<Spinner />)} Sign Up</Button>
                            {errorMsg !== '' && (
                                <span className="text-sm colorerrormsg text-center">{errorMsg}</span>
                            )}
                            <div className="text-sm text-center text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    href={`/login${redirectPath ? (`?redirect=${redirectPath}`) : ('')}`}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}

export default Register;