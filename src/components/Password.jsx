import React, { useState } from "react";
import Error from "./Error";

export default function Password(props) {
  const [show, setShow] = useState(false);
  const { error, register, name, placeholder, label } = props;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative mt-3">
        <input
          {...register(name)}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
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
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
        >
          {!show ? (
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          )}
        </button>
      </div>
      {error && <Error message={error} />}
    </div>
  );
}
