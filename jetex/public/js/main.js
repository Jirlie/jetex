// const liClick = document.querySelectorAll(".rounded.border");
// const submitBtn = document.querySelector("#submit-btn");

// liClick.forEach((el) => {
//   el.addEventListener("click", () => {
//     const isActive = el.classList.contains("active");
//     const productName =
//       el.nextElementSibling.querySelector("#lable-icon").textContent;
//     const size = el.nextElementSibling.querySelector("#size-select").value;
//     const quantity = el.nextElementSibling.querySelector("#quantity").value;

//     if (isActive) {
//       // Remove from local storage
//       localStorage.removeItem(productName);
//     } else {
//       // Add to local storage
//       const productData = {
//         product: productName,
//         size: size,
//         quantity: quantity,
//       };
//       localStorage.setItem(productName, JSON.stringify(productData));
//     }

//     el.classList.toggle("active");
//   });
// });

// submitBtn.addEventListener("click", () => {
//   const products = [];
//   for (let i = 0; i < localStorage.length; i++) {
//     const productName = localStorage.key(i);
//     const productData = JSON.parse(localStorage.getItem(productName));
//     products.push({
//       product: productName,
//       size: productData.size,
//       quantity: productData.quantity,
//     });
//   }

//   // Prepare the request body
//   const requestBody = {
//     data: JSON.stringify({
//       products: products,
//     }),
//   };

//   // Make a POST request to the API endpoint
//   fetch("/api/method/jetex.api.laundary", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       "X-Frappe-CSRF-Token": frappe.csrf_token,
//     },
//     body: JSON.stringify({
//       user: frappe.session.user,
//       details2: products,
//       comment: document.getElementById("comment").value,
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Handle the response from the server if needed
//       console.log(data);
//       // Clear local storage after successful submission
//       localStorage.clear();
//     })
//     .catch((error) => {
//       console.error("There was a problem with your fetch operation:", error);
//     });
// });

const liClick = document.querySelectorAll(".rounded.border");
const submitBtn = document.querySelector("#submit-btn");

liClick.forEach((el) => {
  el.addEventListener("click", () => {
    const isActive = el.classList.contains("active");
    el.classList.toggle("active");
    updateLocalStorage(); // Update local storage on click
  });
});

// Function to update local storage
function updateLocalStorage() {
  const products = [];
  liClick.forEach((el) => {
    if (el.classList.contains("active")) {
      const productName =
        el.nextElementSibling.querySelector("#lable-icon").textContent;
      // const size = el.nextElementSibling.querySelector("#size-select").value;
      const quantity = el.nextElementSibling.querySelector("#quantity").value;

      products.push({
        product: productName,
        // size: size,
        quantity: quantity,
      });
    }
  });

  // Update local storage with the current state of products
  localStorage.setItem("products", JSON.stringify(products));
}

// Event listener for quantity and size changes
liClick.forEach((el) => {
  // el.nextElementSibling
  //   .querySelector("#size-select")
  //   .addEventListener("change", updateLocalStorage);
  el.nextElementSibling
    .querySelector("#quantity")
    .addEventListener("input", updateLocalStorage);
});

submitBtn.addEventListener("click", () => {
  // Prepare the request body
  // Make a POST request to the API endpoint
  fetch("/api/method/jetex.api.laundary", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-Frappe-CSRF-Token": frappe.csrf_token,
    },
    body: JSON.stringify({
      user: frappe.session.user,
      details2: JSON.parse(localStorage.getItem("products")),
      // comment: document.getElementById("comment").value,
    }),
  })
    .then((response) => {
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      return response.json();
    })
    .then((data) => {
      // Handle the response from the server if needed
      console.log(data);
      Swal.fire(
        "Thanks for Contacting Us.",
        "We Will be in Touch Shortly.",
        "success"
      );
    });
  // .catch((error) => {
  //   console.error("There was a problem with your fetch operation:", error);
  // });
});
