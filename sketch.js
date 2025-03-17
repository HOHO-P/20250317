let angle = 0;
const colors = ['#006400', '#228B22', '#32CD32']; // 深綠色、森林綠、萊姆綠
let clownfishes = [];
let eatenFishCount = 0; // 記錄被吃掉的小丑魚數量

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 將背景設置為透明
  clear();
  for (let i = 0; i < 20; i++) { // 增加更多隻小丑魚
    clownfishes.push({
      x: random(width),
      y: random(height),
      xSpeed: random(-1, 1),
      ySpeed: random(-1, 1)
    });
  }
}

function draw() {
  clear(); // 每次重繪背景以消除軌跡
  translate(0, height);
  noFill();
  for (let j = 0; j < 20; j++) {
    colors.forEach((clr, index) => {
      drawHeartbeat(j * 100 + index * 10, j + index * 0.5, color(clr), 50 - index * 10, 500 - index * 50, j); // 調整顏色、位置、粗細和高度
    });
  }
  translate(0, -height); // 重置translate
  drawClownfishes(); // 在海草前面繪製小丑魚
  drawEatenFishCount(); // 顯示被吃掉的小丑魚數量
}

function drawHeartbeat(xx, rid, clr, weight, height, seed) {
  beginShape();
  strokeWeight(weight); // 粗細
  let alpha = rid % 2 === 0 ? 100 : 255; // 設置透明度，偶數行透明度較低
  stroke(clr.levels[0], clr.levels[1], clr.levels[2], alpha); // 顏色和透明度
  for (let i = 0; i < height; i++) {
    let deltaFactor = map(i, 0, 50, 0, 1, true); // true代表只能產生在0~1之間的數字
    let deltaX = deltaFactor * (noise(i / 400, frameCount / 100 + seed, rid) - 0.5) * 200; // 調整frameCount參數以減慢速度
    curveVertex(xx + deltaX, -i);
  }
  endShape();
}

function drawClownfishes() {
  clownfishes.forEach((fish, index) => {
    fill('#FF4500'); // 小丑魚顏色
    noStroke();
    ellipse(fish.x, fish.y, 50, 20); // 小丑魚身體
    fill('#FFFFFF');
    ellipse(fish.x - 10, fish.y, 10, 20); // 小丑魚條紋
    ellipse(fish.x + 10, fish.y, 10, 20); // 小丑魚條紋
    fill('#000000');
    ellipse(fish.x + 15, fish.y - 5, 5, 5); // 小丑魚眼睛

    // 更新小丑魚位置
    fish.x += fish.xSpeed;
    fish.y += fish.ySpeed;

    // 確保小丑魚在畫布內
    fish.x = constrain(fish.x, 0, width);
    fish.y = constrain(fish.y, 0, height);

    // 自然游動
    if (random(1) < 0.01) {
      fish.xSpeed = random(-1, 1);
      fish.ySpeed = random(-1, 1);
    }
  });
}

function drawEatenFishCount() {
  fill('#000000');
  textSize(32);
  textAlign(RIGHT, BOTTOM);
  text(`${eatenFishCount} 隻`, width - 10, height - 10); // 顯示被吃掉的小丑魚數量
}
