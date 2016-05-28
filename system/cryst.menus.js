/**
* @author shanavas
*/

CRYST.Menus = function (){

  var ul = document.getElementById("menu-top-inner");
  var a = document.createElement('a');
  a.href = '#';
  a.setAttribute("class","menu-top-link");
  var li = document.createElement("li");
  var i = document.createElement('i');
  i.setAttribute("class","fa fa-folder-open-o fa-1x");
  i.setAttribute("id","menus");
  li.appendChild(i);
  li.appendChild(document.createElement('br'));
  li.appendChild(document.createTextNode("open"));
  a.appendChild(li);
  ul.appendChild(a);

  function topmenuToggle() {
    document.querySelector('.menu-ico').classList.toggle('fa-bars');
    document.querySelector('.menu-ico').classList.toggle('fa-times');
    document.querySelector('.menu-top').classList.toggle('active');
    document.querySelector('#menus').classList.toggle('menu-circle');
    // document.querySelector('.menu').classList.toggle('active');
  }

  document.querySelector('.menu-btn').addEventListener('click', topmenuToggle);

}
