import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Error from "./../components/Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { toast } from "react-toastify";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "../components/Password";

export default function Login() {
  const navigate = useNavigate();
  const schema = z
    .object({
      email: z.email().min(2, "Email is required."),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password cannot exceed 20 characters")
        .regex(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
        ),
    })
    .strict();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
    } catch (err) {
      toast.error("Invalid Credentials.");
      console.log(err.message);
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-4xl w-full flex flex-col-reverse md:flex-row items-center md:gap-10">
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

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="relative mt-3">
                <input
                  {...register("email")}
                  id="email"
                  name="email"
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
              {errors.email?.type == "invalid_format" && (
                <Error message={errors.email.message} />
              )}
            </div>

            <Password
              label="Password"
              name="password"
              placeholder="Enter password"
              error={errors.password?.message}
              register={register}
            />

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

        <div className="md:flex w-1/2 justify-center items-center">
          <img
            src="/illustration.webp"
            alt="Illustration"
            className="h-auto"
          />
        </div>
      </div>
    </div>
  );
}
