var tags = [];
var tagString = "";
var num = 1;
var imageArray = [];
var loader = new Image();
loader.id = "loader";
loader.src = "loader.gif";

function addTag() 
{
	tagField = document.getElementById('tagDiv');
    tagField.innerHTML += '<div id = newTagDiv' + num + '><input type="text" id="tag'+num+'"/>' + "   "
	+ '<input type = "button" value = "-"  onClick = "removeTag(this)";>' + '<br /></div>';
    num++;
}

function removeTag(tagNum)
{
	tagDiv.removeChild(tagNum.parentNode);
}

function getTags() 
{
	tagString = "";
	tags[0] = document.getElementById('tag').value;
	for(j=1;j<num;j++)
		{
		input = document.getElementById('tag'+j).value;
		tags[j] = input;
		}
	for(i=0;i<num;i++)
		{
		tagString += tags[i] + ",";
		}
}

function getImages() 
{

	$(function () {
	$("#column_inner")
});

getTags();
	
	if(tagString == ",")
	{
		tagString = "";
		document.getElementById("column_inner").innerHTML = "No Tags Entered";
		document.getElementById('mainDisplay').innerHTML = "";
	}

	else
	{
		newScript = document.createElement('script');
		request = "https://www.flickr.com/services/rest/?";
		request += "method=flickr.photos.search";
		request += "&per_page=20";
		request += "&api_key=d1208025cbf1c9e894f7cc45d7dd4884";
		request += "&tags=" + tagString ;
		request += "&tag_mode=all";
		request += "&format=json";
		newScript.setAttribute('src', request);
		document.getElementsByTagName('head')[0].appendChild(newScript);
		$('#column_inner').html(loader);

	}

}

function jsonFlickrApi(images)
{
   newStr ="<ul id = 'thumbnails'>";
   selectedImage="<ul id='thumbnails'>";

   for (i = 0; i < images.photos.photo.length; i++ )
   {       
       url = "http://farm" + images.photos.photo[i].farm;
       url += ".static.flickr.com/";
       url += images.photos.photo[i].server+ "/";
       url += images.photos.photo[i].id+ "_";
       url += images.photos.photo[i].secret;
	 
	   thumburl = url + "_s.jpg" ;
	   main_url = url + "_b.jpg" ;
	   imageArray[i] = main_url;
	   
	   //added a link around the image tag and set it with an onclick that returns a value for the image clicked on. Also set the value to be the large image so you dont have to loop around an array or something to get the image url.
	   newStr += " <li><a onclick = get_li(this.id,"+i+")><img id = 'image"+i+"' src = " + thumburl + " value ="+ main_url +"></a></li>";     
    }
	if(newStr == "<ul id = 'thumbnails'>")
	{
	newStr +="</ul>";
	selectedImage+="</ul>";
	document.getElementById('mainDisplay').innerHTML = "No Results Found";
	document.getElementById('column_inner').innerHTML = "";
	}
	else{
	newStr +="</ul>";
	selectedImage+="</ul>";
	document.getElementById('column_inner').innerHTML = newStr;
	  centerImg(0);
   }
   	
  
}
var z = 0;//global z that doesen't change  while the function runs.

function get_li(id, j){//reads back in the appended value to the image that was clicked on.

var k = j;//initialised the variable

 if(z>0){//this if removes any elements of this tag if z is greater than 0 because there cant be more than one image on the main display area at a time.
 document.getElementById("MainImage").remove();
 }
 z++;



var mainURL = document.getElementById("image"+k).getAttribute("value");//get the url for the big image that was appended to the small image.
var mainImg = document.createElement('img');
	mainImg.setAttribute("id","MainImage");
	mainImg.setAttribute("src",mainURL);
	
	
var mainBox = document.getElementById("mainDisplay");

 mainBox.appendChild(mainImg);
//sad hand job??? xoxox
}




$(document).ready(function() { 

    $('#leftClick').click(function() {

        $('#column_inner').animate({
        'marginLeft' : "+=100px" 
        });
    });
    
    $('#rightClick').click(function() {
        $('#column_inner').animate({
        'marginLeft' : "-=100px" 
        });
    });   
});

$(document).keydown(function(e) { 
    switch (e.which) {
    case 37:
        $('#column_inner').animate({
        'marginLeft' : "+=95px" 
        }); 
        break;
    case 39:
        $('#column_inner').animate({
        'marginLeft' : "-=95px" 
        }); 
        break;
    }
})


function centering() 
{
	
	column_innerLeftOffset = document.getElementById("image0").offsetLeft;
	halfcolumn_outerW = document.getElementById("column_outer").offsetWidth / 2;
	halfImageW = document.getElementById("image0").offsetWidth / 2;
	column_outerLeftOffset = halfcolumn_outerW - halfImageW; 
	leftPos = column_outerLeftOffset - column_innerLeftOffset;
	document.getElementById("column_inner").style.left = leftPos + "px";
}


function displayImage()
{
	var tags_li = document.getElementsByTagName('li');
	var images = tags_li.length;		

	for ( var i = 0; i < images; i++ ) (function(i)
	{ 
		tags_li[i].onclick = function() 
		{
			var imageSrc = imageArray[i];
			document.getElementById('mainDisplay').innerHTML = "<img src="+imageSrc+">";
			return false;
		}	
	})(i)

}


