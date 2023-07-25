let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
let result = document.querySelector('#result');
let sound = document.querySelector('#sound');

let btn = document.querySelector('#seachBtn');

btn.addEventListener('click', showInfo);
document.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') {
      showInfo();
   }
});

function showInfo() {
   let inpWord = document.querySelector('#searchInp').value;

   if (inpWord === '') return;

   fetch(`${url}${inpWord}`)
      .then((response) => response.json())
      .then((data) => {
         result.innerHTML = `
         <div class="word">
            <h3>${inpWord}</h3>
            <button onclick="playSound()">
               <i class="fas fa-volume-up fa-xl"></i>
            </button>
         </div>
         <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetic || ""}</p>
         </div>
         <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
         </p>
         <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
         </p>
         `;

         let valueAttr = data[0].phonetics.find(item => item && item.audio !== '');

         sound.setAttribute("src", valueAttr.audio);
      })
      .catch( () => {
         result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
      });
}

function playSound() {
   sound.play();
}
