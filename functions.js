// Simulated session state (to be replaced with real login handling)
let loggedInUser = localStorage.getItem("loggedInUser");
    
// Update the header based on login status
function updateHeader() {
    const loginSection = document.getElementById("loginSection");
    const accountSection = document.getElementById("accountSection");
    const accountName = document.getElementById("accountName");

    if (loggedInUser) {
        loginSection.hidden = true;
        accountSection.hidden = false;
        accountName.textContent = loggedInUser;
    } else {
        loginSection.hidden = false;
        accountSection.hidden = true;
    }
}

    function toggleLogoutMenu() {
    const logoutMenu = document.getElementById("logoutMenu");
    logoutMenu.style.display = logoutMenu.style.display === "block" ? "none" : "block";
}

function logout() {
    localStorage.removeItem("loggedInUser"); // Clear the logged-in user
    sessionStorage.setItem("loggedIn", "false");
    window.location.href = "html/login.html"; // Redirect to login page
}

// Close logout menu when clicking outside
window.addEventListener("click", (event) => {
    const logoutMenu = document.getElementById("logoutMenu");
    const accountName = document.getElementById("accountName");
    if (logoutMenu && event.target !== logoutMenu && event.target !== accountName) {
        logoutMenu.style.display = "none";
    }
});


// Simulate login (for demonstration)
function login(username) {
    localStorage.setItem("loggedInUser", username);
    loggedInUser = username;
    updateHeader();
}

// Initialize header on page load
document.addEventListener("DOMContentLoaded", updateHeader);




















// Slider for "Palette of Joy"
let currentIndexSet = 0;
const sliderSet = document.getElementById("menu-slider-set");
const itemsSet = document.querySelectorAll(".menu-item-set");
const totalItemsSet = itemsSet.length;
const itemWidthSet = itemsSet[0].offsetWidth + 10; // Adjust for item margin if needed

function slideNextSet() {
    currentIndexSet++;
    if ((currentIndexSet + 2) >= totalItemsSet) {
        currentIndexSet = 0; // Loop back to the start
    }
    sliderSet.style.transform = `translateX(${-currentIndexSet * itemWidthSet}px)`;
}

function slidePrevSet() {
    currentIndexSet--;
    if (currentIndexSet < 0) {
        currentIndexSet = totalItemsSet - 1; // Loop to the end
    }
    sliderSet.style.transform = `translateX(${-currentIndexSet * itemWidthSet}px)`;
}

document.getElementById("next-btn-set").addEventListener("click", slideNextSet);
document.getElementById("prev-btn-set").addEventListener("click", slidePrevSet);

// Slider for "Canvas Classics"
let currentIndexClassic = 0;
const sliderClassic = document.getElementById("menu-slider-classic");
const itemsClassic = document.querySelectorAll(".menu-item-classic");
const totalItemsClassic = itemsClassic.length;
const itemWidthClassic = itemsClassic[0].offsetWidth + 10; // Adjust for item margin if needed

function slideNextClassic() {
    currentIndexClassic++;
    if ((currentIndexClassic + 2) >= totalItemsClassic) {
        currentIndexClassic = 0; // Loop back to the start
    }
    sliderClassic.style.transform = `translateX(${-currentIndexClassic * itemWidthClassic}px)`;
}

function slidePrevClassic() {
    currentIndexClassic--;
    if (currentIndexClassic < 0) {
        currentIndexClassic = totalItemsClassic - 1; // Loop to the end
    }
    sliderClassic.style.transform = `translateX(${-currentIndexClassic * itemWidthClassic}px)`;
}





document.getElementById("next-btn-classic").addEventListener("click", slideNextClassic);
document.getElementById("prev-btn-classic").addEventListener("click", slidePrevClassic);


// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.discountedPrice = price; // Initialize discountedPrice
    }
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
    
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            if (cart[item].discountedPrice && !isNaN(cart[item].discountedPrice)) {
                totalCart += (cart[item].discountedPrice * cart[item].count);
                console.log('Item Total:', cart[item].discountedPrice * cart[item].count); // Debugging line
            }
        }
    
        var discountCode = $('.item-discout').val();
        var discountAmount = 0;
    
        if (discountCode === "ITCE") {
            discountAmount = 300; // Apply the discount amount
        }
    
        totalCart -= discountAmount;
    
        console.log('Total Cart Before Return:', totalCart); // Debugging line
        return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output += "<tr>"
          + "<td>" + cartArray[i].name + "</td>" 
          + "<td>(₱ " + Number(cartArray[i].price).toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ")</td>"
          + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].name + "' style='border: none;background-color: #54adc4; color: #ffffff;font-weight: 700;text-decoration:none;'>-</button>"
          + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
          + "<button class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].name + "' style='border: none;background-color: #54adc4; color: #ffffff;font-weight: 700;text-decoration:none;'>+</button></div></td>"
          + "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>"
          + "<td>₱ " + Number(cartArray[i].total).toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td>"
          + "</tr>";
  }
    var discount = "<tr><td><input type='text' class='item-discout form-control'><tr><td>"
    +"<tr><td><button type='button' class='btn add' id='apply-discount'>Apply Discount Code</button><tr><td>";
    $('.show-cart').html(discount)
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Event listener for the Order Now button
// Event listener for the Order Now button
$('#order-now').click(function() {
    // Hide the cart details and buttons
    $('.show-cart').closest('table').hide(); // Hide cart items
    $('.cart-total').hide(); // Hide total price and discount inputs
    $('.clear-cart').hide(); // Hide clear cart button
    $('.close-2').hide(); // Hide clear cart button
    $('.payment').hide(); // Hide clear cart button


    // Hide the footer buttons
    $('.modal-footer button').hide(); // Hide all buttons in the footer

    // Get the discount value
    var discountCode = $('.item-discout').val();
    var discountValue = 0; // Assuming no discount initially

    // Implement logic to set discountValue based on the discountCode
    if (discountCode === "ITCE") {
        discountValue = 300; // Example discount value
    }




    

    // DITO YUNG TEXT KUNG ANO IMONG ILALAGAY
    var cartArray = shoppingCart.listCart();
    var orderSummary = "<h4>Thank you for ordering!</h4>";
    orderSummary += "<table class='table'><thead><tr><th>Item</th><th>Price</th><th>Quantity</th><th>Total</th></tr></thead><tbody>";

    // Loop through cart items to add to the order summary
    for (var i in cartArray) {
      orderSummary += "<tr>"
          + "<td>" + cartArray[i].name + "</td>"
          + "<td>₱ " + Number(cartArray[i].price.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td>"
          + "<td>" + cartArray[i].count + "</td>"
          + "<td>₱ " + Number((cartArray[i].price * cartArray[i].count).toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td>"
          + "</tr>";
  }

    orderSummary += "</tbody></table>";

    // Calculate total amount after discount
    var totalAmount = shoppingCart.totalCart();
    var finalAmount = totalAmount - discountValue;

    orderSummary += "<h4 style='margin:10px 0px 20px 0px;'>Order Summary</h4><h5>Subtotal: ₱ " + Number(totalAmount.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</h5>";
    orderSummary += "<h5>Discount: ₱ " + Number(discountValue.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</h5>";
    orderSummary += "<h5>Total: ₱ " + Number(finalAmount.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</h5>";
    

    // Display the order summary in the modal
    $('#order-details').html(orderSummary);
    $('#order-summary').show(); // Show the order summary section
});











// Event listener for the Close button in the order summary
$('#close-summary').click(function() {
  // Hide the order summary
  $('#order-summary').hide(); // Hide the order summary

  // Clear the shopping cart
  shoppingCart.clearCart(); // Clear cart data (ensure this method is properly implemented)

  // Reset the cart display
  $('.show-cart').closest('table').empty(); // Clear the cart items display
  $('.total-cart').text('0.00'); // Reset total price display
  $('.cart-total').show(); // Show the total price and discount inputs again
  $('.clear-cart').show(); // Show the Clear Cart button again

  // Show footer buttons again
  $('.modal-footer button').show(); // Show all buttons in the footer

  // Clear the discount input field
  $('.item-discout').val(''); // Clear the discount input field

  // Update the total cart count display
  $('.total-count').text('0'); // Ensure you have an element with class 'total-count' to show cart count
  location.reload(); // Reloads the current page
});


  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  $(document).ready(function() {
    $('#apply-discount').click(function() {
        var discountCode = $('.item-discout').val(); // Get the input value
        var discountAmount = 0; // Default discount amount

        // Check for the discount code
        if (discountCode === "ITCE") {
            discountAmount = 300; // Set the discount amount
        }

        // Update the cart total with the discount applied
        shoppingCart.applyDiscountCode(discountAmount); // Call a method to apply discount
        displayCart(); // Refresh the cart display
    });
});

// Add this method to the shoppingCart object
shoppingCart.applyDiscountCode = function(discountAmount) {
    this.discountAmount = discountAmount; // Save the discount amount

    // Update total cart calculation to apply discount
    this.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += (cart[item].price * cart[item].count);
        }

        // Subtract the saved discount amount from the total
        totalCart -= this.discountAmount;

        return Number(totalCart.toFixed(2)); // Ensure to return a number
    }
}

  displayCart();
  