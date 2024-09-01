"use client";
import { useToast } from "@/hooks/use-toast";
import { RegisterDataT } from "@/types/model/register-controller.types";
import {
  EMAIL_VALIDATOR,
  ERRORS,
  LENGTH_VALIDATOR,
} from "@/utils/zod.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: LENGTH_VALIDATOR(3),
    email: EMAIL_VALIDATOR(),
    password: LENGTH_VALIDATOR(4),
    confirmPassword: LENGTH_VALIDATOR(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERRORS.PASSWORD_MISSMATCH,
    path: ["confirmPassword"],
  });

const useFormRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const requestData: RegisterDataT = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          description: result.message,
          duration: 3000,
        });
        localStorage.setItem("token", result.token);
        router.push("/");
        console.log(result);
      } else {
        toast({
          description: result.error,
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
    console.log(values);
  };

  return { form, onSubmit, isLoading };
};

export default useFormRegister;
