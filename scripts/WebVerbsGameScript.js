var targets=[];
        var distance=0;
        var shotTargets=[];
        var score=0;
        function startGame() {
            gamearea.start();
        }
        function targetGone(){
            for(let i=0;i<targets.length;i++)
                if(targets[i].y>400) return true;
        }
        function clickHandler(event) {
            x=event.clientX-gamearea.canvas.offsetLeft;
            y=event.clientY-gamearea.canvas.offsetTop;
            checkTarget(x,y);
        }
        function checkTarget() {
            for(let i=0;i<targets.length;i++){
                if(x>=targets[i].x && x<=targets[i].x+20 && y>=targets[i].y && y<=targets[i].y+20){
                    targets[i].shot=true;
                    shotTargets.push(targets[i]);
                    targets.splice(i,1);
                    score++;
                }
            }
        }
        var gamearea={
            canvas:document.createElement("canvas"),
            start:function () {
                this.canvas.width=300;
                this.canvas.height=400;
                this.canvas.style.backgroundColor="#d3d3d3";
                this.canvas.style.border="3px solid gray";
                this.canvas.style.margin="auto";
                this.canvas.style.display="block";
                document.body.insertBefore(this.canvas,document.body.childNodes[0]);
                this.context=this.canvas.getContext("2d");
                this.canvas.addEventListener("click",clickHandler,event);
                requestAnimationFrame(gamearea.update);
                gamearea.update();
              },
            update:function () {
                gamearea.context.clearRect(0,0,300,400);
                document.getElementById("score").innerText="Score: "+score;
                if(score==50){
                    gamearea.stop(true);
                    return;
                }
                if(targetGone()){
                    gamearea.stop(false);
                    return;
                }
                if(targets.length==0 || targets[targets.length-1].y>=distance){
                    var t=new target();
                    targets.push(t);
                    distance=Math.floor(Math.random()*120);
                }
                for(let i=0;i<targets.length;i++) targets[i].draw();
                if(shotTargets.length>0){
                    for(let i=0;i<shotTargets.length;i++) shotTargets[i].draw();
                    for(let j=0;j<shotTargets.length;j++)
                        if(shotTargets[j].shotCount==15) shotTargets.splice(j,1);

                }
                requestAnimationFrame(gamearea.update);
            },
            stop:function (win) {
                gamearea.canvas.removeEventListener("click",clickHandler,event);
                gamearea.context.fillStyle="black";
                gamearea.context.globalAlpha=0.5;
                gamearea.context.fillRect(0,0,300,400);
                gamearea.context.globalAlpha=1.0;
                gamearea.context.fillRect(0,100,300,100);
                gamearea.context.font="20px Consolas";
                if(win){
                    gamearea.context.fillStyle="LawnGreen";
                    gamearea.context.fillText("You win!!",40,150);
                }else{
                    gamearea.context.fillStyle="red";
                    gamearea.context.fillText("Game over!! Score: "+score,40,150);
                }
            }
        }
        function target() {
            this.x=Math.floor(Math.random()*290);
            this.y=0;
            this.shot=false;
            this.shotCount=0;
            this.draw=function () {
                gamearea.context.fillStyle="black";
                if(this.shot){
                    this.shotCount++;
                    gamearea.context.fillRect(this.x,this.y,4,4);
                    gamearea.context.fillRect(this.x+4,this.y+4,4,4);
                    gamearea.context.fillRect(this.x+12,this.y+4,4,4);
                    gamearea.context.fillRect(this.x+16,this.y,4,4);
                    gamearea.context.fillRect(this.x+4,this.y+12,4,4);
                    gamearea.context.fillRect(this.x,this.y+16,4,4);
                    gamearea.context.fillRect(this.x+12,this.y+12,4,4);
                    gamearea.context.fillRect(this.x+16,this.y+16,4,4);
                }else{
                    gamearea.context.fillRect(this.x,this.y,20,20);
                    this.y+=0.3;
                }

            }
        }
