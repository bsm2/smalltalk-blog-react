import { useForm } from "react-hook-form";
import Error from "../components/Error";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import Password from "./../components/Password";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const navigate = useNavigate();
  const schema = z
    .object({
      name: z.string().min(3).max("10"),
      email: z.string().email().min(2, "Email is required."),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password cannot exceed 20 characters")
        .regex(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
        ),
      confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    })
    .strict();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      console.log(user);

      await updateProfile(user, {
        displayName: data.name,
      });

      await set(ref(db, "users/" + user.uid), {
        name: data.name,
        email: data.email,
        createdAt: Date.now(),
      });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 md:my-0">
      <div className="max-w-7xl w-full flex flex-col-reverse items-center justify-center md:flex-row gap-1 md:gap-30">
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300 text-center">
            Sign up to{" "}
            <Link
              to={"/"}
              className="ml-2 font-extrabold font-serif text-2xl tracking-tight bg-gradient-to-l from-gray-700 via-gray-600 to-gray-400 text-transparent bg-clip-text hover:text-gray-400 hover:bg-none hover:bg-clip-border transition-colors duration-300"
            >
              SmallTalk
            </Link>
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="md:mt-6 mt-2 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <div className="relative mt-3">
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Enter name"
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
              {errors.name?.type == "too_small" && (
                <Error message={"Name is required"} />
              )}
              {errors.name?.type == "too_big" && (
                <Error message={"Chars should be less than 10"} />
              )}
            </div>
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
              {errors.email?.type == "invalid_format" && (
                <Error message={errors.email?.message} />
              )}
            </div>

            <Password
              id="password"
              label="Password"
              name="password"
              placeholder="Enter password"
              error={errors.password?.message}
              register={register}
            />
            <Password
              id="confirmPassword"
              label="Confirm Password"
              register={register}
              name="confirmPassword"
              placeholder="Confirm password"
              error={errors.confirmPassword?.message}
            />

            <button
              type="submit"
              className="btn w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
            >
              Sign up
            </button>
          </form>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="pt-10 md:ml-0 md:flex md:w-1/2 items-center justify-center self-center">
          <img
            src="/illustration.webp"
            alt="Illustration"
            className="w-30 md:w-full"
          />
        </div>
      </div>
    </div>
  );
}
