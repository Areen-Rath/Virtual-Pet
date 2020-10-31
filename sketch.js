var dog, dogImage, happyDog;

var database, foodS, foodStock;

function preload()
{
  
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {

  createCanvas(500, 500);

  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogImage);
  dog.scale = 0.1;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);
  
}


function draw() {  

  background(46, 139, 87);

  textSize(20);
  fill("white");
  text("Press Up Arrow Key to Feed Bobby Milk!", 75, 50);
  text("Milk Bottles Remaining: " + foodS, 130, 350)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  if(foodS === 0){
    text("OK. Now Bobby is Healthy!", 125, 80);
    dog.addImage(dogImage);
  }

  drawSprites();

}

function writeStock(x){

  if(x <= 0){
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  });

}

function readStock(data){

  foodS = data.val();

}

function showError(){

  console.log("Database Connection Failed!");

}