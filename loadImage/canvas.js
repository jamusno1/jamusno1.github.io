var img = null;

//Read new image
function getNewFile(files)
{
    file = files[0];
	var reader = new FileReader();

	reader.onload = function (event) 
	{
		draw(event.target.result);
	};
	reader.readAsDataURL(file);
}

//Draw image
function draw(srcLink)
{
    var c = document.getElementById("myCanvas");
        
    var ctx = c.getContext("2d");
    
    //Clear the canvas
    ctx.clearRect(0, 0, c.width, c.height);
    
    img = new Image();                
    
    //Wait until loading image is done
    img.onload = function()
    {
        c.width = img.width;
        c.height = img.height;
        ctx.drawImage(img, 0, 0);        
    }
    img.src = srcLink;
}

//Grayscale the image
function grayscale()
{    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    
    //Get image data from the canvas
    var imgData = ctx.getImageData(0, 0, img.width, img.height);
    
    //Acess all pixels
    for (var i=0; i<imgData.data.length; i+=4)
    {                    
        var gray = imgData.data[i]*0.3 + imgData.data[i+1]*0.59 + imgData.data[i+2]*0.11;
        imgData.data[i] = gray;
        imgData.data[i+1] = gray;
        imgData.data[i+2] = gray;
    }
    
    //Redraw on the canvas
    ctx.putImageData(imgData, 0, 0);                
}     

