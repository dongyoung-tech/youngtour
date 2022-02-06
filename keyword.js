function api(a){
    var xhr = new XMLHttpRequest();
    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'yX8wx5nzKb42wtBThegyX7gb6G3xUCPCMfbzNYF1Gf0p0nSUn9ZeynPzokq9GNLvrFLmqQVbU9%2FQz9LckJpQLw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('12'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
    queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /**/
    queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent(a);
    var link = window.location.href.split("?")[1];
    var link2 = decodeURI(link);
    queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(link2); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            document.querySelector(".main_page h1").innerHTML = "'" + link2 + "'" + " 검색결과";
            var xml = this.responseXML;
            var title = xml.getElementsByTagName('title');
            var image = xml.getElementsByTagName('firstimage');
            var addr = xml.getElementsByTagName('addr1');
            var content = xml.getElementsByTagName('contentid');
            var min = Math.min(image.length,addr.length,title.length);
            for(var i =0; i<min; i++){
                rdiv = document.createElement("div");
                document.querySelector(".main_container").appendChild(rdiv);
            }
            for(var i=0; i<min; i++){
                img = document.createElement("img");
                rh3 = document.createElement('h3');
                rh4 = document.createElement('h4');
                href = document.createElement('a');
                href.setAttribute('href',"./result.html?" +content[i].innerHTML);
                img.setAttribute('src',image[i].innerHTML);
                rh3.innerHTML = title[i].innerHTML;
                rh4.innerHTML = addr[i].innerHTML;
                document.querySelectorAll(".main_container div")[i].appendChild(img);
                document.querySelectorAll(".main_container div")[i].appendChild(rh3);
                document.querySelectorAll(".main_container div")[i].appendChild(rh4);
                document.querySelectorAll(".main_container div")[i].appendChild(href);
            }
        }
    };

    xhr.send('');
}
api("P");


function searchlink(){
    document.querySelector(".search_btn").setAttribute('onclick',"location.href='http://127.0.0.1:5500/keyword.html" + "?" +document.querySelector(".search_input").value + "'");
}

document.querySelector(".search_input").addEventListener("keyup",function(){searchlink();});
function clear(){
    document.querySelector(".after").classList.remove("after");
    while(document.querySelector(".main_container").childElementCount > 0){
        document.querySelector(".main_container").removeChild(document.querySelector('.main_container div')); 
    } 
}

document.querySelectorAll(".main_topic ul li")[0].addEventListener('click',function(){
    clear();
    document.querySelectorAll(".main_topic ul li")[0].classList.add("after");
    api("P");
});

document.querySelectorAll(".main_topic ul li")[1].addEventListener('click',function(){
    clear();
    document.querySelectorAll(".main_topic ul li")[1].classList.add("after");
    api("R");
});

document.querySelectorAll(".main_topic ul li")[2].addEventListener('click',function(){
    clear();
    document.querySelectorAll(".main_topic ul li")[2].classList.add("after");
    api("O");
});

