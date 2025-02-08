import HeaderDashboard from "../components/header";

const stockPage = () => {
  return (
    <>
      <HeaderDashboard pagename="Stock Management" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0"></div>
    </>
  );
};

export default stockPage;
