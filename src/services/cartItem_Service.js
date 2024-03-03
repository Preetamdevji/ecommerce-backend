const CartItem = require("../model/cartitems_model.js");
const userService = require("../services/user_services.js");

async function updateCartItem(userId, cartItemId, cartItemData) {
  // console.log(userId, cartItemId, cartItemData);

  try {
    const item = await findCartItemById(cartItemId);

    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error("User Not Found: ", userId);
    }

    if (user._id.toString() === userId.toString()) {
      // console.log("Populated products:", item.products);

      if (item.products && item.products.length > 0) {
        const product = item.products[0]; 
        // console.log("Product details:", product);

        item.quantity = cartItemData.quantity;
        item.price = item.quantity * product.price;
        item.discountPrice = item.quantity * product.discountedPrice;

        // console.log("Updated item.quantity", item.quantity);
        // console.log("Calculated item.price", item.price);
        // console.log("Calculated item.discountPrice", item.discountPrice);

        const updatedCartItem = await item.save();
        return updatedCartItem;
      } else {
        throw new Error("Products field is empty for Cart Item ID: " + cartItemId);
      }
    } else {
      throw new Error("You can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserById(userId);

  // console.log(user._id.toString() === cartItem._id.toString());

  if (user._id.toString() === cartItem.userId.toString()) {
   return await CartItem.findByIdAndDelete(cartItemId);
  }
  throw new Error("You Can't Remove Another User's Item");
}

async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate("products");
  // console.log("cartItemss", cartItem);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("Cart Item Not Found With This ID", cartItemId);
  }
}

module.exports = { updateCartItem, removeCartItem, findCartItemById };
