let items = document.querySelector('.container')
let inp = document.querySelector("input")

let s ="";
for(let i = 1 ; i<=16;i++){
    s += `<div class="items">
        <div class="imggs">
          <img src="" alt="">
        </div>
      </div>`
}
items.innerHTML = s
let items1 = document.querySelectorAll(".container .items")
 let uniqueImages = ["https://4kwallpapers.com/images/wallpapers/john-cena-wrestler-3840x2160-16182.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB4kv9hgXpXpWLD-W6x9pDw4nAkerzs6u9ow&s","https://i.pinimg.com/736x/eb/34/2b/eb342b32dc1a47d3987fcd3893db1adf.jpg","https://i.pinimg.com/736x/3b/d0/7f/3bd07fc35c1a4e9e4b034fd7596a5e4f.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GGeyDD1zLLB_9iHjWXLDfV9w4EBAlvLfBA&s","https://png.pngitem.com/pimgs/s/676-6762895_wwe-triple-h-png-transparent-png.png","https://preview.redd.it/hey-does-anyone-have-a-brock-lesner-2023-render-for-2k-that-v0-b0a61fuxlarc1.jpeg?auto=webp&s=2a76f99c913d41a86a6e00c13fc327f184a1cc42","https://simg.nicepng.com/png/small/441-4415005_kane-png-kane-wwe-png.png"];
 let finalArray = [...uniqueImages, ...uniqueImages];
 function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let shuffledImages = shuffleArray(finalArray);
items1.forEach((box,index) => {
  box.addEventListener("click", () => {
   
    box.innerHTML = `<div class="items">
        <div class="imggs">
          <img src="${shuffledImages[index]}" alt="">
        </div>
      </div>`
  });
});
let firstCard = null;
let secondCard = null;
let lockBoard = false; // Jab comparison ho raha ho tab click block hoga
let defaultImg = "https://i.pinimg.com/736x/fa/21/f1/fa21f1c3e2607d145b03b230697a10b8.jpg";

// Default image on all cards
items1.forEach(box => {
  box.querySelector("img").src = defaultImg;
});

items1.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (lockBoard) return; // Jab tak 2 cards compare nahi hote
    if (box.classList.contains("matched")) return; // Already matched

    // Flip current card
    let imgTag = box.querySelector("img");
    imgTag.src = shuffledImages[index];

    // First click
    if (!firstCard) {
      firstCard = { box, index };
       inp.value = "You can do it Ayan 😁"
      
      return;
    }

    // Second click
    secondCard = { box, index };
   
    lockBoard = true;

    // 🔍 Compare images
    if (shuffledImages[firstCard.index] === shuffledImages[secondCard.index]) {
      // Match ho gaya
      firstCard.box.classList.add("matched");
      secondCard.box.classList.add("matched");
       inp.value = "Great 🤗"

      resetSelection();
    } else {
      // ❌ Not match → hide again
      setTimeout(() => {
        firstCard.box.querySelector("img").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvf8DQUqMxrYUZ9t6KSCyyVJC8oKt88PWlmg&s";
        secondCard.box.querySelector("img").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvf8DQUqMxrYUZ9t6KSCyyVJC8oKt88PWlmg&s";
         inp.value = "OH 🙄"
        resetSelection();
      }, 800);
    }
  });
});

// Helper function
function resetSelection() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
