import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Home />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
