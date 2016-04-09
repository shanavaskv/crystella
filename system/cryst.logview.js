/**
 * @author shanavas
*/

CRYST.logView = function (){

  var nL = 5;
  var lcount = 0;
  var vText = [];
  var ltext = [];

  var lcontainer = document.createElement('div');
  lcontainer.style.cssText = 'width:80px;opacity:0.9;cursor:pointer;position:absolute;right:10px;bottom:10px';
  lcontainer.addEventListener('click',function(e){alert('hi')});
  
  var lbox = document.createElement('div');
  lbox.style.cssText = 'padding:0 0 3px 3px; text-align:left; background-color:#000722;';
  lcontainer.appendChild( lbox );

  for (var i = 0; i < nL; i++){
    ltext[i] = document.createElement('div');
    ltext[i].style.cssText = 'color:#c6c4c4;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
    ltext[i].innerHTML= '';
    lbox.appendChild( ltext[i] );
  }

  return {
    domElement: lcontainer,
    log: function(text){
      vText[lcount] = text;
      for (var i = 0; i < nL-1; i++){
        ltext[i].textContent = ltext[i+1].textContent;
      }
      ltext[nL-1].textContent = text;
    }
  }

};
