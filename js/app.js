/**
 * Created by Employee on 2016/11/8.
 */
var stage=new createjs.Stage('gameView');
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener('tick',stage);
var gameView = new createjs.Container();
stage.addChild(gameView);

var circleArr=[[],[],[],[],[],[],[],[],[]];

function addCircle(){
    for(var indexY=0;indexY<9;indexY++){
        for(var indexX=0;indexX<9;indexY++){
            var c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY]=c;
            c.x=indexX*55;
            c.y=indexY*55;

        }
    }
}
addCircle();