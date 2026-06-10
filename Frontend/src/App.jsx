import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";
import Footer from "./components/Footer";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;