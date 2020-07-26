var list;
var openlist;
var closedlist;
var obstaclelist;
var pathlist;
var inicio;
var current;
var cooldown;
var finish;
var frameX = 500;
var frameY = 500;
var rows = 20;
var cols = 20;
var coolMouse;
var running;
var started;
var pause;
var button1;
var button2;
var boolnode;
var buttonPause;
var switched;
var erased;

function setup(){
  createCanvas(frameX+100,frameY+50);
  switched=false;
  erased=false;
  boolnode=0;
  coolMouse=0;
  started=false;
  running=true;
  cooldown=0;
  pause=false;
  textSize(27);
  button1 = createButton('Start');
  buttonPause = createButton('Pause');
  button2 = createButton('End');
  button1.position(frameX,0);
  buttonPause.position(frameX,50);
  button2.position(frameX,100);
  button1.style('font-size','40px');
  buttonPause.style('font-size','40px');
  button2.style('font-size','40px');
  button1.mousePressed(getStarted);
  buttonPause.mousePressed(pausa);
  button2.mousePressed(setup);
  list = new Array();
    openlist=new Array();
    closedlist=new Array();
    obstaclelist=new Array();
    pathlist = new Array();
    for(let i=0;i<rows;i++){
      list.push(new Array());
      for(let j=0;j<cols;j++){
          list[i].push(new Spot(i,j));
      }
    }

}

function draw(){
  background(220);
if(pause==false){
if(started==true){
  if(boolnode==2){
  if(list[0][0].f==0){
  inicio.setDistance(inicio);
  openlist.push(inicio);
  boolnode=3;
  }
}
if(openlist.length>0 && running==true){
  removefromarray(openlist,current);
  if(!closedlist.includes(current)) closedlist.push(current);
  current.addNeighbours();
  if(openlist.length>0) current=current.lowestF();
  if(current==finish) running=false;
}
else if(running==false && openlist.length>0){
  if(!pathlist.includes(current)){
     pathlist.push(current);
     while(current.parent!==undefined){
       current=current.parent;
       pathlist.push(current);
     }
    }
  }
}
else{
  if(boolnode<2 && (millis()-coolMouse>100 || boolnode==2)){
    coolMouse=millis();
    actionMouse();
  }
  else if(boolnode==2){
      if(mouseIsPressed) actionMouse();
      else switched=true;
  }
}
}
  for(var i=0;i<rows;i++){
    for(var j=0;j<cols;j++){
        list[i][j].display();
    }
  }
  fill(200,200,15);
  rect(0,frameY,100,50);
  text(" - Shortest Path",100,frameY+35)
  fill(0,0,300);
  rect(300,frameY,100,50);
  text(" - Closed List",400,frameY+35)
  line(0,frameY,frameX,frameY);
  line(frameX,0,frameX,frameY);
}


function rand(min,max){
  return parseInt((Math.random()*(max-min))+min);
}

function maxi(num1,num2){
  return num1>num2?num1:num2;
}

function mini(num1,num2){
  return num1<num2?num1:num2;
}

function removefromarray(array,object){
  if(array.includes(object)){
  for(var i=0;i<array.length;i++){
    if(array[i]==object){
      array.splice(i,1);
      break;
    }
  }
}
}
function getStarted(){
  started=true;
}
function setBool(i,j){
  if(boolnode==0){
    inicio=list[i][j];
    current=inicio;
    boolnode++;
  }
  else if(boolnode==1){
    finish=list[i][j];
    boolnode++;
  }
  else{
    if(switched==true){
      switched=false;
      if(obstaclelist.includes(list[i][j])) erased=true;
      else erased=false;
    }
    console.log(erased);
    if(erased==false){
       if(!obstaclelist.includes(list[i][j]) && list[i][j]!=finish) obstaclelist.push(list[i][j]);
     }
    else if(erased==true){
       if(obstaclelist.includes(list[i][j])) removefromarray(obstaclelist,list[i][j]);
     }
  }
}
function actionMouse(){
    if(mouseIsPressed){
    for(var i=0;i<rows;i++){
      for(var j=0;j<cols;j++){
          if(collidePointRect(mouseX,mouseY,list[i][j].posX,list[i][j].posY,list[i][j].width,list[i][j].height)){
              setBool(i,j);
          }
        }
      }
    }
}
function pausa(){
  if(pause==true) pause=false;
  else pause=true;
}
function delay(time){
  let cooldown=0;
  while(millis()-cooldown>time){
    cooldown=millis();
  }
}
