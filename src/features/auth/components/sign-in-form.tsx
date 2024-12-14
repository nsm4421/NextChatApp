"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { AuthFlow } from "../types";
import { GithubSignInButton } from "./sign-in-button";

interface Props {
  setFlow: Dispatch<SetStateAction<AuthFlow>>;
}

export default function SignInForm({ setFlow }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNavigate = () => {
    setFlow(AuthFlow.signUp);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Card className="w-full h-full px-5 py-5">
      <CardHeader className="text-3xl font-bold p-0">Login</CardHeader>
      <CardDescription className="mt-3">Need to login</CardDescription>
      <CardContent className="w-full p-0 my-3">
        <form className="space-y-3 p-0 flex-col w-full">
          <Input
            value={email}
            onChange={handleEmail}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            value={password}
            onChange={handlePassword}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </form>
      </CardContent>

      <CardFooter className="p-0 flex flex-col gap-y-3">
        <GithubSignInButton />
        <div>
          <p
            className="text-blue-500 cursor-pointer text-sm"
            onClick={handleNavigate}
          >
            Create Account
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
