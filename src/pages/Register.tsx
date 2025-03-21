import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationType: "company", // or 'worker'
  });

  const token = searchParams.get("token");
  const isWorkerInvite = token && searchParams.get("type") === "worker";

  // Redirect if invalid worker registration attempt
  useEffect(() => {
    if (searchParams.get("type") === "worker" && !token) {
      navigate("/register", { replace: true });
    }
  }, [token, navigate, searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to register the user
    // For workers, you'd include the token in the request
    if (isWorkerInvite) {
      console.log("Registering worker with token:", token);
      navigate("/dashboard/worker");
    } else {
      console.log("Registration attempt with:", formData);
      navigate(
        formData.registrationType === "company"
          ? "/dashboard/employer"
          : "/dashboard/worker"
      );
    }
  };

  return (
    <AuthLayout
      title={
        isWorkerInvite ? "Complete Your Registration" : "Create your account"
      }
      description={
        isWorkerInvite
          ? "You've been invited to join as a worker"
          : "Already have an account?"
      }
      type="register"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isWorkerInvite && (
          <div>
            <label
              htmlFor="registrationType"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              I am registering as a
            </label>
            <div className="mt-2">
              <select
                id="registrationType"
                name="registrationType"
                value={formData.registrationType}
                onChange={handleChange}
                className="input"
              >
                <option value="company">Company/Employer</option>
                <option value="worker">Remote Worker</option>
              </select>
            </div>
          </div>
        )}

        {formData.registrationType === "company" && !isWorkerInvite && (
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company Name
            </label>
            <div className="mt-2">
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="input"
                placeholder="Your company name"
              />
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {isWorkerInvite ? "Full Name" : "Name"}
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Your name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-full">
            {isWorkerInvite ? "Complete Registration" : "Create Account"}
          </button>
        </div>

        {!isWorkerInvite && (
          <p className="mt-4 text-center text-sm text-gray-500">
            By clicking "Create Account", you agree to our{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
            >
              Privacy Policy
            </a>
            .
          </p>
        )}
      </form>
    </AuthLayout>
  );
}
