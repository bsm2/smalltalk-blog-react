import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Error from "./../components/Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300 text-center">
            Sign in to{" "}
            <Link
              to={"/"}
              className="ml-2 font-extrabold font-serif text-2xl tracking-tight bg-gradient-to-l from-gray-700 via-gray-600 to-gray-400 text-transparent bg-clip-text hover:text-gray-400 hover:bg-none hover:bg-clip-border transition-colors duration-300"
            >
              SmallTalk
            </Link>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="relative mt-3">
                <input
                  {...register("email", {
                    required: true,
                  })}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
                             border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 18a8 8 0 1 1 16 0H2Z" />
                  </svg>
                </span>
              </div>
              {errors.email?.type == "required" && (
                <Error message={"Email is required"} />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-3">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password cannot exceed 20 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Password must contain an uppercase letter, a number, and a special character",
                    },
                  })}
                  type="password"
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
                             border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 8V6a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1Zm2-2v2h6V6a3 3 0 1 0-6 0Z" />
                  </svg>
                </span>
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                    />
                  </svg>
                </span>
              </div>
              {errors.password && <Error message={errors.password?.message} />}
            </div>

            <button
              type="submit"
              className="btn w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>

        <div className="hidden md:flex w-1/2 justify-center">
          <img
            src="/illustration.webp"
            alt="Illustration"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
}
