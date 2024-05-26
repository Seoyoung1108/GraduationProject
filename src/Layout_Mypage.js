import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Layout_Mypage = () => {
  return (
    <div style={{ backgroundColor: "#610b0b" }}>
      <header style={{ width: "100vw" }}>
        <Header />
      </header>
      <main
        style={{
          paddingTop: "20px",
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Navbar />
        <Outlet />
      </main>
      <footer style={{ width: "100vw" }}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout_Mypage;
