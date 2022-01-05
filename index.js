
var photo = document.querySelectorAll('.intro_img');

var num=0;
function imgnumation(){
 num++
 if(num>2){
     num=0;
 }

 if (num==0){
    photo[num].style.opacity="1";
    photo[2].style.opacity="0";
    }
    if (num==1){
       photo[num].style.opacity="1";
       photo[0].style.opacity="0";
       photo[2].style.opacity="0";
       } 
   if (num==2){
       photo[num].style.opacity="1";
       photo[0].style.opacity="0";
       photo[1].style.opacity="0";
       }   

}
setInterval("imgnumation()",4000);

//----------버튼------------------



var photo = document.querySelectorAll('.intro_img');

var num=0;
function imgnumation(){
 num++
 if(num>2){
     num=0;
 }

 if (num==0){
    photo[num].style.opacity="1";
    photo[2].style.opacity="0";
    }
    if (num==1){
       photo[num].style.opacity="1";
       photo[0].style.opacity="0";
       photo[2].style.opacity="0";
       } 
   if (num==2){
       photo[num].style.opacity="1";
       photo[0].style.opacity="0";
       photo[1].style.opacity="0";
       }   

}
setInterval("imgnumation()",4000);

