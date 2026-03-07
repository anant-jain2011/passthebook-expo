import AsyncStorage from "@react-native-async-storage/async-storage";

async function addToCart(book) {
    try {
        const cart = await AsyncStorage.getItem("cart");
        let cartItems = cart ? JSON.parse(cart) : [];

        const existingItemIndex = cartItems.findIndex((item) => item._id === book._id);
        if (existingItemIndex >= 0) {
            alert("This book is already in your cart.");
        } else {
            cartItems.push({ ...book, quantity: 1 });
            await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
            alert("Book added to cart!");
        }

    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}

export {
    addToCart,
}