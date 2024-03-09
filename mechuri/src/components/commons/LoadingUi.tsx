import React from 'react';
export default function LoadingUi() {
  return (
    <div className="h-[calc(100vh-4rem)] flex justify-center items-center">
      {/* <span className="flex justify-center items-center loading loading-spinner text-accent h-48"></span> */}
      <div
        className="inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
}
