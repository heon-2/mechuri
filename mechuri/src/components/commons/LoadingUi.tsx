import React from 'react';
export default function LoadingUi() {
  return (
    <div className="h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="h-[calc(100vh-4rem)] flex justify-center items-center">
        <div
          className="inline-block h-24 w-24 animate-spin rounded-full overflow-hidden border-4 border-solid border-red-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <img src="/images/logo.png" alt="Loading" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
