var form = document.getElementById('query-form');

//test input field
var query = document.getElementById('query');
var list = document.getElementById('list-data');

var randomStuffs = ["cat", "sports", "Food", "cars", "birds","coffee","computers", "furniture",  "travel", "landscape",
                    "nba", "art", "chairs", "forest", "architecture", "apple", "samsung", "dog", "forest", "architecture", "malaysia"]

var masonry = new Masonry(list, {
    itemSelector: 'li',
});

var searchTag = randomButton();

var buttonDisplay = document.getElementsByClassName('bob');
for (var i= 0; i < buttonDisplay.length ; i++){
    
   buttonDisplay[i].innerHTML= randomButton(); 
   // get random index
  // buttonDisplay[i].value = randomButton();
}

var randomIndex = Math.floor(Math.random() * buttonDisplay.length);
//put the correct answer there
buttonDisplay[randomIndex].innerHTML= searchTag;

function randomButton() {
    var randomIndex = Math.floor(Math.random() * randomStuffs.length);
    var randomedTag = randomStuffs[randomIndex];
    return randomedTag;
}

function guessTag(id){
    
    if(document.getElementById(id).innerHTML == searchTag){
        
        document.getElementById("resultmessage").innerHTML = "Correct!";
    }
    else {
        document.getElementById("resultmessage").innerHTML = "Wrong!!";
    }
        
}


//set on submit
form.onsubmit = function(event) {
    event.preventDefault();

    // get value in input field
    var queryTerm = query.value;
    console.log(queryTerm);

    getTaggedPhotos(queryTerm);
}

function getTaggedPhotos(tagName){

fetch ('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=W6tUYgagknwWu9XnFWAghyIxakp8QpmEhd9Hw7IgeUbrjKLuTA')
    .then(function(response) {
        return response.json();
    })
    .then(function(result){

        // clear list
        list.innerHTML = '';

        var items = result.response;
            var masonry;

        // for each item, add image to list
        for(var i = 0; i < items.length; i++){
            var item = items[i];

            //initialize
                masonry = new Masonry(list, {
                itemSelector: 'li',
            });

            //run layout
            masonry.layout();

            if(item.photos != undefined){
              // create li and img to append
              var altSizes = item.photos[0].alt_sizes
              var imgSrc = altSizes[altSizes.length - 3].url;

              var img = document.createElement('img');
              img.src = imgSrc ;
              img.onload = function(){
                  masonry.layout();
              }

              var li = document.createElement('li');
              li.appendChild(img);
            //   li.innerHTML = imgSrc;

              list.appendChild(li);
            }
        }
    })

}

// let randomIndex = Math.floor(Math.random() * randomStuffs.length)
// let randomedTag = randomStuffs[randomIndex]


getTaggedPhotos(searchTag);

setTimeout (function(){}, 5000)