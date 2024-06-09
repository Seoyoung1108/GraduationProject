import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div style={{ backgroundColor: "#610b0b", width: "100vw" }}>
      <header style={{ width: "100vw" }}>
        <Header />
      </header>
      <main
        style={{
          paddingTop: "20px",
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </main>
      <footer style={{ width: "100vw" }}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
