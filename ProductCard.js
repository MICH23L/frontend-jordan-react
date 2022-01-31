function ProductCard(props) {
  return (
    <div className="product-card" onClick={props.onClick}>
      <img
        src={props.image}
        alt="Product"
        className="product-card__image"
      ></img>
      <div className="product-card__title"> {props.name} </div>
      <div className="product-card__price">$ {props.price} </div>
    </div>
  );
}

export default ProductCard;
