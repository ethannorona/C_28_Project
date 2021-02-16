
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7;
var world,boy;
var sling;

function preload(){
	boy=loadImage("images/boy.png");
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1100,100,30);
	mango2=new mango(1000,190,30);
	mango3=new mango(1090,190,30);
	mango4=new mango(1190,200,30);
	mango5=new mango(1020,80,30);
	mango6=new mango(935,250,30);
	mango7=new mango(910,185,30);

	treeObj=new tree(1050,580);
	groundObject=new ground(width/2,600,width,20);

	Engine.run(engine);

	stoneObj = new Stone(235, 420, 30);

	sling = new slingShot(stoneObj.body, {x:235, y:420});
}

function draw() {

  background(230);
  Engine.update(engine);
  //Add code for displaying text here!
  image(boy ,200,340,200,300);
  

  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  stoneObj.display();
  sling.display();

  groundObject.display();

  detectCollison(stoneObj, mango1);
  detectCollison(stoneObj, mango2);
  detectCollison(stoneObj, mango3);
  detectCollison(stoneObj, mango4);
  detectCollison(stoneObj, mango5);
  detectCollison(stoneObj, mango6);
  detectCollison(stoneObj, mango7);
 
	if(stoneObj.body.position.x > 700 || stoneObj.body.position.x < 0 || stoneObj.body.position.y > 558){
		textSize(20);
		text("Press Space to get a Second Chance to throw!", 20, 30);
	}
	console.log(stoneObj.body.position.y);
}

function mouseDragged(){
	Matter.Body.setPosition(stoneObj.body, {x: mouseX, y: mouseY});
}

function mouseReleased(){
	sling.fly();
}

function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(stoneObj.body, {x:235, y:420})
		attach(stoneObj);
	}
}

function detectCollison(lstone, lmango){
	mangoBodyPosition = lmango.body.position;
	stoneBodyPosition = lstone.body.position;

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
	if(distance <= lmango.r + lstone.r){
		Matter.Body.setStatic(lmango.body, false);
	}
}