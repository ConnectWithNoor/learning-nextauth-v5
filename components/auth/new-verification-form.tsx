"use client";

import React, { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import CardWrapper from "@/components/auth/card-wrapper";
import { PAGES } from "@/global/routes";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyTokenAction } from "@/actions/verification";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";

type Props = {};

function NewVerificationForm({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isTokenCBCalled = useRef<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const cb = async () => {
      setIsLoading(true);
      isTokenCBCalled.current = true;
      const token = searchParams.get("token");
      if (!token) {
        setErrorMessage("Redirecting to login...");
        const clearTimeOut = setTimeout(() => {
          router.push(PAGES.LOGIN);
        }, 2000);

        setIsLoading(false);
        return () => clearTimeout(clearTimeOut);
      }

      //  call the API to verify the token
      const results = await verifyTokenAction(token);
      setErrorMessage(results?.error);
      setSuccessMessage(results?.success);
      setIsLoading(false);

      const clearTimeOut = setTimeout(() => {
        router.push(PAGES.LOGIN);
      }, 2000);

      return () => clearTimeout(clearTimeOut);
    };

    if (!isTokenCBCalled.current) {
      //   this is to prevent react strict mode on development
      //  from calling the API multiple times
      // not sure if this will happen in production, just it's a safety measure

      cb();
    }
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref={PAGES.LOGIN}
      backbuttonLabel="Back to login"
    >
      <div className="flex items-center justify-center w-full">
        {isLoading && <BeatLoader />}
        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />
      </div>
    </CardWrapper>
  );
}

export default NewVerificationForm;
