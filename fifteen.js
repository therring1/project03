var cart = ["1image001.gif", "1image002.gif", "1image003.gif", "1image004.gif", "1image005.gif", "1image006.gif", "1image007.gif", "1image008.gif", "1image009.gif", "1image010.gif", "1image011.gif", "1image012.gif", "1image013.gif", "1image014.gif", "1image015.gif"];
var dragb = ["2image001.gif", "2image002.gif", "2image003.gif", "2image004.gif", "2image005.gif", "2image006.gif", "2image007.gif", "2image008.gif", "2image009.gif", "2image010.gif", "2image011.gif", "2image012.gif", "2image013.gif", "2image014.gif", "2image015.gif"];
var johnb = ["3image001.gif", "3image002.gif", "3image003.gif", "3image004.gif", "3image005.gif", "3image006.gif", "3image007.gif", "3image008.gif", "3image009.gif", "3image010.gif", "3image011.gif", "3image012.gif", "3image013.gif", "3image014.gif", "3image015.gif"];
var powg = ["4image001.gif", "4image002.gif", "4image003.gif", "4image004.gif", "4image005.gif", "4image006.gif", "4image007.gif", "4image008.gif", "4image009.gif", "4image010.gif", "4image011.gif", "4image012.gif", "4image013.gif", "4image014.gif", "4image015.gif"];
var proudf = ["5image001.gif", "5image002.gif", "5image003.gif", "5image004.gif", "5image005.gif", "5image006.gif", "5image007.gif", "5image008.gif", "5image009.gif", "5image010.gif", "5image011.gif", "5image012.gif", "5image013.gif", "5image014.gif", "5image015.gif"];
var full = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true];
var points = [{x:0, y:0}, {x:101, y:0}, {x:202, y:0}, {x:303, y:0}, {x:0, y:101}, {x:101, y:101}, {x:202, y:101}, {x:303, y:101}, {x:0, y:202}, {x:101, y:202}, {x:202, y:202}, {x:303, y:202}, {x:0, y:303}, {x:101, y:303}, {x:202, y:303}, {x:303, y:303}];
var tilep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
var end = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null];
var moves = 0;
function newgame(){
	
	var out = "";
	var i;
	var x = 0;
	var y = 0;
			for(i=0; i<cart.length;i++){	
			out += '<div id="tile'+i+'" onclick="check(this,\''+i+'\')" onmouseover="highl(this,\''+i+ '\')" onmouseout="rhighl(this)">';
			out +=  i+1;
			out += '</div>';
		}
		
		
		document.getElementById("container").innerHTML = out;
		
		for(i=0; i<cart.length;i++){
		if(x>400){
			x=0;
			y+=101;
		}		
		document.getElementById("tile"+i).style.left = x + 'px';
		document.getElementById("tile"+i).style.top = y + 'px';
		document.getElementById("tile"+i).style.backgroundImage = "url("+ cart[i]+ ")";
		x+=101;
	}
		
}

