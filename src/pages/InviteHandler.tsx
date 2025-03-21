import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function InviteHandler() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [emailExists, setEmailExists] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const token = searchParams.get("token");

  useEffect(() => {
    // In a real app, this would be an API call to validate the token
    // and check if the invited email exists in the system
    const checkInvite = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo, we'll pretend the company name is fetched from the token
        setCompanyName("Demo Company");

        // For demo, we'll randomly decide if the email exists
        setEmailExists(Math.random() > 0.5);

        setLoading(false);
      } catch (error) {
        console.error("Error checking invite:", error);
        navigate("/");
      }
    };

    if (token) {
      checkInvite();
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  // const handleAcceptInvite = async () => {
  //   try {
  //     // In a real app, this would be an API call to accept the invitation
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     navigate("/dashboard/worker");
  //   } catch (error) {
  //     console.error("Error accepting invite:", error);
  //   }
  // };

  if (loading) {
    return (
      <AuthLayout
        title="Checking Invitation"
        description="Please wait while we verify your invitation"
        type="register"
      >
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={`Join ${companyName}`}
      description={emailExists ? "Welcome back!" : "Complete your registration"}
      type="register"
    >
      <div className="space-y-6">
        {emailExists ? (
          <>
            <p className="text-sm text-gray-600">
              It looks like you already have an account with us. Please log in
              to accept the invitation.
            </p>
            <div className="space-y-4">
              <Link
                to={`/login?redirect=${encodeURIComponent(
                  `/invite?token=${token}`
                )}`}
                className="btn btn-primary w-full"
              >
                Log in to Accept
              </Link>
              <button
                onClick={() => navigate("/")}
                className="btn btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              You've been invited to join {companyName}. Complete your
              registration to get started.
            </p>
            <div className="space-y-4">
              <Link
                to={`/register?token=${token}&type=worker`}
                className="btn btn-primary w-full block text-center"
              >
                Complete Registration
              </Link>
              <button
                onClick={() => navigate("/")}
                className="btn btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
