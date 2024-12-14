"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export function GithubSignInButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn } = useAuthActions();

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("github");
    } catch (error) {
      console.error(error);
      alert("sign in with github fails");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      size="lg"
      disabled={isLoading}
      onClick={handleGithubSignIn}
    >
      Sign In With Github
    </Button>
  );
}
