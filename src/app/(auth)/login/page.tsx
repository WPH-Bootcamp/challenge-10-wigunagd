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
import { useState } from "react";
import { iconEye, iconEyeOff } from "../../../../public/asset/asset";
import { useSearchParams } from "next/navigation";
import { Field, FieldLabel } from "@/components/ui/field";

const Login = () => {
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect');

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passwd, setPasswd] = useState("");
    const [passwdValid, setPasswdValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

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

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-[360px] shadow-lg gap-5">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5">
                    <div className="grid gap-4">
                        <Label htmlFor="email">Email</Label>
                        <Field data-invalid={!emailValid}>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="pr-10  h-[48px] rounded-xl"
                                required
                                onChange={(e) => handleEmail(e.target.value)}
                                value={email}
                                aria-invalid={!emailValid}
                            />
                            {!emailValid && (<FieldLabel className="text-xs text-red-700" htmlFor="input-invalid">Email required</FieldLabel>)}
                        </Field>
                    </div>

                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Field data-invalid={!passwdValid}>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="pr-10  h-[48px] rounded-xl"
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
                            {!passwdValid && (<FieldLabel className="text-xs text-red-700" htmlFor="input-invalid">Password required</FieldLabel>)}
                        </Field>
                    </div>

                    <div className="grid gap-4">
                        <Button className="w-full rounded-full h-[48px]">Sign In</Button>
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