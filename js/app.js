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
var move_none=-1,
     move_left=0,
    move_up_left=1,
    move_up_right=2,
    move_right=3,
    move_down_right=4,
    move_down_left=5;
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
            else if(Math.random()<0.1){
                c.setCircleType(Circle.TYPE_SELECTED);
            }
            c.addEventListener("click",circleClicked);
        }
    }
}
function getMoveDir(cat){
    var distanceMap=[];
    // left
    var can=true;
    for(var x=cat.indexX;x>=0;x--){
        if(circleArr[x][cat.indexY].getCircleType()==Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[move_left]=cat.indexX-x;
            break;
        }
    }
    if(can){
        return move_left;
    }
    //left up
    can=true;
    var x=cat.indexX,y=cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType()==Circle.TYPE_SELECTED){
            can=false;
            distanceMap[move_up_left]=cat.indexY-y;
            console.log(cat.indexY)
            break;
        }
        if(y%2==0){
            x--;
        }
        y--;
        if(y<0||x<0){
            break;
        }
        if(can){
            return move_up_left;
        }
    }
    // right up
    console.log(2222);
    can=true;
    x=cat.indexX,y=cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType()==Circle.TYPE_SELECTED){
            can=false;
            distanceMap[move_up_right]=cat.indexY-y;
            break;
        }
        if(y%2==1){
            x++;
        }
        y--;
        if(y<0||x>8){
            break;
        }
    }
    if(can){
        return move_up_right;
    }

    //right
    can=true;
    for(var x=cat.indexX;x<9;x++){
        if(circleArr[x][cat.indexY].getCircleType()==Circle.TYPE_SELECTED){
            can=false;
            distanceMap[move_right]=x-cat.indexX;
            break;
        }
    }
    if(can){
        return move_right;
    }
    //right down
    can=true;
    x=cat.indexX,y=cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType()==Circle.TYPE_SELECTED){
            can=false;
            distanceMap[move_down_right]=y-cat.indexY;
            break;
        }
        if(y%2==1){
            x++;
        }
        y++;
        if(x>8||y>8){
            break;
        }
    }
    if(can){
        return move_down_right;
    }

    //left down
    can=true;
    x=cat.indexX,y=cat.indexY;
    while(true){
        if(circleArr[x][y].getCircleType()==Circle.TYPE_SELECTED){
            can=false;
            distanceMap[move_down_left]=y-cat.indexY;
            break;
        }
        if(y%2==0){
            x--;
        }
        y++;
        if(x<0||y>8){
            break;
        }
    }
    if(can){
        return move_down_left;
    }

}
function circleClicked(e){
    var _t=e.target;
    if(_t.getCircleType()!=Circle.TYPE_CAT){
        _t.setCircleType(Circle.TYPE_SELECTED);
    }
    else{
        return;
    }
    if(cat.indexX==0||cat.indexX==8||cat.indexY==0||cat.indexY==8){
        alert('游戏结束');
        return;
    }
    var dir=getMoveDir(cat);
        switch (dir){
            case move_left:
                cat.setCircleType(Circle.TYPE_UNSELECTED);
                cat=circleArr[cat.indexX-1][cat.indexY];
                cat.setCircleType(Circle.TYPE_CAT);
                break;
            case move_up_left:
                cat.setCircleType(Circle.TYPE_UNSELECTED);
                cat=circleArr[cat.indexY%2?cat.indexX:cat.indexX-1][cat.indexY-1];
                cat.setCircleType(Circle.TYPE_CAT);
                break;
            case move_up_right:
                cat.setCircleType(Circle.TYPE_UNSELECTED);
                cat=circleArr[cat.indexY%2?cat.indexX+1:cat.indexX][cat.indexY-1];
                cat.setCircleType(Circle.TYPE_CAT);
                break;
            case move_right:
                cat.setCircleType(Circle.TYPE_UNSELECTED);
                cat=circleArr[cat.indexX+1][cat.indexY];
                cat.setCircleType(Circle.TYPE_CAT);
                break;
            case move_down_right:
                cat.setCircleType(Circle.TYPE_UNSELECTED);
                cat=circleArr[cat.indexY%2?cat.indexX+1:cat.indexX][cat.indexY+1];
                cat.setCircleType(Circle.TYPE_CAT);
                break;
            case move_down_left:
                cat.setCircleType(Circle.TYPE_UNSELECTED);
                cat=circleArr[cat.indexY%2?cat.indexX:cat.indexX-1][cat.indexY+1];
                break;
            default:
                alert('游戏结束');
        }

    }


addCircle();