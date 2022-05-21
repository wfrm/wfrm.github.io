const canvas= document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
ctx.canvas.width=window.innerWidth;
ctx.canvas.height=window.innerHeight;

let particlesArray=[];

//mouse position 
let mouse={
    x:null,
    y:null,
    radius:(canvas.height/80)*(canvas.width/80)

};
window.addEventListener('mousemove',
function(event)
{
    mouse.x=event.x;
    mouse.y=event.y;
    console.log(mouse);
}
);
// create class particle
class Particle{
    constructor(x,y,directionX,directionY,size,colour)
    {
        this.x=x;
        this.y=y;
        this.directionX=directionX;
        this.directionY=directionY;
        this.size=size;
        this.colour=colour;
    
    }  
    //method to draw individual particles
    draw=function(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        ctx.fillStyle='#8c5523';//ctx.fillStyle=this.colour;
        ctx.fill();
    }
    // check particle possition and mouse positin, move the particle. draw them
    update=function()
    {
        if(this.x>canvas.width||this.x<0){
                this.directionX=-this.directionX;
            }
        if(this.y>canvas.height||this.y<0){
                this.directionY=-this.directionY;
            }  
        //this.x+=this.directionX;
        //this.y+=this.directionY; 
        // colosion entre particulas con el mausse
      let dx=mouse.x-this.x;
      let dy=mouse.y-this.y;
      let distance=Math.sqrt(dx*dx+dy*dy);
      if(distance<mouse.radius+ this.size)
      {
          if(mouse.x<this.x && this.x<canvas.width-this.size*10)
          {
              this.x-=3;
          } 
          if(mouse.x>this.x && this.x>this.size*10)
          {
              this.x+=3;
          } 
          if(mouse.y<this.y && this.y<canvas.height-this.size*10)
          {
              this.y-=3;
          }
          if(mouse.y>this.y && this.y>this.size*10)
          {
              this.y+=3;
          }
      }
      this.x+=this.directionX;
      this.y+=this.directionY;
      this.draw();
    }

}
function init(){
    particlesArray=[];
    let numberOfParticles=(canvas.height*canvas.height)/9000;
    for(let i=0;i<numberOfParticles;i++)
    {
        let size=(Math.random()*5)+1;
        let x=(Math.random()*((innerWidth-size*2)-(size*2)+size*2)
        +size*2);
        let y=(Math.random()*((innerHeight-size*2)-(size*2)+size*2)
        +size*2);
        let directionX=(Math.random()* 5)-2.5;
        let directionY=(Math.random()* 5)- 2.5;
        //let colour=colours[Math.floor(Math.random()*colours.length)];
        let color='#8c5523';
        particlesArray.push(new Particle(x,y,directionX,directionY,size,color));

    }
}
//animacion
function animate()
{
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(let i=0;i<particlesArray.length;i++)
    {
        particlesArray[i].update();

    }
    connect();

} 
// conexiones
function connect()
{
    for (let a=0;a<particlesArray.length;a++)

        {
                    for(let b=0;b<particlesArray.length;b++)
                    {
                        let distance=((particlesArray[a].x-particlesArray[b].x)*(particlesArray[a].x-particlesArray[b].x))
                        +((particlesArray[a].y-particlesArray[b].y)*(particlesArray[a].y-particlesArray[b].y));
                        if(distance<(canvas.width/7)*(canvas.height/7))
                
                        {
                               ctx.lineWidth=1;
                                ctx.strokestyle='rgba(140,85,31,1)';
                                ctx.beginPath();
                                ctx.moveTo(particlesArray[a].x,particlesArray[a].y);
                                ctx.lineTo(particlesArray[b].x,particlesArray[b].y);
                                ctx.stroke();
                        }

                    }
        }
}
init();
animate();