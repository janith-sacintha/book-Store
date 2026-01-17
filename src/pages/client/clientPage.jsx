import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductsPage from "./productsPage.jsx";
import ProductOverviewPage from "./productOverviewPage.jsx";
import CartPage from "./cart.jsx";
import CheckoutPage from "./checkoutPage.jsx";
import HomePage from "../homePage.jsx";
import AboutUsPage from "../aboutUsPage.jsx";
import OrdersPage from "./ordersPage.jsx";
import OrderDetailsPage from "./orderDetailsPage.jsx";
import NotFoundPage from "../notFoundPage.jsx";

export default function ClientWebPage (){
    return(
        <div className="w-full h-screen max-h-screen flex flex-col ">
            <Header/>
            <div className="w-full h-[calc(100%-100px)] ">
            <Routes path="/">
                <Route path="/" element={<HomePage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                <Route path="/about-us" element={<AboutUsPage/>}/>
                <Route path="/my-orders" element={<OrdersPage/>}/>
                <Route path="/my-orders/:orderId" element={<OrderDetailsPage />} />
                <Route path="/*" element={<NotFoundPage/>}/>
            </Routes>
            </div>
        </div>
    )
}