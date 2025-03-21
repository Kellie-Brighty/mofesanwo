import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  type: "login" | "register";
}

export default function AuthLayout({
  children,
  title,
  description,
  type,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              {description}{" "}
              {type === "login" ? (
                <Link
                  to="/register"
                  className="font-semibold text-primary-600 hover:text-primary-500"
                >
                  Create an account
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="font-semibold text-primary-600 hover:text-primary-500"
                >
                  Sign in to your account
                </Link>
              )}
            </p>
          </div>

          <div className="mt-10">{children}</div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
