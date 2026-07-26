export const saveCart = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch {
    // Ignore write errors
  }
};
