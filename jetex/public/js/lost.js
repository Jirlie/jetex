//   // Start Laundary
//   const liClick = document.querySelectorAll(".rounded.border");
//   const lableIcon = document.querySelector("#lable-icon");
//   const product = document.querySelector("#icons-input");
//   const submitBtn = document.querySelector("#submit-btn");
//   liClick.forEach((el) => {
//     el.addEventListener("click", () => {
//       liClick.forEach((el) => {
//         el.classList.remove("active");
//       });

//       el.classList.add("active");

//       // Assuming the label icon is the text content of the clicked list item
//       const labelText = el.nextElementSibling.textContent.trim();

//       // Set the label icon value in the input
//       product.value = labelText;

//       // If the label icon is an image source, use the following line instead
//       // product.value = el.querySelector("img").src;
//     });
//   });

//   // Start Damage
// submitBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     frappe.call({
//       method: "jetex.api.damage",
//       type: "POST",
//       args: {
//         user: frappe.session.user,
//         image: document.getElementById("image-type").value,
//         product: product.value,
//         size: document.getElementById("size-select").value,
//         quantity: document.getElementById("quantity").value,
//         comment: document.getElementById("comment").value,
//       },
//       callback: function (r) {
//         if (!r.exc) {
//           Swal.fire(
//             "Thanks for Contacting Us.",
//             "We Will be in Touch Shortly.",
//             "success"
//           );
//         }
//       },
//     });
//   });

//   // End Damage

//   // Start Lost
//   submitBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     frappe.call({
//       method: 'jetex.api.lost',
//       type: 'POST',
//       args: {
//           'user': frappe.session.user,
//           image: document.getElementById("image-type").value,
//           product: product.value,
//           size: document.getElementById("size-select").value,
//           quantity: document.getElementById("quantity").value,
//           comment: document.getElementById("comment").value,

//       },
//       callback: function(r) {
//           if (!r.exc) {
//               Swal.fire(
//                   "Thanks for Contacting Us.",
//                   "We Will be in Touch Shortly.",
//                   "success"
//               );
//           }
//       }
//   });
//   })
//   // End Lost

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
  fetch("/api/method/jetex.api.lost", {
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
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
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
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
});
