import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import ErrorPage from "./pages/error-page";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Products from "./pages/Products";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex h-screen">
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
