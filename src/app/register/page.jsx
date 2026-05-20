"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const image = formData.get("image");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      toast.error("Name, Email, and Password are required!");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: image || "",
        callbackURL: "/",
      });

      if (data) {
        toast.success("Account created successfully!");
        router.push("/");
      }

      if (error) {
        toast.error(error.message || "Registration failed!");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin + "/",
      });
    } catch (err) {
      toast.error("Google Sign-In failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <div className="text-center my-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Create Account
        </h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Join IdeaVault to validate and track projects
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md border border-neutral-200 p-8 shadow-sm rounded-none bg-white flex flex-col gap-5">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-800">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired
              name="name"
              type="text"
              placeholder="Enter your name"
              variant="bordered"
              radius="none"
              className="w-full"
            />
          </div>

          {/* Image URL Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-800">
              Image URL
            </label>
            <Input
              name="image"
              type="url"
              placeholder="Image URL"
              variant="bordered"
              radius="none"
              className="w-full"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-800">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired
              name="email"
              type="email"
              placeholder="john@example.com"
              variant="bordered"
              radius="none"
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-800">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired
              name="password"
              type="password"
              placeholder="Enter your password"
              variant="bordered"
              radius="none"
              className="w-full"
            />
            <p className="text-xs text-neutral-400 mt-1">
              Must be at least 8 characters with 1 uppercase and 1 number
            </p>
          </div>

          {/* Submit Button*/}
          <Button
            className="rounded-none w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold h-11 mt-2 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
            type="submit"
            isLoading={loading}
          >
            {!loading && <Check className="w-5 h-5" />}
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-1">
          <div className="flex-1 border-t border-neutral-200"></div>
          <span className="px-3 text-xs text-neutral-500 font-medium whitespace-nowrap">
            Or sign up with
          </span>
          <div className="flex-1 border-t border-neutral-200"></div>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          onClick={handleGoogleSignin}
          variant="bordered"
          className="w-full rounded-none border-neutral-200 hover:bg-neutral-50 h-11 font-medium text-neutral-800 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
        >
          <div className="pointer-events-none flex items-center justify-center gap-2">
            <FcGoogle className="w-5 h-5" />
            <span>Sign in with Google</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
