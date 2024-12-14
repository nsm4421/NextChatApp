"use client";

import { useState } from "react";
import { AuthFlow } from "../types";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";

export function AuthScreen() {
  const [flow, setFlow] = useState<AuthFlow>(AuthFlow.signIn);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="md:h-auto md:w-max[500px]">
        {flow == AuthFlow.signIn && (
          <SignInForm
            setFlow={setFlow}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        {flow == AuthFlow.signUp && (
          <SignUpForm
            setFlow={setFlow}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </div>
  );
}
