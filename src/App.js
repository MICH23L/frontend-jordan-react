import { Route, Switch } from "react-router-dom";
import ProductsPage from "./pages/Products";
import ShoppingCartPage from "./pages/ShoppingCart";
import Header from "./components/products/layout/Header";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <ProductsPage />
        </Route>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/shopping-cart">
          <ShoppingCartPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
