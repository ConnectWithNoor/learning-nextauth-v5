"use client";
import { UpdateSettingsAction } from "@/actions/user-settings";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import { userSettingsSchema } from "@/schemas";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { updateSession } from "@/packages/nextauth/auth";

type Props = {};

function SettingsPage({}: Props) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  const currentUser = useSession();

  const handleFormSubmit = (values: z.infer<typeof userSettingsSchema>) => {
    startTransition(() => {
      UpdateSettingsAction(values)
        .then((data) => {
          setErrorMessage(data?.error);
          setSuccessMessage(data?.success);
        })
        .catch((error) => setErrorMessage(error));
    });
  };

  const form = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: currentUser?.data?.user?.name || undefined,
    },
  });

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Name"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormError message={errorMessage} />
            <FormSuccess message={successMessage} />
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SettingsPage;
