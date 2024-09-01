"use client";
import React from "react";
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
import useFormRegister from "./form-register-hooks";

const FormRegister = () => {
  const { form, onSubmit, isLoading } = useFormRegister();

  return (
    <Form {...form}>
      <form
        action={}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password..." type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* confirm password field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="confirm password..."
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* submit button */}
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormRegister;
