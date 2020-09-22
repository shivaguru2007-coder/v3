class Food {
  constructor(){
  this.foodStock=0;
  this.image=loadImage('images/Milk.png');
   this.bedImg = loadImage("virtual pet images/bed Room.png");
  this.gardenImg = loadImage("virtual pet images/Garden.png");
  this.lazyImg = loadImage("virtual pet images/lazy.png");
  this.washImg = loadImage("virtual pet images/Wash Room.png");
 // console.log(  this.gardenImg)
  }
  

 updateFoodStock(foodStock){
  this.foodStock=foodStock;
 }

 deductFood(){
   if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
   }
  }

  getFoodStock(){
    return this.foodStock;
  }

  display(){
    var x=80,y=100;
    
    imageMode(CENTER);
 
    
    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=80;
          y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }
  }
  bedroom(){
    imageMode(CENTER);
    image(this.bedImg,450,250,900,500);
  }
  
  garden(){    
    imageMode(CENTER);
    image(this.gardenImg,450,250,900,500); 
  }
  
  washroom(){
    imageMode(CENTER);
 image(this.washImg,450,250,900,500);

  }
}