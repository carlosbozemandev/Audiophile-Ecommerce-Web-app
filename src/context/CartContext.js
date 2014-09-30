import useLocalStorage from "@/utils/useLocalStorage";
import { createContext, useContext } from "react";
import products from "../../data/products.json"

const CartContext = createContext({});

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {

    const [cart, setCart] = useLocalStorage("cart", []);

    function addProduct(id, name, slug, price, counter) {
        const productDetails = {
            id: id,
            name: name,
            image: slug,
            price: price,
            counter: counter,
        }
        const existingProductIndex = cart.findIndex((item) => item.id === id);
        if (existingProductIndex !== -1) productDetails.counter = counter;
        else {
            const newCart = [...cart, productDetails];
            setCart(newCart);
        }
    };

    function increaseQuantity(id) {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, counter: item.counter + 1 } : item
        );
        setCart(updatedCart);
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, counter: item.counter - 1 } : item
        );
        const updatedCart2 = updatedCart.filter((e) => e.counter > 0);
        setCart(updatedCart2);
    }

    function removeItems(id) {
        setCart([]);
    }

    function getItemQuantity(id) {
        return cart.find((e) => e.id === id)?.counter || 1;
    }

    return (
        <CartContext.Provider value={{
            addProduct,
            increaseQuantity,
            decreaseQuantity,
            removeItems,
            getItemQuantity,
            cart }}>
            {children}
        </CartContext.Provider>
    );
}