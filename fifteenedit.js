var powg = ["image001.jpg", "image002.jpg", "image003.jpg", "image004.jpg", "image005.jpg", "image006.jpg", "image007.jpg", "image008.jpg", "image009.jpg", "image010.jpg", "image011.jpg", "image012.jpg", "image013.jpg", "image014.jpg", "image015.jpg", "image016.jpg"];
var full = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true];
var points = [{x:0, y:0}, {x:101, y:0}, {x:202, y:0}, {x:303, y:0}, {x:0, y:101}, {x:101, y:101}, {x:202, y:101}, {x:303, y:101}, {x:0, y:202}, {x:101, y:202}, {x:202, y:202}, {x:303, y:202}, {x:0, y:303}, {x:101, y:303}, {x:202, y:303}, {x:303, y:303}];
var tilep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];

function newgame(){
	
	var out = "";
	var i;
	var x = 0;
	var y = 0;
			
		for(i=0; i<powg.length-1;i++){	
			out += '<div id="tile'+i+'" onclick="check(this,\''+i+'\')">';
			out += "<img src=" +powg[i] + ">";
			out += '</div>';
		}
						
	document.getElementById("container").innerHTML = out;
	
	
	for(i=0; i<powg.length-1;i++){
		if(x>400){
			x=0;
			y+=101;
		}
		document.getElementById("tile"+i).style.left = x + 'px';
		document.getElementById("tile"+i).style.top = y + 'px';
		x+=101;
	}
}

function check(tile, pos){	
	var x = parseInt(pos);
	var position = tilep.indexOf(x);
	document.getElementById("work").innerHTML = position;
	
	if(full[position+1]){//check box to the right
		if(position==3 || position==7 || position==11){
			return;
		}
		slide(tile, position, position +1);
	}
	else if(full[position-1]){//check box to the left
		if(position==4 || position==8 || position==12){
			return;
		}
		slide(tile, position, position-1);
	}
	else if(full[position-4]){//check box at the top
		slide(tile, position, position-4);
	}
	else if(full[position+4]){//check box at the bottom
		slide(tile, position, position+4);
	}
}

function slide(tile, start, end){//animate movement 
	var swap;
	var x1 = points[start].x;
	var y1 = points[start].y;
	var x2 = points[end].x;
	var y2 = points[end].y;
	full[end] = false;
	full[start] = true;
	tilep[end] = tilep[start];
	tilep[start] = null;
	document.getElementById("test").innerHTML = tilep[start]+" "+ tilep[end];
	var id = setInterval(frame,5);
	function frame(){		
		if(x1==x2 && y1==y2){
			clearInterval(id);
		}else{			
			if(x1!=x2 && x1<x2){
				x1++;
			}
			if(y1!=y2 && y1<y2){
				y1++;
			}		
			if(x1!=x2 && x1>x2){
				x1--;
			}	
			if(y1!=y2 && y1>y2){
				y1--;
			}
			tile.style.top = y1 + 'px';
			tile.style.left = x1 + 'px';	
		}
	}
	
}
