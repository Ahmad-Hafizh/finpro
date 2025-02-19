import * as React from "react";

interface ISettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout: React.FunctionComponent<ISettingLayoutProps> = ({
  children,
}) => {
  return <div className="max-w-5xl py-24">{children}</div>;
};

export default SettingLayout;
