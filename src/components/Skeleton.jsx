import React from "react";

export default function Skeleton() {
  return (
    <div className="min-h-screen pt-10 md:pt-5 md:m-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ol className="relative  border-s border-gray-200 dark:border-gray-700 m-10">
        {[...Array(3)].map((_, i) => (
          <li className="mb-10 ms-4 animate-pulse" key={i}>
            <div className="absolute w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900"></div>

            <time className="mb-1 block h-3 w-28 bg-gray-300 dark:bg-gray-600 rounded"></time>

            <div className="flex flex-col md:flex-row gap-4 mt-3">
              <div className="w-60 h-40 bg-gray-300 dark:bg-gray-600 rounded-xl shadow-lg"></div>

              <div className="mt-3 md:m-5 flex flex-col flex-1">
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                  {/* <div className="flex gap-2">
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div> */}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
