import SuspenseWrapper from "@/app/SuspenseWrapper";
import * as React from "react";

interface IVerifyEmailPageProps {
  children: React.ReactNode;
}

const VerifyEmailPage: React.FunctionComponent<IVerifyEmailPageProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export default VerifyEmailPage;
