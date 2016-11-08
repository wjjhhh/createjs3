/**
 * Created by Employee on 2016/11/8.
 */
var stage=new createjs.Stage('gameView');
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener('tick',stage);
var gameView = new createjs.Container();
gameView.x=30;
gameView.y=30;
stage.addChild(gameView);

var circleArr=[[],[],[],[],[],[],[],[],[]];
var cat;
function addCircle(){
    for(var indexY=0;indexY<9;indexY++){
        for(var indexX=0;indexX<9;indexX++){
            var c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY]=c;
            c.indexX=indexX;
            c.indexY=indexY;
            c.x=indexY%2?indexX*55+25:indexX*55;
            c.y=indexY*55;
            if(indexX==4&&indexY==4){
                c.setCircleType(3);
                cat=c;
            }
            c.addEventListener("click",circleClicked);
        }
    }
}
function circleClicked(e){
    var _t=e.target;
    if(_t.getCircleType()!=3){
        _t.setCircleType(2);
    }
    if(cat.indexX==0||cat.indexX==8||cat.indexY==0||cat.indexY==8){
        alert('游戏结束');
    }
    var leftCircle=circleArr[cat.indexX-1][cat.indexY];
    var rightCircle=circleArr[cat.indexX+1][cat.indexY];
    var topLeftCircle=circleArr[cat.indexX][cat.indexY-1];
    var topRightCircle=circleArr[cat.indexX+1][cat.indexY-1];
    var bottomLeftCircle=circleArr[cat.indexX-1][cat.indexY+1];
    var bottomRightCircle=circleArr[cat.indexX][cat.indexY+1];
    if(leftCircle.getCircleType()==1){
        leftCircle.setCircleType(3);
        cat.setCircleType(1);
        cat=leftCircle;
    }
    else if(rightCircle.getCircleType()==1){
        rightCircle.setCircleType(3);
        cat.setCircleType(1);
        cat=rightCircle;
    }
    else if(topLeftCircle.getCircleType()==1){
        topLeftCircle.setCircleType(3);
        cat.setCircleType(1);
        cat=topLeftCircle;
    }
    else if(topRightCircle.getCircleType()==1){
        topRightCircle.setCircleType(3);
        cat.setCircleType(1);
        cat=topRightCircle;
    }
    else if(bottomLeftCircle.getCircleType()==1){
        bottomLeftCircle.setCircleType(3);
        cat.setCircleType(1);
        cat=bottomLeftCircle;
    }
    else if(bottomRightCircle.getCircleType()==1){
        bottomRightCircle.setCircleType(3);
        cat.setCircleType(1);
        cat=bottomRightCircle;
    }
    else{
        alert('死');
    }
}
addCircle();