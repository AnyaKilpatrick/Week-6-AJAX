
var topics = ["cat", "dog", "hamster", "husky", "squirel"];
var queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+cats&limit=10&api_key=17mHbk7SviDeu8zE1XGW7K4VGnHrNpPb";

//function to display starting buttons
function buttonList(){
    $("#buttonHolder").empty();
    for (var b=0; b<topics.length; b++){
        $("#buttonHolder").append(`
        <button type="button" class="btn btn-secondary m-1">${topics[b]}</button>
    `);
    }
}
buttonList();
//function to add new buttons
$("#add").on("click", function(event){
    var wordLength = $("#gifInput").val().trim().length;
    var myInput = $("#gifInput").val().trim();
    if (wordLength > 0 && topics.indexOf(myInput) === -1){ //prevent from adding empty button and from repeating
        event.preventDefault();
        topics.push(myInput);
        buttonList();
    }
});


$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function(response) {
  console.log(response);
  console.log(response.data.length);
  for (var i=0;i<response.data.length; i++){
    $("#gifHolder").append(`
        <div class="col">
            <h5>Rating: ${response.data[i].rating}</h5>
            <img src=${response.data[i].images.fixed_height_still.url} alt="gif" id="myGif"></img>
        <div>
    `);
  }

});

