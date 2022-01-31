import { firestore } from "../config/firebase.js";
import { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard.js";
import ProductDetail from "../components/products/ProductDetail.js";
import Backdrop from "../components/products/Backdrop.js";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  /**
   * This function gets the products from the 'products' collection in the Firestore database
   */
  const getProducts = async () => {
    const productsRef = await firestore("products").get();
    productsRef.forEach((product) => {
      const productOBJ = {
        id: product.id,
        ...product.data(),
      };
      setProducts((products) => [...products, productOBJ]);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [productDetailID, setProductDetailID] = useState("");
  const openProductDetail = (productID) => {
    setProductDetailID(productID);
    setDetailIsOpen(true);
  };

  const closeProductDetail = () => {
    setDetailIsOpen(false);
  };

  return (
    <section className="section">
      <div className="section-title">Products list</div>
      <div className="product">
        {products &&
          products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                onClick={() => openProductDetail(product.id)}
              />
            );
          })}
      </div>

      {detailIsOpen && productDetailID && (
        <ProductDetail productID={productDetailID} onAdd={closeProductDetail} />
      )}
      {detailIsOpen && productDetailID && (
        <Backdrop onClose={closeProductDetail} />
      )}
    </section>
  );
}

export default ProductsPage;
