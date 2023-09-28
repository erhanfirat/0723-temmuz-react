const productsInitial = [];

export function productReducer(state = productsInitial, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_PRODUCTS":
      return payload;

    case "ADD_PRODUCT_ADMIN_RIGHT":
      return [...state.filter((p) => p.id !== payload.id), payload];

    case "REMOVE_PRODUCT_ADMIN_RIGHT":
      return [...state.filter((p) => p.id !== payload)];

    default:
      return state;
  }
}

// ACTIONS ****************************

export const setProductsAction = (products) => ({
  type: "SET_PRODUCTS",
  payload: products,
});

export const addProductAction = (product) => ({
  type: "ADD_PRODUCT_ADMIN_RIGHT",
  payload: product,
});

export const removeProductAction = (productId) => ({
  type: "REMOVE_PRODUCT_ADMIN_RIGHT",
  payload: productId,
});
