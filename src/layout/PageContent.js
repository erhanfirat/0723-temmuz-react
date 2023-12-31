import { Route, Switch } from "react-router-dom";
import CounterPage, { PI } from "../pages/CounterPage";
import MainPage from "../pages/MainPage";
import ProductsPage from "../pages/ProductsPage";
import ProductsDetailPage from "../pages/ProductsDetailPage";
import CreateProductPage from "../pages/CreateProductPage";
import LoginHookPage from "../pages/LoginHookPage";
import LoginPageWithCustomHook from "../pages/LoginPageWithCustomHook";
import ProductsWithReducerPage from "../pages/ProductsWithReducerPage";
import ProtectedPage from "../pages/ProtectedPage";
import ProductEditPage from "../pages/ProductEditPage";

const PageContent = ({}) => {
  console.log(PI);
  return (
    // Page Componentleri
    <div className="page-content">
      <Switch>
        <Route path="/counter">
          <ProtectedPage PageComponent={CounterPage} fromURL={"/counter"} />
        </Route>
        <Route path="/products/edit">
          <h1>Ürün Düzenleme Sayfası</h1>
          <hr />
          <form></form>
        </Route>
        <Route path="/products" exact>
          <ProductsPage />
        </Route>
        <Route path="/products-reducer" exact>
          <ProductsWithReducerPage />
        </Route>
        <Route path="/products/:productId" exact>
          <ProductsDetailPage />
        </Route>
        <Route path="/edit-product/:productId" exact>
          <ProtectedPage
            PageComponent={ProductEditPage}
            fromURL={"/products"}
          />
        </Route>
        <Route path="/login" exact>
          <LoginHookPage />
        </Route>
        <Route path="/login-custom-hook" exact>
          <LoginPageWithCustomHook />
        </Route>
        <Route path="/create-product" exact>
          <ProtectedPage
            PageComponent={CreateProductPage}
            fromURL={"/create-product"}
          />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="*">
          <h2>Girdiğiniz URL karşılığı bir sayfa bulunamadı!</h2>
        </Route>
      </Switch>
    </div>
  );
};

export default PageContent;
