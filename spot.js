function Spot(i,j){
  this.i=i;
  this.j=j;
  this.posX=this.j*(frameX/cols);
  this.posY=this.i*(frameY/rows);
  this.width=frameX/cols;
  this.height=frameY/rows;
  this.f=0;
  this.g=0;
  this.h=0;
  this.parent=undefined;

this.setDistance = function(node){
    this.g=node.g+this.computeDistance(node);
    this.h=this.computeDistance(finish);
    this.f=this.g+this.h;
}
this.computeDistance = function(node){
  return (abs(this.i-(node.i))*10)+(abs(this.j-(node.j))*10);
}

this.addNeighbours = function(){
    for(var i=-1;i<=1;i++){
      for(var j=-1;j<=1;j++){
        if((abs(j)!=abs(i)) && this.i+i>=0 && this.j+j>=0 && this.i+i<rows && this.j+j<cols){
            if(!closedlist.includes(list[this.i+i][this.j+j]) && !obstaclelist.includes(list[this.i+i][this.j+j])){
              if(!openlist.includes(list[this.i+i][this.j+j])){
                openlist.push(list[this.i+i][this.j+j]);
              }
                list[this.i+i][this.j+j].updateParent();
            }
          }
        }
    }
}

this.lowestF = function(){
    let minor=openlist[0].f;
    var index=0;
    for(var i=1;i<openlist.length;i++){
      openlist[i].setDistance(this);
      if(openlist[i].f<minor){
        minor=openlist[i].f;
        index=i;
      }
    }
    return openlist[index];
}

this.updateParent = function(){
  let obj=undefined;
  let minorG=rows*cols*10
  for(var i=-1;i<=1;i++){
    for(var j=-1;j<=1;j++){
      if((abs(j)!=abs(i)) && this.i+i>=0 && this.j+j>=0 && this.i+i<rows && this.j+j<cols){
          if(closedlist.includes(list[this.i+i][this.j+j]) && list[this.i+i][this.j+j].g<minorG){
            obj=list[this.i+i][this.j+j];
            minorG=obj.g;
          }
      }
    }
  }
  this.parent=obj;
}

this.display = function(){
    if(this==finish) fill(0,0,200);
    else if(inicio==this) fill(0,150,200);
    else if(current==this)   fill(0,0,0);
    else{
      if(pathlist.includes(this)){
        fill(200,200,15);
      }
      else if(closedlist.includes(this)){
        fill(0,0,300);
      }
      else if(openlist.includes(this)){
        fill(300,100,100);
      }
      else if(obstaclelist.includes(this)){
        fill(20,80,20);
      }
      else fill(0,200,0);
    }
    rect(this.posX,this.posY,this.width,this.height);
  }
}