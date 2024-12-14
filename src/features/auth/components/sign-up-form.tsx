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
import { ChangeEvent, Dispatch, SetStateAction, use, useState } from "react";

import { AuthFlow } from "../types";

interface Props {
  setFlow: Dispatch<SetStateAction<AuthFlow>>;
}
export default function SignUpForm({ setFlow }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const handleNavigate = () => {
    setFlow(AuthFlow.signIn);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  return (
    <Card className="w-full h-full px-5 py-5">
      <CardHeader className="text-3xl font-bold p-0">Sign Up</CardHeader>
      <CardDescription className="mt-3">Complete Form</CardDescription>
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
          <Input
            value={passwordConfirm}
            onChange={handlePasswordConfirm}
            placeholder="Password Confirm"
            type="password"
            required
          />

          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </form>
      </CardContent>
      <CardFooter className="p-0">
        <p
          className="text-blue-500 cursor-pointer text-sm"
          onClick={handleNavigate}
        >
          Already have account?
        </p>
      </CardFooter>
    </Card>
  );
}
