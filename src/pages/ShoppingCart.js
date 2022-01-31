import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";
function ShoppingCartPage() {
  const [shoppingCartItems, setShoppingCart] = useState([]);
  const [shoppingCartTotal, setShoppingCartTotal] = useState(0);

  const getShoppingCart = async () => {
    await firestore("shopping-cart").onSnapshot((shopping) => {
      setShoppingCart([]);
      setShoppingCartTotal(0);
      shopping.forEach((item) => {
        const productOBJ = {
          id: item.id,
          ...item.data(),
        };
        setShoppingCart((shoppingCartItems) => [
          ...shoppingCartItems,
          productOBJ,
        ]);
        setShoppingCartTotal(
          (shoppingCartTotal) => shoppingCartTotal + productOBJ.price
        );
      });
    });
  };

  const removeShoppingCartItem = async (productID) => {
    try {
      await firestore("shopping-cart").doc(productID).delete();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShoppingCart();
  }, []);
  return (
    <section className="section">
      <div className="section-title">Shopping cart</div>
      {shoppingCartItems &&
        shoppingCartItems.map((item) => {
          return (
            <div className="shopping-cart-card" key={item.id}>
              <img
                src={item.image}
                alt="Product"
                className="shopping-cart-card__image"
              ></img>
              <div className="shopping-cart-card__name"> {item.name} </div>
              <div className="shopping-cart-card__price">$ {item.price}</div>
              <i
                className="fa fa-trash shopping-cart-icon--delete"
                onClick={() => removeShoppingCartItem(item.id)}
              ></i>
            </div>
          );
        })}

      {shoppingCartTotal === 0 ? (
        <div className="shopping-cart-total">
          There's no items in the shopping cart yet.
        </div>
      ) : null}
      <hr className="solid"></hr>
      {shoppingCartTotal !== 0 ? (
        <div className="shopping-cart-total">
          <span className="shopping-cart-total__label">Total</span>
          <span className="shopping-cart-total__price">
            ${shoppingCartTotal}
          </span>
        </div>
      ) : null}
    </section>
  );
}

export default ShoppingCartPage;
