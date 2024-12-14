"use client";

import { useState } from "react";
import { AuthFlow } from "../types";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";

export function AuthScreen() {
  const [flow, setFlow] = useState<AuthFlow>(AuthFlow.signIn);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-1/2 md:h-auto md:w-max[500px]">
        {flow == AuthFlow.signIn && <SignInForm setFlow={setFlow} />}
        {flow == AuthFlow.signUp && <SignUpForm setFlow={setFlow} />}
      </div>
    </div>
  );
}
