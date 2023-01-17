import {integral} from "./calc.js";

const datos = document.getElementsByClassName('datos');
const calcular = document.getElementById('calcular');
const toast = document.getElementById('liveToast');
const result = document.getElementById('result');

export function ejer1(popoverList) {
    popoverList[0].disable();

    for (const iterator of datos) {
      iterator.addEventListener('keydown', (e) => {
        if (isNaN(e.key) && e.key != "Backspace" && e.key != "." && e.key != "-" && e.key != "Tab" && e.key != "ArrowLeft" && e.key != "ArrowRight") {
          e.preventDefault();
        }
      });
    }
    
    datos[3].addEventListener("focusout", (e) => {
      if (parseInt(datos[3].value) > 0.0) {
        popoverList[0].disable();
      }else{
        popoverList[0].enable();
      }
    });
    
    calcular.addEventListener('click', (e) => {
      e.preventDefault;

      let valores = new Array();
      
      for (const iterator of datos) {
        if(iterator.value != ""){
          valores.push(iterator.value);
        }else{
          return;
        }
      }
    
      valores = valores.map((item) => {
        let aux;
        aux = parseFloat(item);
        return aux;
      });
    
      if(valores[3] <= 0.0){
        return;
      }
    
      showResult(integral(valores));
    });
}

function showResult(res){
  const div = document.createElement('div');
  const msg = document.createTextNode(`${res}`);

  div.appendChild(msg);

  if(result.children.length > 0){
    result.children[0].remove();
  }

  result.appendChild(div);

  const toaste = new bootstrap.Toast(toast);
  toaste.show();
}