// GLOBAL VARIABLE
var myGif;
var gifHolder = $("#gifHolder");
// OBJECT
gifMaker = {
    topics: ["cat", "dog", "hamster", "husky", "squirel"],

    buttonList: function() { //method to display starting buttons
        $("#buttonHolder").empty();
        for (var b=0; b<gifMaker.topics.length; b++){
            $("#buttonHolder").append(`
            <button type="button" class="btn btn-secondary m-1 gifTopic">${gifMaker.topics[b]}</button>
        `);
        }
        gifMaker.requestGif();
    },

    addButton: function(){    //method to add new buttons
        $("#add").on("click", function(event){
            var wordLength = $("#gifInput").val().trim().length;
            var myInput = $("#gifInput").val().trim();
            if (wordLength > 0 && gifMaker.topics.indexOf(myInput) === -1){ //prevent from adding empty button and from repeating
                event.preventDefault();
                gifMaker.topics.push(myInput);
                gifMaker.buttonList();
            }
        });
    },
    requestGif: function(){
        $(".gifTopic").on("click", function(){
            console.log("yyayayay");
            gifHolder.empty();
            // gifHolder.html(`<img src="assets/images/loading.gif" alt="loading" id="loading">`);
            myGif = $(this).text().trim();
            console.log(myGif);
            $.ajax({
                url: "https://api.giphy.com/v1/gifs/search?q="+myGif+"&limit=10&rating=g&api_key=17mHbk7SviDeu8zE1XGW7K4VGnHrNpPb",
                method: 'GET'
            }).then(function(response) {
                console.log(response);
                console.log(response.data.length);
                for (var i=0;i<response.data.length; i++){
                    gifHolder.append(`
                        <div class="col">
                        <h5>Rating: ${response.data[i].rating}</h5>
                        <img src=${response.data[i].images.fixed_height_still.url} alt="gif" class="myGif" data-status="still" data-index="${[i]}"></img>
                        <div>
                    `);
                }
                $(".myGif").on("click", function(){
                    var gifIndex = $(this).attr("data-index");
                    var gifStatus = $(this).attr("data-status");
                    var urlStill = response.data[gifIndex].images.fixed_height_still.url;
                    var urlAnimate = response.data[gifIndex].images.fixed_height.url;
                    console.log(gifIndex);
                    if (gifStatus === "still"){
                        $(this).attr("src", urlAnimate);
                        $(this).attr("data-status", "animate");
                    } else {
                        $(this).attr("src", urlStill);
                        $(this).attr("data-status", "still")
                    }
                })
            });
        })
    }
} //closes object

gifMaker.buttonList();
gifMaker.addButton();




