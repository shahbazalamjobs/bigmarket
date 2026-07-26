export const saveWishlist = (items) => {

  localStorage.setItem(
    "wishlist",
    JSON.stringify(items)
  );

};