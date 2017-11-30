var fruits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// тип рубашки
function typeCard() { 
    var picture = document.getElementById("selectID").value;    
    return picture;
};
// количество карт
function difficultly() {
	var fild = document.getElementById("selectDif").value;
	return fild;
}
// заполнить поле картами
function play() {
	if (typeCard() == "images/111.gif") {
	    for (let i=4; i<difficultly(); i++){
		    var newDiv = document.createElement('div');
            newDiv.style="display:inline-block; margin:10px";
            newDiv.innerHTML='<img style="height:135px; width:135px; cursor:pointer; border:solid 5px blue;" src="images/111.gif" alt="apple">';
            newDiv.className="reverse"+i;
            document.body.appendChild(newDiv);
            document.querySelector('.reverse'+i).addEventListener('click',function(){
                document.body.children[i].innerHTML='<img style="height:135px; width:135px; border:solid 5px green;" src="images/1.gif" alt="pinapple">';
            });
        }
	} else if (typeCard() == "images/222.gif") {
	    for (let i=4; i<difficultly(); i++){
		    var newDiv = document.createElement('div');
            newDiv.style="display:inline-block; margin:10px";
            newDiv.innerHTML='<img style="height:135px; width:135px; cursor:pointer; border:solid 5px blue;" src="images/222.gif" alt="apple">';
            newDiv.className="reverse"+i;
            document.body.appendChild(newDiv);
            document.querySelector('.reverse'+i).addEventListener('click',function(){
                document.body.children[i].innerHTML='<img style="height:135px; width:135px; border:solid 5px green;" src="images/2.gif" alt="pinapple">';
            });
        }
	} else if (typeCard() == "images/333.gif") {
	    for (let i=4; i<difficultly(); i++){
		    var newDiv = document.createElement('div');
            newDiv.style="display:inline-block; margin:10px";
            newDiv.innerHTML='<img style="height:135px; width:135px; cursor:pointer; border:solid 5px blue;" src="images/333.gif" alt="apple">';
            newDiv.className="reverse"+i;
            document.body.appendChild(newDiv);
            document.querySelector('.reverse'+i).addEventListener('click',function(){
                document.body.children[i].innerHTML='<img style="height:135px; width:135px; border:solid 5px green;" src="images/3.gif" alt="pinapple">';
            });
        }
	}
};