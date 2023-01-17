export function integral(data) {
  let [a, b] = data;
  let delta = (b-a)/1000;
  let resultado;

  resultado = (a != b ) ? calculo(delta, data, 1, a) : 0;

  return resultado;
}

function calculo(delta, data, cont, incre){
  let suma = 0;

  if (incre <= data[1]) {
    suma = (funccion1(data, incre) * delta) + calculo(delta, data, cont+1, data[0] + (delta*cont));
  }
  return suma;
}

function funccion1(data, x){
  let [, , mu, sigma] = data;
  let funcion = (1/(sigma*Math.sqrt(2*Math.PI)))*(Math.pow(Math.E, ((-(1/2))*Math.pow(((x-mu)/sigma), 2))));

  return(funcion);
}

let bn;
let num;

export function compBn(b){
  bn = new Array();
  num = new Array();

  let data = new Array();
  let delta = 0.001;

  data[0] = -6;
  data[1] = -6 + delta;
  data[2] = 0;
  data[3] = 1;

  let cont = 2;

  while(data[1] != b){
    num.push(data[1]);
    bn.push((data[0] != b ) ? calculo(delta, data, 1, data[0]) : 0);
    data[1] = -6 + delta*(cont); 
    cont ++;
  }

  return {bns: bn, nums: num};
}

function clc1(b, data, delta, cont){
  if(data[1] != b){
    num.push(data[1]);
    bn.push((data[0] != b ) ? calculo(delta, data, 1, -6) : 0);
    console.log(bn[bn.length-1]);

    data[1] = -6 + delta*(cont);
    clc1(b, data, delta, cont + 1); 
  }
  return;
}

self.addEventListener('message', (evt) => {
  const {value} = evt.data;
  const values = compBn(value);

  self.postMessage({values});
})