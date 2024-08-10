export const getCartItems = () => {
    return localStorage.getItem('cart-store') ? JSON.parse(localStorage.getItem('cart-store')!) : [];
}