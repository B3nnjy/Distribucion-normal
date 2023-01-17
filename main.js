import { ejer1 } from "./ej1";
import { ejer2 } from "./ej2";

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

popoverList[1].show();


const btnAnt = document.getElementById('ant');
const btnSig = document.getElementById('sig');
const ej1 = document.getElementById('ej1');
const ej2 = document.getElementById('ej2');
const b = document.getElementById('b');
const btnImprimir = document.getElementById('imprimir');
const datos = document.getElementsByClassName('datos');
const calcular = document.getElementById('calcular');

b.setAttribute("disabled", "");
btnImprimir.setAttribute("disabled", "");

btnSig.children[0].addEventListener('click', () => {
  for (const iterator of datos) {
    iterator.setAttribute("disabled", "");
  }

  calcular.setAttribute("diabled", "");

  b.removeAttribute("disabled");
  btnImprimir.removeAttribute("disabled");
  btnAnt.children[0].style.display = "flex";
  btnSig.children[0].style.display = "none";
  popoverList[1].hide();
  popoverList[1].disable();
  ej1.style.transform = "translateX(-500px)";
  ej2.style.transform = "translateX(-500px)";
});

btnAnt.children[0].addEventListener('click', () => {
  for (const iterator of datos) {
    iterator.removeAttribute("disabled");    
  }

  calcular.removeAttribute("disabled");

  b.setAttribute("disabled", "");
  btnImprimir.setAttribute("disabled", "");
  btnAnt.children[0].style.display = "none";
  btnSig.children[0].style.display = "flex";
  ej1.style.transform = "translateX(0px)";
  ej2.style.transform = "translateX(0px)";
});

ejer1(popoverList);
ejer2();