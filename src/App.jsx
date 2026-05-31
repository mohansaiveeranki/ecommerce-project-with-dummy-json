import React from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import PaginationCard from "./components/PaginationCard";

const App = () => {
  return (
    <div>
      <Navbar />
      <ProductCard />
      <PaginationCard />
      <h1 className="text-5xl font-bold underline text-blue-600 text-center mt-10">
        Tailwind works!
      </h1>
    </div>
  );
};

export default App;
