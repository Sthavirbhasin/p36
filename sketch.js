var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,fedTime,lastFeed
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
feed=createButton("feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){
    lastFeed=data.val()
  })
 
  //write code to display text lastFed time here
fill ("black")
textSize(15)
if(lastFeed>=10){
  text("last fed: "+lastFeed%12+"pm",350,50)
}
else if(lastFeed==0){
  text("last fed:12 am",350,50)}
 else{
   text("last fed: "+lastFeed +"am",350,50)
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodstockval=foodObj.getFoodStock()
  if(foodstockval<=0){
    foodObj.updateFoodStock(foodstockval*0)
  }
else{
  foodObj.updateFoodStock(foodstockval-1)
}
database.ref("/").update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour ()
})
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
