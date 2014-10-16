document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('video');
    var c = document.getElementById('bgCanvas');
    var ctx = c.getContext('2d');   
    
    //When user click PLAY
    v.addEventListener('play', function(){
        //Set video size to canvas
        c.width = v.clientWidth;
        c.height = v.clientHeight;
        drawBg(this, ctx, c.width, c.height);
    },false);
},false);

//Draw grayscale background
function drawBg(video, context, width, height)
{
    if(video.paused || video.ended) return false;
    
    //Draw the frame to canvas
    context.drawImage(video, 0, 0, width, height); 
        
    //Get image data from the canvas
    var frmData = context.getImageData(0, 0, width, height);
    var pData = frmData.data;
    
    //Acess all pixels and grayscale them
    var length = pData.length;
    for (var i=0; i<length; i+=4)
    {                    
        var gray = pData[i]*0.3 + pData[i+1]*0.59 + pData[i+2]*0.11;
        pData[i] = gray;
        pData[i+1] = gray;
        pData[i+2] = gray;
    }
    
    frmData.data = pData;
    
    //Redraw on the canvas
    context.putImageData(frmData, 0, 0);
    
    //Repeat
    setTimeout(drawBg, 20, video, context, width, height); 
}

