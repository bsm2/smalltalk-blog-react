import React from "react";

export default function Error(props) {
  const { message } = props;
  return (
    <>
      <p
        role="alert"
        className="m-1 text-sm text-red-600 dark:text-red-400 font-medium"
      >
        {message}
      </p>
    </>
  );
}
