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
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function AuthScreen() {
  const { signIn } = useAuthActions();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignInWithOAuth = (provider: "google" | "github") => async () => {
    try {
      setIsLoading(true);
      toast.success("login success!");
      await signIn(provider);
    } catch (error) {
      console.error(error);
      toast.success(`sign up with ${provider} fails`);
    } finally {
      setIsLoading(false);
    }
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
