import * as React from "react";
// import SidePanel from "./SidePanel";

interface ISettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout: React.FunctionComponent<ISettingLayoutProps> = ({
  children,
}) => {
  return (
    <div className="flex max-w-6xl gap-4 py-24">
      {/* <SidePanel /> */}
      {children}
    </div>
  );
};

export default SettingLayout;
