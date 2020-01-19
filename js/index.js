// Your code goes here


/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
  
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}


const rotator = event=>{
    event.target.style.transform =`rotate(360deg)`;
    event.target.style.transition='transform 1s';
    event.target.removeEventListener('mouseover',rotator,false);
    event=event;
    setTimeout( function(){
        event.target.style.transform='rotate(0deg)';
        event.target.style.transition='transform 0s';
        event.target.addEventListener('mouseover',rotator,false);
    }, 3000 );
    
};

const rainbowColors = ['violet','indigo','blue','green','yellow','orange','red'];
const raibowBoxDrawerEventHandler = (eventType,isCapturing)=>{
    const handler = event=>{
        event.preventDefault();
        const originalColor = event.target.style.color;
        const colorTimeSec = 0.5;
        event.target.removeEventListener(eventType,handler,isCapturing);
        rainbowColors.forEach((color,idx,arr)=>{
            setTimeout( function(){
                event.target.style.color=color;
                event.target.style.transition=`color ${colorTimeSec.toString()}`;
                if(idx==arr.length-1){
                    setTimeout( ()=>{
                        event.target.style.color=originalColor;
                        event.target.style.transition=`background 0s}`;
                        event.target.addEventListener(eventType,raibowBoxDrawerEventHandler(eventType,isCapturing));
                    }
                        ,colorTimeSec*1000);
                }
            }, idx*colorTimeSec*1000 );
        });
    };
    return handler;
}



document.querySelector('.logo-heading').addEventListener('mouseover',rotator,false);
document.querySelectorAll('a').forEach(element=>element.addEventListener('click',raibowBoxDrawerEventHandler('click',false),false));
document.querySelectorAll('img').forEach(ele=>ele.addEventListener('mouseenter',event=>{
    event.target.style.transform = 'scale(1.1)';
    event.target.style.transition = 'transform 0.7s';
}));

document.querySelectorAll('img').forEach(ele=>ele.addEventListener('mouseleave',event=>{
    event.target.style.transform = 'scale(1)';
    event.target.style.transition = 'transform 0.7s';
}));

const terminalParagraph = document.createElement('p');
terminalParagraph.style.cssText = "background:black; font:5em consolas,monospace; color:lightgreen; display:none;";
const hostName = "pc";
terminalParagraph.textContent = `root@${hostName} # `;
document.querySelector('body').append(terminalParagraph);


const horrorAction = (attributes)=>{
    let isTerminalVisible = false;
    const handler = event =>{
        if(isTerminalVisible){
            console.log(event.key);
            terminalParagraph.textContent = terminalParagraph.textContent +event.key;
        }
        else{
            terminalParagraph.textContent=`root@${hostName} # ${event.key}`;
            terminalParagraph.style.cssText = "background:black; font:5em consolas,monospace; color:lightgreen; display:none;";
            terminalParagraph.style.display='block';
            openFullscreen(terminalParagraph);
            isTerminalVisible = true;
            setTimeout(()=>{
                terminalParagraph.style.background = 'white';
                terminalParagraph.style.color = 'purple';
                terminalParagraph.style.transition = 'background 2s, color 2s';
                setTimeout(()=>{ 
                    closeFullscreen();
                    terminalParagraph.style.display='none';
                    isTerminalVisible=false;
                },2000);
            },4000);
        }

        


    };
    return handler;
};
document.querySelector('body').addEventListener('keydown',horrorAction({'eventType':'keydown', 'isCapturing':false},false));





