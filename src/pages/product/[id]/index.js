import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { productImageMapping } from "@/components/productsImageMapping";
const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const handleBackButtonClick=()=>{
    router.push("/")
  }
  const addToCart = async (customerID,productID=product.ProductId) => {
    try {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerID,productID }), // Pass customerId as an object
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      
    } catch (error) {
      console.error("Error adding orders to the cart:", error);
    } 
  };

  const handleAddToCart = async() => {
    // Implement your add to cart logic here
    try {
      // Call the getUser API to check if the user is logged in
      const response = await axios.get(`/api/getUser`);
      
      console.log()
      if (response) {
        console.log(response.data.user[0])
        const cartResponse=addToCart(response.data.user[0].Customer_id)
        console.log(cartResponse)
        

      } else {
        // If user is not logged in, redirect to the login page
        router.push("/sigin"); // Replace "/login" with your actual login page URL
      }
    } catch (error) {
      console.log(error)
      router.push("/signin");
    }

    console.log("Adding to cart:", product.ProductName);
  };

  useEffect(()=>{
    const fetchProduct=async(ProductId)=>{
        try {
            const response = await fetch("/api/getProductById", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ProductId }), // Pass customerId as an object
            });
      
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
      
            const data = await response.json();
            console.log("Success:", data);
            setProduct(data[0]); // Set the fetched orders
          } catch (error) {
            console.error("Error fetching product:", error);
          } 
      }
      if(id){
        fetchProduct(id)
      }
  },[id])

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <nav className="flex justify-between items-center py-4 border-b-2 border-gray-300">
        <svg
          className="w-6 h-6 fill-current text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onClick={handleBackButtonClick}
        >
          <path d="M20 11H7.414l3.293-3.293a1 1 0 10-1.414-1.414l-5 5a1 1 0 000 1.414l5 5a1 1 0 001.414-1.414L7.414 13H20a1 1 0 000-2z" />
        </svg>
        <span>Back to all Items</span>
        <svg
          className="w-6 h-6 fill-current text-red-500 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M18.366 4.886a5.982 5.982 0 00-4.242-1.757c-1.542 0-3.084.586-4.242 1.757L12 6.242l-2.122-2.121a5.966 5.966 0 00-4.242-1.757 6.002 6.002 0 00-4.242 10.243l9.364 9.364L18.366 4.886zm1.768 13.788l-9.364-9.364L2.636 18.674A3.986 3.986 0 003 22h18a3.99 3.99 0 001.134-7.326z" />
        </svg>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="w-full">
          <img src={productImageMapping[product.ProductName]} alt="Product Image" className="w-full" />
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-semibold mb-2">{product.ProductName}</h1>
          <h4 className="text-gray-500 mb-4">{product.Category}</h4>
          <h2 className="text-2xl font-semibold mb-2">${product.Price}</h2>
          <p className="text-gray-600 mb-4">{product.Description}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600" onClick={handleAddToCart}>Add to Cart</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
