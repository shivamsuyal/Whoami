// TIMEPASS
var userAgent = navigator.userAgent
if(userAgent.match(/chrome|chromium|crios/i)){
    let progress = document.getElementById('progressbar')
    let progressPath = document.getElementById('progressPath')
    progress.style.top = "-0.25rem"
    progressPath.style.top = "-0.25rem"
    $(".fContainer div p").css({
      "width":"96%"
    })
}

// TIMEPASS

function ILink(pos){
  window.location.href = `${window.location.href.split("#")[0]}#${pos}`
}

/** SCROLL BAR */

let w_height = $(window).height();
let progress = document.getElementById('progressbar')

progress.width=w_height+"px"
document.getElementById("progressPath").width=w_height+"px"

progress.style.width = '0px'
progress.style.opacity = '0'

let totalHeight = document.body.scrollHeight-window.innerHeight;


/** SCROLL BAR */



let mColorChg = 0
/* WARP */
var mouse_warp = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
  // access mouse pos with mouse.x and mouse.y
  // function getMousePos(event) {
  //   return {
  //     x: event.clientX,
  //     y: event.clientY
  //   }
  // }
  // window.addEventListener('mousemove', function(event) {
  //   mouse_warp = getMousePos(event)
  // })
  var scene = new THREE.Scene();
  // scene.fog = new THREE.Fog('#e25822', 750, 1000);
  scene.fog = new THREE.Fog('white', 750, 1000);
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
  
  var renderer = new THREE.WebGLRenderer({
    canvas : document.getElementById("space")
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer. setClearColor("#000A14", 1 );
  
  function randint(min, max) {
    return Math.floor(Math.random() * max) + min
  }
  function int(num) {
    return Math.floor(num)
  }
        var stars = []
        var starCount = 600
        var cameraZ = 0
        function newStar() {
          gr = {}
          gr['geometry'] = new THREE.SphereGeometry( 1, 8, 8 )
          gr['material'] = new THREE.MeshBasicMaterial( { color: 'white'} );
          gr['sphere'] = new THREE.Mesh( gr['geometry'], gr['material'] );
          scene.add(gr['sphere'])
          w = window.innerWidth
          h = window.innerHeight
          w2 = w / 2
          h2 = h / 2
          gr['sphere'].position.x = randint(-w2, w)
          gr['sphere'].position.y = randint(-h2, h)
          gr['sphere'].position.z = cameraZ - 1000
          return gr
        }
  
  var lightSpeed = 1
  var speedStop = false
  
  // function lightS() {lightSpeed = 2}
  $("#Home p").click(function(){
    lightSpeed = 2
  });
  
  //end of elements
  camera.position.z = cameraZ;
  
  
  var render = function () {
    requestAnimationFrame( render );
    mainloop()
    renderer.render(scene, camera);
  };
  
  function mainloop() {
    if (stars.length < starCount) {
      stars.push(newStar())
    }
    for (var i = 0; i < stars.length; i++) {
      star = stars[i]
      if(star['sphere'].position.z > cameraZ) {
        scene.remove(star['sphere'])
        stars.splice(i, 1)
      }
      star['sphere'].scale.z = lightSpeed
    }
    if (speedStop == false) {
      if (lightSpeed > 1) {
      // console.log("hello")
      if(mColorChg == 1){
        mColorChg = 0
        $("#arrow").css({
          "fill":"white",
          "animation":"none"
        })
      }
      lightSpeed += 2
    }
      if (lightSpeed > 300) {

        speedStop = true
      }
    }
    else {
      lightSpeed -= 5
      if (lightSpeed < 2) {
        speedStop = false
        lightSpeed = 1
      }
    }
    if (lightSpeed > 150) {
      cameraZ -= lightSpeed / 2
    } else {
    cameraZ -= 1
    }
    camera.position.z = cameraZ
    // lookX = mouse_warp.x - window.innerWidth / 2
    // lookX /= 50
    // lookX = -lookX
    // lookY = mouse_warp.y - window.innerHeight / 2
    // lookY /= 50
    // //lookY = -lookY
    // lookAt = new THREE.Vector3(lookX, lookY, cameraZ - 10);
    // camera.position.z = cameraZ
    // camera.lookAt(lookAt);
    
  }
  render();
/* WARP */

// Hover warp mouse effect
$("#Home div p").hover(function (e) {
  // over
  mColorChg = 1
  $("#arrow").css({
    // "fill":"hsla(120, 100%, 47%,1)",
    "fill":"#00F200"
    // "animation":"arrow_ani1 2s linear forwards"
  })
}, function () {
  // out
  $("#arrow").css({
    "fill":"white",
    // "animation":"none"
  })
}
);
// Hover warp mouse effect


// BUNTTON RIPPLE EFFECT
$(".hoverMe").mousemove(function (e) { 
    e.target.style.setProperty("--x",e.pageX - $(this).offset().left + "px")
    e.target.style.setProperty("--y",e.pageY - $(this).offset().top + "px")
});
// BUNTTON RIPPLE EFFECT


const skillGlitch = new IntersectionObserver((entries)=>{
  // console.log("go")
  entries.forEach(e => {
      if(e.isIntersecting == true){
          $("#Home").css("position","static")
          // $("#Skills").css({
          //   "top":"0"
          // })
      }else{
          if(e.boundingClientRect.top > 0){
              // $("#Home").css("position","sticky")
              $("#Home").css("position","fixed")
              // $("#Skills").css({
              //   "top":"85vh"
              // })
          }
      }
      
  })
},{
  rootMargin : "0% 0px -90% 0px",
  // threshold : [0,1]
})
skillGlitch.observe(document.getElementById("Skills"));

// width 425
const skillObs = new IntersectionObserver((entries)=>{
entries.forEach(e => {
    // console.log(e)
    if(e.boundingClientRect.y >= 0){
      if(e.isIntersecting == true){
          e.target.style.marginLeft = "0px"
          e.target.style.marginRight = "0px"
      }else{
          e.target.style.marginLeft = "7rem"
          e.target.style.marginRight = "7rem"
      }
  }
})
},{
rootMargin : "10% 0px -30% 0px",
// threshold : [0,1]
})

// Window width
let sO = 0
if($(window).width() >= 550){
  console.log($(window).width(),"in")
  sO = 1
  skillObs.observe(document.getElementById("Skills"));
}



/* About */
$("#cmd_area").niceScroll({
  autohidemode: false,
  cursorborder: 'none',
  scrollspeed: 100,
  touchbehavior :true,
  cursorwidth :8,
  background:"#23252E",
  railpadding:{top:10,right:0,left:0,bottom:0}
})


$(window).resize(()=>{
  var terminal = $("#terminal");
  var terminalH = terminal.height();
  var terminalW = terminal.width();

  $("#redArea p").text(`${Math.round(terminalH)} x ${Math.round(terminalW)}`)
  
  // $("#footer_wapper").css({
  //   "height":$("#Fmail").height()+$("#Contact").height()+"px"
  // })

})

var terminal = $("#terminal");
var terminalH = terminal.height();
var terminalW = terminal.width();

var badge = $("#badge1").html()
console.log(badge)

$("#redArea p").text(`${Math.round(terminalH)} x ${Math.round(terminalW)}`)

var whoami_html = `
<p style="padding: 0 0 0 0.4rem">Hello Stranger !</p><br>
<span>
<p>
  My name is Shivam and I'm on a journey to become world's best cyber warrior.<br><br>
  My path is filled with many dangerous creatures that even the Tartarus couldn't restrain,like<br>
  Gidhra (The Binary Dragon), Beef (The Bull of Hidden Javascripts), Hydra (A Multi-Threaded Serpent) , Nmap (The Eye That Sees Everything), MSFVenom (The Combination of Deadliest Poisonous) and many more. <br><br>
  ..........
  <br>
  And my goal is simple, <b>"Tame Them ALL"</b>.
  <br><br><br>
  <div id="badge2">
  ${badge}
  </div>
</p>
</span>
`
var whoami_append = `
<div class="pre_cmd">
<p>u0_a126</p>
<p>∆ Engima [</p>
<p>#</p>
<p>]</p>
<p>---------------</p>
</div>
<div class="prompt">
<p>=></p>
<span style="width:1rem;border-left:1px solid white;margin-left:0.5rem;/*animation:blink 450ms 350ms linear infinite;*/"></span>
</div>
`

function exit(){
  
  $("#terminal_section").css("opacity","0")
  $("#cmd_area").delay(400).queue(function(){
      document.body.style = "overflow-y : scroll !important"
      $("#terminal_section").css("z-index",-10)
      $("#minimize").css("order",1)
      $("#maximize").css("order",2)
      $("#exit").css("order",3)
      $(this).html("")
      $(this).dequeue()
  })
}

$("#exit").click(exit)
$("#terminal_section").click(exit)

$("#aboutBnt").click(()=>{
  $("body").css("overflow","hidden")
  $("#cmd_area").html(`<div class="pre_cmd"><p>u0_a126</p><p>∆ Engima [</p><p>#</p><p>]</p><p>---------------</p></div><div class="prompt"><p>=></p><p class="cmd1">whoami</p><div id="cmd2"></div></div>`)
  $("#terminal_section").css({"opacity":"1","z-index":500,"display":"flex"})
  $("#cmd2").delay(4000).queue(function(){
      $(this).html(whoami_html)
      $("#cmd_area").append(whoami_append+"<br><br><br>")
      $(this).dequeue()
  })
})

$("#minimize").hover(function () {
  // over
  var o1 = $(this).css("order")
  var o2 = $("#exit").css("order")
  if(o1 <= o2){
      $("#exit").css("order",o1-1)
  }else{
      $("#exit").css("order",o1)
  }
}, ()=>{});

$("#maximize").hover(function () {
  // over
  var o1 = $(this).css("order")
  var o2 = $("#exit").css("order")
  if(o1 <= o2){
      $("#exit").css("order",o1-1)
  }else{
      $("#exit").css("order",o1)
  }

},()=>{});

/* About */


/** Projects */
const img_opacity = 0.3

$("#card1").hover(function () {
        // over
        $("#back_img1").css("opacity",img_opacity)
    }, function () {
        // out
        $("#back_img1").css("opacity",0)
    }
);

$("#card2").hover(function () {
        // over
        $("#back_img2").css("opacity",img_opacity)
    }, function () {
        // out
        $("#back_img2").css("opacity",0)
    }
);
$("#card3").hover(function () {
        // over
        $("#back_img3").css("opacity",img_opacity)
    }, function () {
        // out
        $("#back_img3").css("opacity",0)

    }
);
/** Projects */




/* Footer */
const eye = document.getElementById("illeye")
const eW = eye.clientWidth/2
const eH = eye.clientHeight/2
function eyeMove(mX,mY){
    x = eye.getBoundingClientRect().left + eW
    y = eye.getBoundingClientRect().top + eH
    rad = Math.atan2(mX-x,mY-y)
    rot = (rad * (180/Math.PI)*-1)+45
    eye.style.transform = "rotate("+rot+"deg)"
}
$("#footer").mousemove(function (e) { 
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    eyeMove(e.clientX,e.clientY)
    // console.log("Out")

});
$("#footer").mouseleave(function () { 
    // eye.style.transform = "rotate("+0+"deg)"
    eye.style.transform = "translate(-50%,-40%)"
    // console.log("Out")
});

const pPath = document.querySelectorAll("#pri g path");
for(let i = 0; i < pPath.length; i++){
    $(":root").css(`--p${i}`,`${pPath[i].getTotalLength()}px`)
    // console.log(`${pPath[i].getTotalLength()}px`)
}

// Svg pri
// red dot illEye 
let Cpri = 0
const pyramid = new IntersectionObserver((e)=>{
    // console.log(e[0].isIntersecting)
    if(e[0].isIntersecting === true && Cpri == 0){
        // console.log("in")
        $("#pri g path").css({
            "animation" : "pri_anim var(--pri_time) ease-in-out forwards,colorUp var(--color_up_time) var(--color_up_delay) ease forwards"
        })
        $("#illeye").css({
            "animation":"showEye var(--showEye) var(--delay_eye) ease forwards "
        })
        Cpri = 1
    }
},{
    // rootMargin : "0% 0% -10% 0%",
    threshold:0.6
})

pyramid.observe(document.getElementById("pri"))


/* Footer */






// Returns bottom offset value + or - from viewport top
function offsetBottom(el, i) { i = i || 0; return $(el)[i].getBoundingClientRect().bottom }

/* Window Functions */
window.onscroll = function(){
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    let w_height = $(window).height();
    var scrollPercent = scrollTop / (docHeight - w_height)*w_height;
    progress.style.width = scrollPercent + "px"
    if(scrollPercent == 0){
        progress.style.opacity = '0'
    }else{
        progress.style.opacity = '1'
    }
}

$(window).resize(function () {
  console.log("window Resize")
  // CANVAS
    renderer.setSize(window.innerWidth,window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix();

    
    var wW = $(window).width()

  // MBody
  if(wW > 500){
    var pP = $("#progressPath").height()
    $("#MBody").css({
      "margin-right":pP+15+"px"
    })
  }else{
    $("#MBody").css({
      "margin-right":"0px"
    })
  }
  

  // Terminal
    var terminal = $("#terminal");
    var terminalH = terminal.height();
    var terminalW = terminal.width();

    $("#redArea p").text(`${Math.round(terminalH)} x ${Math.round(terminalW)}`)
    
    // Sillks responsive-ness
    if(wW < 550 && sO == 1){
      e1 = document.getElementById("Skills")
      skillObs.unobserve(e1)
      e1.style.margin = "0"
    }else if(wW > 550 && sO == 0){
      sO = 1
      skillObs.observe(document.getElementById("Skills"));
    }

  // :ROOT
    $(":root").css({
      "--bW" : wW-pP + "px",
      // "--bW" : $(window).width()-pP + "px",
      "--cmdH" : offsetBottom("#terminal") - $("#cmd_area").offset().top - 20 + "px"
    })
});

/* Window Functions */

setTimeout(()=>{
  $(window).resize()
},1000)




