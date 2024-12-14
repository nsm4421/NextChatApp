"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

interface Props {
  provider: "google" | "github";
  label?: string;
}

export default function OAuthSignInButton({ provider, label }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn } = useAuthActions();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn(provider);
    } catch (error) {
      console.error(error);
      alert("sign in fails");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      size="lg"
      disabled={isLoading}
      onClick={handleSignIn}
    >
      {label || `Sign In With ${provider.toUpperCase()}`}
    </Button>
  );
}
