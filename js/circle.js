/**
 * Created by Employee on 2016/11/8.
 */
function Circle(){
    createjs.Shape.call(this);//将createjs.Shape的方法全部当作参数传进来
    this,setCircleType=function (type) {
        this._CircleType=type;
        switch (type){
            case 1:
                this.setColor("#ff0000");
                break;
            case 2:
                this.setColor("#ff6600");
                break;
            case 3:
                this.setColor("#0000ff");
                break;
        }
    }
    this.getCircleType=function(){
        return this._CircleType;
    }
    this.setColor=function (colorString) {
        this.graphics.beginFill(colorString);
        this.graphics.drawCircle(0,0,25);
        this.graphics.endFill();
    }
    this.setCircleType(1);
}
Circle.prototype=new createjs.Shape();//构建Circle对象，继承所有createjs方法以及之前创建的方法