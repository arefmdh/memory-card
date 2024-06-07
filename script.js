const cards = document.querySelectorAll(".card"),
  timeTag = document.querySelector(".time b"),
  flipsTag = document.querySelector(".flips b"),
  refreshBtn = document.querySelector(".details button");
const flipCards = document.querySelectorAll(".flip");

let winAudio = new Audio("./audios/win.mp3");
let lostAudio = new Audio("./audios/lost.mp3");

let maxTime = 45;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
  if (timeLeft <= 0) {
    lostAudio.pause();
    lostAudio.currentTime = 0;
    lostAudio.play();
    document.querySelector(".modal").classList.add("opened");
    document.querySelector(".prizeTitle").textContent = "باختی!";
    document.querySelector(".modal").style.backgroundColor = "red";
    return clearInterval(timer);
  }
  timeLeft--;
  timeTag.innerText = timeLeft;
}
function flipCard({ target: clickedCard }) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    flips++;
    flipsTag.innerText = flips;
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 6 && timeLeft > 0) {
      winAudio.pause();
      winAudio.currentTime = 0;
      winAudio.play();
      document.querySelector(".modal").classList.add("opened");
      document.querySelector(".prizeTitle").textContent = "بردی!";
      document.querySelector(".modal").style.backgroundColor = "dodgerblue";

      document.querySelector(".form").innerHTML = `<form id="infoForm">
                    <label>نام:</label><br>
                    <input type="text" id="fname" name="fname"><br>
                    <label for="number">شماره تماس:</label><br>
                    <input type="text" id="number" name="number"><br><br><br><br>
                    </form>`;

      return clearInterval(timer);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  timeLeft = maxTime;
  flips = matchedCard = 0;
  cardOne = cardTwo = "";
  clearInterval(timer);
  timeTag.innerText = timeLeft;
  flipsTag.innerText = flips;
  disableDeck = isPlaying = false;

  let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    setTimeout(() => {
      imgTag.src = `images/img-${arr[index]}.png`;
    }, 500);
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

function tryAgain() {
 
      const fname = document.getElementById("fname").value;
      const number = document.getElementById("number").value;

      fetch("https://expo.iran.liara.run/login-spin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: number,
          fullname: fname,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          window.location.href = "./index2.html";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  
