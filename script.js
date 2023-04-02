const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const results = document.getElementById("results");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
let input1 = document.getElementById("inputWord").innerText;
console.log(typeof(input1));
function getData(){
    let input = document.getElementById("inputWord").value;
    console.log(input);
    fetch(`${url}${input}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            results.innerHTML = `
            <div class="word">
                    <h3>${input}</h3>
                    <button onclick="playSound()">
                        <i class="fa fa-volume-up" style="color:black"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetic}</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>
                <div class="details">
                    <p>${data[0].meanings[1].partOfSpeech}</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[1].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[1].definitions[0].example || ""}
                </p>`;
                
                
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            results.innerHTML = `<h3 class="error" style="color:red">Sorry!! Couldn't Find The Word</h3>`;
        });
        
}
btn.addEventListener("click", getData);
function playSound() {
    sound.play();
}


document.querySelector(".search-box").addEventListener("keyup", function(event) {
    if(event.key == "Enter")
        getData(); 
    if(event.key == "Escape")
        clearData();
});

function clearData(){
    results.innerHTML='';
    document.querySelector("#inputWord").value= '';
}

let clear = document.getElementById("clear-btn");
clear.addEventListener("click", clearData);
