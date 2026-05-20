"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Input, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  useEffect(() => {
    if (!isSessionLoading && session) {
      router.push("/");
    }
  }, [session, isSessionLoading, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("Email and Password are required!");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (data) {
        toast.success("Logged in successfully!");
        router.push("/");
      }

      if (error) {
        toast.error(error.message || "Invalid email or password!");
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

  if (isSessionLoading || session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Spinner color="cyan" size="lg" radius="none" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="text-center my-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Welcome Back
        </h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Log in to IdeaVault to manage your projects
        </p>
      </div>

      <div className="w-full max-w-md border border-neutral-200 p-8 shadow-sm rounded-none bg-white flex flex-col gap-5">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
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
          </div>

          <Button
            className="rounded-none w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold h-11 mt-2 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
            type="submit"
            isLoading={loading}
          >
            {!loading && <Check className="w-5 h-5" />}
            Log In
          </Button>
        </form>

        <div className="flex items-center my-1">
          <div className="flex-1 border-t border-neutral-200"></div>
          <span className="px-3 text-xs text-neutral-500 font-medium whitespace-nowrap">
            Or continue with
          </span>
          <div className="flex-1 border-t border-neutral-200"></div>
        </div>

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

        <p className="text-center text-sm text-neutral-500 mt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-cyan-600 font-semibold hover:underline cursor-pointer"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
