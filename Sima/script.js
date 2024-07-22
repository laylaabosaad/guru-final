let score = 0;

function randomPosition(max) {
  return Math.floor(Math.random() * max);
}

function createFruits() {
  const gameArea = document.querySelector(".game-area");
  const fruits = ["apple", "apple", "bomb", "bomb"]; 

  const numFruits = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < numFruits; i++) {
    const fruit = document.createElement("div");
    const fruitType = fruits[Math.floor(Math.random() * fruits.length)];
    fruit.classList.add("fruit", fruitType);
    fruit.style.left = `${randomPosition(gameArea.clientWidth - 50)}px`;
    fruit.style.top = `${randomPosition(-200)}px`;
    gameArea.appendChild(fruit);

    
    const animationDuration = Math.random() * 1000 + 1500; 
    fruit.style.animationDuration = `${animationDuration}ms`;

   
    fruit.addEventListener("animationend", function () {
      fruit.remove();
    });

    
    fruit.addEventListener("mousedown", function (event) {
      if (event.target.classList.contains("apple")) {
        score += 10;
        event.target.remove(); 
        updateScore();
      } else if (event.target.classList.contains("bomb")) {
        endGame();
      }
    });
  }
}





















function endGame() {
  alert(`Game Over! Score: ${score}`);
  score = 0;
  updateScore();
  document.querySelector(".game-area").innerHTML = ""; 
  createFruits(); 
}

document.addEventListener("DOMContentLoaded", function () {
  setInterval(createFruits, 2000); 
});

function updateScore() {
  document.getElementById("score").textContent = `Score: ${score}`;
}
