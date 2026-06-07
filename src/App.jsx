import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";
import Footer from "./components/Footer";

import { CVProvider } from "./context/CVContext";

function App() {
  return (
    <CVProvider>
      <Navbar />
      <AppRouter />
      <Footer />
    </CVProvider>
  );
}

export default App;