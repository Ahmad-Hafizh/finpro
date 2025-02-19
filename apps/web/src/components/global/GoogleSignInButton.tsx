import React, { useActionState } from "react";
import { googleAuthenticate } from "@/actions/googleLogin";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

const GoogleSignInButton = () => {
  const [errorMsgGoogle, dispatchGoogle] = useActionState(
    googleAuthenticate,
    undefined,
  );

  return (
    <form className="mt-4 flex flex-col" action={dispatchGoogle}>
      <Button variant={"outline"}>
        <FaGoogle />
        Google
      </Button>
      <p>{errorMsgGoogle}</p>
    </form>
  );
};

export default GoogleSignInButton;
