var database ,dog,dog1,dog2
var foodS
//var form
var feed,add
var foodobject
var fedtime
var lastFed
var foodS, FoodStock;
var bedImg, gardenImg, washImg, lazyImg;
var currentTime;
var gameStateRef;
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
  //load images here

}

function setup() {
	createCanvas(900, 500);
  database = firebase.database();
  console.log(database);

  gameStateRef  = database.ref('gameState');
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  //dog.addImage(dogimg1)
 // dog.scale=0.2
  

  var FoodStock = database.ref('Food');
  FoodStock.on("value", readPosition, showError);

  feed = createButton("FEED DRAGO")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 



function draw(){
  background(46,139,87);
 foodobject.display()

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last Feed : "+lastFed%12+"PM", 250,30);

  }else if(lastFed ==0){
    text("last Feed : 12 AM ", 250,30);
  }else{
    text("last Feed : "+lastFed+"AM", 250,30);
  }
  currentTime=hour();
  if(currentTime==(lastFed+1)){
    
    update("playing");
    foodobject.garden();
  }else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodobject.bedroom();
  }else if(currentTime==(lastFed+2) && currentTime<=(lastFed+4)){
    update("bathing");
    foodobject.washroom();
  }else if(currentTime>4){
    update("hungry");
   foodobject.display();
  }
if(gameStateRef!="hungry"){
  feed.hide();
  add.hide();
  dog.remove(); 
}else{
  feed.show();
  add.show();
  dog.addImage("dogImg1.png",  dogimg2 );

}
  //add styles here
drawSprites();

}
function readPosition(data){
  foodS = data.val();
  foodobject.updateFoodStock(foodS)
  console.log(foodS.x);
  
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(fir){
  if(fir>0){
    fir=fir-1
  }
  else{
    fir=0
  }
  database.ref('/').set({
    'Food': fir
  })

}
function AddFood(){
foodS++
database.ref('/').update({
  Food:foodS
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour()
 })
}
function update(state){
  database.ref('/').update({
    GameState: state
  });
}