function check(tile, pos){	
	var x = parseInt(pos);
	var position = tilep.indexOf(x);
	
	
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
	moves++;
	var swap;
	var x1 = points[start].x;
	var y1 = points[start].y;
	var x2 = points[end].x;
	var y2 = points[end].y;
	full[end] = false;
	full[start] = true;
	tilep[end] = tilep[start];
	tilep[start] = null;
	
	var id = setInterval(frame,5);
	function frame(){		
		if(x1==x2 && y1==y2){
			clearInterval(id);
			if(tilep[15]==null && equal()){
				alert("Congratulations... You Won!!"); 	
				window.location.href = "http://codd.cs.gsu.edu/~therring5/Project3/puzzle2/won.html";
			}
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

function chBack(x){
	var test= "";
	var arr;
	var st;
	var i;
	var pos;
	if(x==1){
		arr = proudf;
	}
	else if(x==2){
		arr = cart;
	}
	else if(x==3){
		arr = dragb;
	}
	else if(x==4){
		arr = johnb;
	}
	else if(x==5){
		arr = powg;
	}
	
	for(i=0; i<tilep.length; i++){
		pos = tilep.indexOf(i);			
		if(pos!=null){	
			st = "tile"+i;
			document.getElementById(st).style.backgroundImage = "url("+ arr[i]+ ")";
		}
	}
	
}

function highl(tile, pos){
	
	var x = parseInt(pos);
	var position = tilep.indexOf(x);
	
	
	if(full[position+1]){//check box to the right
		if(position==3 || position==7 || position==11){
			return;		
		}
		tile.style.border = "solid red";
		tile.style.color = "#006600";
		tile.style.textDecoration = "underline";
		
	}
	else if(full[position-1]){//check box to the left
		if(position==4 || position==8 || position==12){
			return;
		}
		tile.style.border = "solid red";
		tile.style.color = "#006600";
		tile.style.textDecoration = "underline";
		
	}
	else if(full[position-4]){//check box at the top
		tile.style.border = "solid red";
		tile.style.color = "#006600";
		tile.style.textDecoration = "underline";
	}
	else if(full[position+4]){//check box at the bottom
		tile.style.border = "solid red";
		tile.style.color = "#006600";
		tile.style.textDecoration = "underline";
	}
}

function rhighl(tile){
	tile.style.border = "";
	tile.style.color = "red";
	tile.style.textDecoration = "";
}

function equal(){
	var x;
	for(x=0; x<end.length; x++){
		if(end[x]!=tilep[x]){
			return false;
		}
	}
	return true;
}


function shuffle(){
	var posnull;
	var posmove;
	var i;
	var x;
	var contr = 0;
	var st;
	
	for(i=0; i<100; i++){
		posnull = tilep.indexOf(null);
		x = Math.floor(Math.random()*4)+1;	
		if((contr==1 && x==2)|| (contr==2 && x==1) ){//reduces chances of moves undoing each other
			contr = 3;
		}	
		else if((contr==3&&x==4) ||(contr==4&&x==3)){//reduces chances of moves undoing each other
			contr = 1;
		}
		else{
			contr = x;
		}	
		
		
		if(x==1){			
			if((posnull-1)<0){
				continue;
			}			
			posmove = tilep[posnull-1];			
			st = "tile" + posmove;			
			checksh(st, posmove);
		}
		else if(x==2){
			if((posnull+1)>15){
				continue;
			}
			posmove = tilep[posnull+1];
			st = "tile" + posmove;			
			checksh(st, posmove);
		}
		else if(x==3){
			if((posnull-4)<0){
				continue;
			}
			posmove = tilep[posnull-4];			
			st = "tile" + posmove;
			checksh(st, posmove);
		}
		else if(x==4){
			if((posnull+4)>15){
				continue;
			}
			posmove = tilep[posnull+4];
			st = "tile" + posmove;			
			checksh(st, posmove);
		}
		
	}
}

function checksh(tile, pos){	
	
	var position = tilep.indexOf(pos);
	
	
	if(full[position+1]){//check box to the right
		if(position==3 || position==7 || position==11){
			return;
		}
		slidesh(tile, position, position +1);
	}
	else if(full[position-1]){//check box to the left
		if(position==4 || position==8 || position==12){
			return;
		}
		slidesh(tile, position, position-1);
	}
	else if(full[position-4]){//check box at the top
		slidesh(tile, position, position-4);
	}
	else if(full[position+4]){//check box at the bottom
		slidesh(tile, position, position+4);
	}
	
	
}

function slidesh(tile, start, end){//animate movement
	
	var swap;
	var x1 = points[start].x;
	var y1 = points[start].y;
	var x2 = points[end].x;
	var y2 = points[end].y;
	full[end] = false;
	full[start] = true;
	tilep[end] = tilep[start];
	tilep[start] = null;	
	document.getElementById(tile).style.top = y2 +'px';
	document.getElementById(tile).style.left = x2 +'px';
	
	
	
}


