"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

export function AuthScreen() {
  const { signIn } = useAuthActions();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignInWithOAuth = (provider: "google" | "github") => async () => {
    try {
      setIsLoading(true);
      await signIn(provider);
    } catch (error) {
      console.error(error);
      setError(`sign up with ${provider} fails`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearError = () => {
    setError("");
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="md:h-auto md:w-max[500px]">
        <Card className="w-full h-full px-5 py-5">
          <CardHeader className="text-3xl font-bold p-0">
            Authentiacation
          </CardHeader>
          <CardDescription className="my-3">
            you can login with google or github account
          </CardDescription>
          {error && (
            <div
              onClick={handleClearError}
              className="bg-destructive/10 rounded-md flex items-center text-sm mx-3 px-3 py-2 my-2 gap-x-3"
            >
              <TriangleAlert className="size-3" />
              {error}
            </div>
          )}

          <Separator className="my-3" />

          <CardContent className="p-0 flex flex-col">
            <ul className="w-full flex flex-col gap-y-3">
              <li>
                <Button
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                  onClick={handleSignInWithOAuth("github")}
                >
                  <FaGithub />
                  <span>Sign In With Github</span>
                </Button>
              </li>
              <li>
                <Button
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                  onClick={handleSignInWithOAuth("google")}
                >
                  <FaGoogle />
                  <span>Sign In With Google</span>
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
