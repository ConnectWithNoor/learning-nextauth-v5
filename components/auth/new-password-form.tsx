"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { PAGES } from "@/global/routes";
import CardWrapper from "@/components/auth/card-wrapper";
import { newPasswordSchema } from "@/schemas";
import { newPasswordAction } from "@/actions/forget-password";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import { verifyNewActionToken } from "@/actions/forget-password";

type Props = {};

function NewPasswordForm({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    "Validating token..."
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const isTokenCBCalled = useRef<boolean>(false);

  useEffect(() => {
    const verifyForgetPasswordToken = async () => {
      isTokenCBCalled.current = true;
      // check if token exists in query params
      const token = searchParams.get("token");
      if (!token) {
        setErrorMessage("Redirecting to login...");
        const clearTimeOut = setTimeout(() => {
          router.push(PAGES.LOGIN);
        }, 2000);

        return () => clearTimeout(clearTimeOut);
      }

      // check if it is a valid token
      const tokenVerified = await verifyNewActionToken(token);

      if (tokenVerified?.error) {
        setErrorMessage(tokenVerified?.error);
        const clearTimeOut = setTimeout(() => {
          router.push(PAGES.LOGIN);
        }, 2000);

        return () => clearTimeout(clearTimeOut);
      }

      setIsTokenValid(true);
      setErrorMessage(undefined);
    };

    if (!isTokenCBCalled.current) {
      //   this is to prevent react strict mode on development
      //  from calling the API multiple times
      // not sure if this will happen in production, just it's a safety measure

      verifyForgetPasswordToken();
    }
  }, []);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    const token = searchParams.get("token")!;
    setErrorMessage("");
    setSuccessMessage("");
    startTransition(() => {
      newPasswordAction(token, values)
        .then((data) => {
          setSuccessMessage(data?.success);
        })
        .catch((error) => {
          setErrorMessage(error?.message);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password?"
      backbuttonLabel="Back to login"
      backButtonHref={PAGES.LOGIN}
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* email */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !isTokenValid}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default NewPasswordForm;
