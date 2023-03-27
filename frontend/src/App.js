import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import { addToCart, remToCart } from "./redux/action";  // Used for learning react-redux
// import { useDispatch, useSelector } from "react-redux"; // Used for learning react-redux

function App() {
  // const data = useSelector((state) => state); // Used for learning react-redux
  // Used for learning react-redux
  // const dispatch = useDispatch();
  // const product = {
  //   name: "iPhone",
  //   type: "mobile",
  //   price: "10000",
  //   color: "black",
  // };

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          {/* Used for learning react-redux */}
          {/* <button className="btn " onClick={() => dispatch(addToCart(product))}>
            Add
          </button>
          <br />
          <button className="btn " onClick={() => dispatch(remToCart(product))}>
            Rem
          </button> */}
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
