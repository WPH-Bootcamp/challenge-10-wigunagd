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
import { useDoLogin } from "./hooksLogin";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/3_redux";
import { toast } from "sonner";

const Login = () => {
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect');
    const destination = redirectPath
        ? `/${redirectPath}`
        : '/';

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passwd, setPasswd] = useState("");
    const [passwdValid, setPasswdValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const authState = useAppSelector((state) => state.auth);
    const { mutate, isPending } = useDoLogin();

    const handleEmail = (text: string) => {
        setEmail(text);
        setEmailValid(text.length > 0);
    }

    const handlePassword = (text: string) => {
        setPasswd(text);
        setPasswdValid(text.length > 0);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onLogin = () => {
        const isEmailValid = email.length > 0;
        const isPasswdValid = passwd.length > 0;

        setEmailValid(isEmailValid);
        setPasswdValid(isPasswdValid);

        if (isEmailValid && isPasswdValid) {
            mutate({
                email: email,
                password: passwd
            }, {
                onSuccess: () => {
                    router.push(destination);
                },
                onError: () => {
                    toast.error('Login gagal, periksa kembali email dan password');
                }
            })
        }
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
                    <CardTitle className="text-xl font-bold">Sign In</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5">
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
                            {!emailValid && (<FieldLabel className="text-xs colorerrormsg" htmlFor="input-invalid">Email required</FieldLabel>)}
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
                            {!passwdValid && (<FieldLabel className="text-xs colorerrormsg" htmlFor="input-invalid">Password required</FieldLabel>)}
                        </Field>
                    </div>

                    <div className="grid gap-4">
                        <Button
                            disabled={isPending}
                            onClick={onLogin}
                            className="w-full rounded-full h-12 text-sm">{isPending && (<Spinner />)} Sign In</Button>
                        <div className="text-sm text-center text-muted-foreground">
                            Don`t have an account?{" "}
                            <Link
                                href={`/register${redirectPath ? (`?redirect=${redirectPath}`) : ('')}`}
                                className="text-primary font-semibold hover:underline"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

export default Login;