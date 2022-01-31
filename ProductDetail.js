import { useState, useEffect } from "react";
import { firestore } from "../../config/firebase";
function ProductDetail(props) {
  const [productData, setProductDetailData] = useState({});

  const getProductData = async (productID) => {
    const productRef = await firestore("products").doc(productID).get();
    setProductDetailData(productRef.data());
  };

  const addProductToCart = async (productID) => {
    await firestore("shopping-cart").doc(productID).set({
      name: productData.name,
      price: productData.price,
      image: productData.image,
      description: productData.description,
    });
    await props.onAdd();
  };

  useEffect(() => {
    getProductData(props.productID);
  }, []);
  return (
    <div className="product-detail">
      <h2>Product detail</h2>
      <p className="product-detail__title">{productData.name}</p>
      <img
        src={productData.image}
        alt="Product"
        className="product-detail__image"
      ></img>
      <p className="product-detail__description">{productData.description}</p>
      <p className="product-detail__price"> ${productData.price}</p>
      <button
        className="btn"
        onClick={() => {
          addProductToCart(props.productID);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductDetail;
