"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

interface Props {
  label?: string;
  size?: "sm" | "lg";
}

export default function SignOutButton(props: Props) {
  const { signOut } = useAuthActions();
  const { label, ...buttonProps } = props;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
      alert("sign out fails");
    }
  };

  return (
    <Button onClick={handleSignOut} {...buttonProps}>
      {props.label || "Sign Out"}
    </Button>
  );
}
