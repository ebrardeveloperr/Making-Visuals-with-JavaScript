const canvasSketch = require('canvas-sketch');
const random= require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');
const { createPath } = require('canvas-sketch-util/penplot');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate:true
};


const prams={
  col :10 ,
  row:10,
  scaleMin:1,
  scaleMax:30,
  freq: 0.001,
  amp:0.2,
  frame:0,
  animate:true,
  lineCap:'butt',
  color:'black',

}


const sketch = () => {
  return ({ context, width, height ,frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const col=prams.col;
    const row=prams.row;
    const numCell=col*row;

    const gridw=width * 0.8;
    const gridh=height * 0.8;
    const cellw=gridw / col;
    const cellh=gridh / row;
     const mergx= (width -gridw) * 0.5;
     const mergy= (height -gridh) * 0.5; 

     for(let i=0;i<numCell ;i++){
      const cols=i%col;
      const rows=Math.floor(i/col);


      const  x=cols* cellw;
      const y=rows * cellh;
      const w=cellw *0.8;
      const h=cellh *0.8;



      const f=prams.animate ? frame:prams.frame;

      // const n=random.noise2D(x + frame *10,y,prams.freq);
      const n=random.noise3D(x ,y,+ f *10,prams.freq);


      const angle=n* Math.PI *prams.amp;

      // const scale = (n+1)/2*30;
      // const scale =(n *0.5 +0.5 )*30;
      const scale = math.mapRange(n, -1, 1, prams.scaleMin, prams.scaleMax);

      let strokeColor;
if (prams.color === 'random') {
  strokeColor = `hsl(${random.range(0, 360)}, 70%, 50%)`; // new random color each call
} else {
  strokeColor = prams.color;
}



      context.save();

      context.translate(x,y);

      context.translate(mergx,mergy);
      context.translate(cellw*0.5,cellh*0.5);
      context.rotate(angle);

      context.lineWidth=scale;
      context.lineCap=prams.lineCap;


      context.beginPath();
      context.moveTo(w* -0.5 ,0);
      context.lineTo(w* 0.5 ,0);
      context.strokeStyle = strokeColor;
      context.stroke();


      context.restore();





     }
    


  };

 


};
 const createPane =()=>{
    const pane=new Tweakpane.Pane();
    let folder;
    folder=pane.addFolder({title:'Grid'});
    folder.addInput(prams ,'lineCap' , {options :{butt:'butt'  ,round:'round'  ,square:'square'}});
    folder.addInput(prams ,'color' , {options :{black:'black'  ,gray:'gray'  ,random:'random' ,white :'white'}});
    

    folder.addInput(prams ,'col' ,{min:2 ,max:50 ,step:1});
    folder.addInput(prams ,'row' ,{min:2 ,max:50 ,step:1});
    folder.addInput(prams ,'scaleMin' ,{min:1 ,max:100});
    folder.addInput(prams ,'scaleMax' ,{min:1 ,max:100});


    folder=pane.addFolder({title:'Noise'});
    folder.addInput(prams ,'freq' ,{min:-0.01 ,max:0.01});
    folder.addInput(prams ,'amp' ,{min:0 ,max:1});
    folder.addInput(prams ,'animate');
    folder.addInput(prams ,'frame' ,{min:0 ,max:999});
  };

createPane();
canvasSketch(sketch, settings);
