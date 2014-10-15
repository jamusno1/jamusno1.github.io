document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('video');
    var c = document.getElementById('bgCanvas');
    var ctx = c.getContext('2d');
    
    //Set video size to canvas
    c.width = v.clientWidth;
    c.height = v.clientHeight;
    
    //When user click PLAY
    v.addEventListener('play', function(){
        drawBg(this, ctx, c.width, c.height);
    },false);

},false);

//Draw grayscale background
function drawBg(video, context, width, height) {
    if(video.paused || video.ended) return false;
    
    //Draw the frame to canvas
    context.drawImage(video, 0, 0); 
        
    //Get image data from the canvas
    var frmData = context.getImageData(0, 0, width, height);
    
    //Acess all pixels and grayscale them
    for (var i=0; i<frmData.data.length; i+=4)
    {                    
        var gray = frmData.data[i]*0.3 + frmData.data[i+1]*0.59 + frmData.data[i+2]*0.11;
        frmData.data[i] = gray;
        frmData.data[i+1] = gray;
        frmData.data[i+2] = gray;
    }
    
    //Redraw on the canvas
    context.putImageData(frmData, 0, 0);
    
    //Repeat
    setTimeout(drawBg, 20, video, context, width, height); 
}