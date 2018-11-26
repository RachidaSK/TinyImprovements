const render = function(array) {
    $("#kudos").empty();
    for(let i = 0; i < array.length; i++) {
        $("#kudos").append(`<div class="card mt-4">
                              <div class="card-body text-center">
                                 <h3>${array[i].title}</h3>
                                 <h6>From: ${array[i].from}</h6>
                                 <h6>To: ${array[i].to}</h6>
                                 <p>${array[i].message}</p>
                              </div>
                            </div>`);
    }
}

const getKudos = function() {
    const userId = sessionStorage.getItem('token');
    $.get(`/api/user/${userId}`)
    .then(function(data){
        console.log(data);
        $("#inputFrom").val(`${data[0].firstName}`);
        render(data[0].kudos);
    });
}

getKudos();

const postKudo = function(e) {
    e.preventDefault();
    const userId = sessionStorage.getItem('token');

    //Set the value of the from equal to the user's firstName
    
    const sender = $("#inputFrom").val();

    //Grab the input values
    const title = $("#inputTitle").val().trim();
    const receiver = $("#inputTo").val().trim();
    const message = $("#message").val().trim();

    $("#inputTitle").val('');
    $("#inputTo").val('');
    $("#message").val('');

    $.post("/api/kudo", {
        userId: userId,
        from: sender,
        to: receiver,
        title: title,
        message: message
    })
    .then(function(data){
        
        getKudos();
    })
}
$("#send-btn").on("click", postKudo);