"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { PAGES } from "@/global/routes";
import CardWrapper from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schemas";

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
import { login } from "@/actions/login";
import { AUTH_ERRORS } from "@/global/constant-msgs";

type Props = {};

function LoginForm({}: Props) {
  const [isPending, startTransition] = useTransition();
  const authErrorMessage = useSearchParams().get("error");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    AUTH_ERRORS[authErrorMessage as keyof typeof AUTH_ERRORS] || undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");

    startTransition(() => {
      login(values).then((data) => {
        setErrorMessage(data.error);
        setSuccessMessage(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backbuttonLabel="Don't have an account?"
      backButtonHref={PAGES.REGISTER}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* email */}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}

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
          </div>
          <FormError
            message={errorMessage}
            isResendAllowed={errorMessage === AUTH_ERRORS.AccessDenied}
          />
          <FormSuccess message={successMessage} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
