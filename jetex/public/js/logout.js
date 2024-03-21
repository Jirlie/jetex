const logOut = document.getElementById("log-out");
logOut.addEventListener("click", () => {
    frappe.call({
        method: 'logout',
        callback: function (r) {
            if (!r.exc) {
                location.href = "/";;
            }
          },
        });
})