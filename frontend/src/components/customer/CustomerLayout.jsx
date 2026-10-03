import Navbar from "./Navbar";

function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {children}
      </main>
    </div>
  );
}

export default CustomerLayout;