window.scrollTo(0, 0);

/* ARROW FOLLOW ANIMATION */
class Ticker {
  
    maxElapsedMS = 100;
    lastTime = -1;
    elapsedMS = -1;
    deltaTime = 1;
    speed = 1;
    listeners = [];
    started = false;
    
    constructor(fps = 60) {
      this.targetFPMS = fps / 1000;
    }
    
    add(listener) {
      this.listeners.push(listener);
      
      if (this.listeners.length && !this.started) {
        this.started = true;
        requestAnimationFrame(this.update);
      }
    }
    
    update = (currentTime = performance.now()) => {
      
      this.elapsedMS = currentTime - this.lastTime;
    
      this.deltaTime = this.elapsedMS * this.targetFPMS * this.speed;
  
      if (this.elapsedMS > this.maxElapsedMS) {
        this.elapsedMS = this.maxElapsedMS;
      }
    
      for (let listener of this.listeners) {
        listener(this.deltaTime);
      }
         
      this.lastTime = currentTime;
    
      requestAnimationFrame(this.update);
    }
  }
  
  const svg = document.querySelector("#arrow_box");
  var mouse = svg.createSVGPoint();
  var point = svg.createSVGPoint();
  var mouseMoved = true;
  var ticker = new Ticker();

  var arrow = {  
    element: document.querySelector("#arrow"),
    speed: 0.1,  
    rotation: 0,
    x: 0,
    y: 0
  };
  
  TweenLite.set("#arrow", {
    transformOrigin: "center",
    xPercent: -50,
    yPercent: -50
  });
  
  document.body.addEventListener("mousemove", onMouseMove);
  // svg.addEventListener("mousemove", onMouseMove);
  
  ticker.add(update);
  
  function update(delta) {
     
    if (mouseMoved) {  
      point = mouse.matrixTransform(svg.getScreenCTM().inverse());
      mouseMoved = false;
    }
    
    // Don't run if there are no changes. 
    if (arrow.x !== point.x && arrow.y !== point.y) {
              
      // Adjust delta to account for lag
      var dt = 1 - Math.pow(1 - arrow.speed, delta);
      
      arrow.x += (point.x - arrow.x) * dt;
      arrow.y += (point.y - arrow.y) * dt;
          
      var dx = point.x - arrow.x;
      var dy = point.y - arrow.y; 
      
      arrow.rotation = Math.atan2(dy, dx); 
              
      if (Math.abs(dx) < 0.1) {
        arrow.x = point.x;
      }
      
      if (Math.abs(dy) < 0.1) {
        arrow.y = point.y;
      }
          
      TweenLite.set(arrow.element, {
        rotation: arrow.rotation + "_rad",
        x: arrow.x,
        y: arrow.y
      });
    }
  }
  
  function onMouseMove(event) {  
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("Mouse ",event.x ,event.y)
    mouseMoved = true;
  }
/* ARROW FOLLOW ANIMATION */
$(window).click(function(e){
  console.log(e.target)
})

setTimeout(()=>{
  $("#txt").css("opacity","1")
},100)

dev = 0

if(dev == 0){
  setTimeout(()=>{
  $("#FRONT").css({
    "transform":"scale(0.1)",
    "opacity":"0"
  })
  },5000)
  
  setTimeout(()=>{
  $("#FRONT").css({
    "display":"none"
  })
  document.body.style="overflow-y : scroll !important"
  document.getElementById("Main").style = "animation: bodyAniGrow 1500ms ease-in-out forwards;"
  $("#nav").css({
    "opacity":"0.2"
  })
  $("#progressPath").css({
    "opacity":"0.5"
  })
  },8000)
}


