import React from "react";
import { SpinnerDotted } from "spinners-react";

const Loading = () => {
  return (
    <>
      <div className="h-screen grid place-content-center">
        <SpinnerDotted size={50} thickness={100} speed={100} color="#36ad47" />
      </div>
    </>
  );
};

export default Loading;
