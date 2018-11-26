/*Register New user*/

const registerUser = function (e) {
    e.preventDefault();
    const firstName = $("#inputFirstName").val().trim();
    const lastName = $("#inputLastName").val().trim();
    const email = $("#inputEmail").val().trim();
    const password = $("#inputPassword").val().trim();

    $("#inputFirstName").val('');
    $("#inputLastName").val('');
    $("#inputEmail").val('');
    $("#inputPassword").val('');

    $.post("/api/user", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        .then(function (data) {
            console.log("success");
        })
}
$("#sign-up-btn").on("click", registerUser);

/*Login User*/

const loginUser = function (e) {
    e.preventDefault();
    const email = $("#inputEmail1").val().trim();
    const password = $("#inputPassword1").val().trim();

    $("#inputEmail1").val('');
    $("#inputPassword1").val('');

    $.post("/api/session", {
            email: email,
            password: password
        })
        .then(function (data) {
            if (data[0]._id) {
                sessionStorage.setItem('token', data[0]._id)
                window.location.href = "kudo.html";
            }
        })
}
$("#log-in-btn").on("click", loginUser);
