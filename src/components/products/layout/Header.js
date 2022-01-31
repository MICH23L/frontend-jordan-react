import { useState, useEffect } from "react";
import { firestore } from "../../../config/firebase";
import { Link } from "react-router-dom";

function Header() {
  const [shoppingCartLength, setShoppingCart] = useState(0);

  const getShoppingCart = async () => {
    await firestore("shopping-cart").onSnapshot((shopping) => {
      setShoppingCart(shopping.docs.length);
    });
  };

  useEffect(() => {
    getShoppingCart();
  });
  return (
    <header className="header">
      <Link to="/" className="link-router--white">
        <h1 className="title">LIVERPOOL</h1>
      </Link>
      <Link className="link-router--white" to="/shopping-cart">
        <span className="fa-stack fa-2x">
          <i className="fa fa-shopping-cart fa-stack-1x shopping-cart-icon"></i>
          <strong className="fa-stack-1x fa-stack-text shopping-cart-text">
            {shoppingCartLength}
          </strong>
        </span>
      </Link>
    </header>
  );
}
export default Header;
