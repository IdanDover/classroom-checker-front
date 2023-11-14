import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="grid w-screen h-screen grid-rows-[auto_1fr_auto] mx-auto max-w-sm md:max-w-6xl bg-gray-100 dark:bg-gray-800 ">
      <Header />
      <main className="max-w-sm mx-auto overflow-scroll md:max-w-4xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
