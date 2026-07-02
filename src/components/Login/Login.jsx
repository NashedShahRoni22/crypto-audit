"use client";
import Image from "next/image";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import usePostMutation from "@/hooks/usePostMutation";
import Loader from "../shared/Loader/Loader";
const badges = [
  "Products",
  "Categories",
  "Countries",
  "Delivery Charges",
  "Bank Info",
  "Orders",
];

export default function Login() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = usePostMutation({
    endpoint: "/login",
    isTokenRequired: false,
  });

  const handleLogin = async (data) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data?.success) {
          const token = data?.data?.token;

          localStorage.setItem("token", token);

          toast.success(data?.message || "Login successful");
          router.push("/dashboard/products");
        } else {
          toast.error(data?.message || "Something went wrong");
        }
      },

      onError: (error) => {
        toast.error(error?.message || "Something went wrong");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col-reverse gap-20 lg:gap-0 lg:flex-row">
      <div className="flex items-center lg:h-screen w-full bg-brand overflow-hidden flex-col justify-between lg:p-12 px-5 py-12">
        <div className=" flex-1 flex flex-col justify-center max-w-lg">
          <p className="text-gray-300 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Admin Panel
          </p>
          <h1 className="text-white text-3xl w-full lg:text-5xl font-bold leading-[1.12] mb-6">
            Run BITSS Your Way
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            From products to payments, categories to countries — everything you
            need to keep BITSS moving.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {badges.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 cursor-pointer"
              >
                <span className="text-white text-sm text-center font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f5f5f5] flex items-center justify-center relative overflow-hidden px-5 lg:px-0">
        <div className="relative z-10 w-full max-w-100">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl  flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="BITSS Logo"
                width={100}
                height={100}
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h2 className=" text-3xl font-bold tracking-tight mb-1">
              Welcome Back
            </h2>
            <p className=" text-sm">Please log in to your account.</p>
          </div>

          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
            <div className="space-y-1.5">
              <Controller
                name="email"
                control={form.control}
                rules={{ required: "Provide an email address" }}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text-xs font-semibold tracking-widest uppercase">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="example@gmail.com"
                      className="h-11 rounded-xl transition-all "
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Controller
                name="password"
                control={form.control}
                rules={{ required: "Provide your password" }}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className=" text-xs font-semibold tracking-widest uppercase">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className=" h-11 rounded-xl transition-all"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Button
              type="submit"
              className="
                w-full h-11 mt-2 rounded-xl font-semibold text-sm tracking-wide bg-brand hover:bg-brand/90"
            >
              {isPending ? (
                <>
                  Logging
                  <Loader />
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
