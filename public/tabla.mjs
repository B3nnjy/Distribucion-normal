function integral(data) {
  let [a, b] = data;
  let resultado;
  let delta = (b-a)/1000;

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

function compBn(b){
  const myHeader = new Headers();

  bn = new Array();
  num = new Array();

  let data = new Array();
  let delta = 0.01;

  data[0] = -6;
  data[1] = -6;
  data[2] = 0;
  data[3] = 1;

  let cont = 2;

  while(data[1] <= b){
    num.push(data[1]);
    bn.push(integral(data));
    data[1] = -6 + delta*(cont); 
    cont ++;
  }

  return {bns: bn, nums: num};
}

self.addEventListener('message', (evt) => {
  const {value} = evt.data;
  const values = compBn(value);

  self.postMessage({values});
})