var resultpage = document.querySelector(".result_box");
function api(){
    morenum = 1;
    document.querySelector(".more_box").style.display ="inline-block";
    resultpage.style.height="1550px";
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('60'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /**/
    queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('P');
    var inputvalue = document.querySelector(".search_input").value; 
    encodeURIComponent(inputvalue);
    queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(inputvalue); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var xml = this.responseXML;
            var addr1 = xml.getElementsByTagName('addr1');
            var title = xml.getElementsByTagName('title');
            if(title.length < 1){
                alert('검색결과가없습니다')
            }
            var image = xml.getElementsByTagName('firstimage');
            var contentId = xml.getElementsByTagName('contentid');
            var typeid = xml.getElementsByTagName('contenttypeid');
            var min = Math.min(image.length,addr1.length,title.length);
            resultpage = document.querySelector('.result_box');
            document.querySelector('.result_page h1').style.display="inline-block";
            document.querySelector('.area_weather').style.display="inline-block";
            for(var i=0; i<min; i++){
                if(i < 12){
                    img = document.createElement('img');
                    rh = document.createElement('h3');
                    rh2 = document.createElement('h4');
                    rh3 = document.createElement('h5');
                    rh4 = document.createElement('h6');
                    rdiv = document.createElement('div');
                    rhref = document.createElement('a');
                    resultpage.appendChild(rdiv);
                    img.setAttribute('src',image[i].innerHTML);
                    rh.innerHTML = title[i].innerHTML;
                    rh2.innerHTML = addr1[i].innerHTML;
                    rh3.innerHTML = contentId[i].innerHTML;
                    rh4.innerHTML = typeid[i].innerHTML;
                    rdiv.setAttribute('data-value',i);
                    rhref.setAttribute('href',"./result.html?" +rh3.innerHTML);
                    document.querySelectorAll('.result_box div')[i].appendChild(img);
                    document.querySelectorAll('.result_box div')[i].appendChild(rh);
                    document.querySelectorAll('.result_box div')[i].appendChild(rh2);
                    document.querySelectorAll('.result_box div')[i].appendChild(rh3);
                    document.querySelectorAll('.result_box div')[i].appendChild(rh4);
                    document.querySelectorAll('.result_box div')[i].appendChild(rhref);
                }

            }
            if(document.querySelectorAll('.result_box div').length < 10){
                resultpage.style.height="auto";
                document.querySelector(".more_box").style.display ="none";
            }
        }
    };

    xhr.send('');
}

document.querySelector(".search_btn").addEventListener('click',function(){   
    var resultpage = document.querySelector('.result_box');
    if(document.querySelector('.result_box').childElementCount > 0){ 
        while(resultpage.childElementCount > 0){
                resultpage.removeChild(document.querySelector('.result_box div')); 
            }
        api();    
        return
    } 
    if (document.querySelector('.result_box').childElementCount == 0){
        api();
    }
});    


window.addEventListener('scroll',function(){
    if(document.documentElement.scrollTop>50){
        document.querySelector('.header').classList.add('after');
    }
    else{
        document.querySelector('.header').classList.remove('after'); 
    }
});
var morenum = 1;
    document.querySelector(".more_box").addEventListener("click",function(){
        if(document.querySelectorAll(".result_box div").length>((morenum+1)*6)){
            if(document.querySelectorAll(".result_box div").length-((morenum+1)*6)>3){
                var reheight = document.querySelector(".result_box").offsetHeight;
                document.querySelector(".result_box").style.height = reheight + 774 + "px";
                morenum = morenum + 1;
            }
            else{
                var reheight = document.querySelector(".result_box").offsetHeight;
                document.querySelector(".result_box").style.height = reheight + 387 + "px";
                morenum = morenum + 1;
            }
        }
        else{
            document.querySelector(".more_box").style.display ="none";
            morenum = 0;
            alert("모두 로드하였습니다.")
        }

    });


    