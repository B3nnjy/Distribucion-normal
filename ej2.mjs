import { jsPDF } from "jspdf";

const b = document.getElementById('b');
const btnImprimir = document.getElementById('imprimir');
const worker = new Worker("tabla.mjs", {
    type: "module"
});
const load = document.getElementById('load');

load.style.display = 'none';

export function ejer2(){
    b.addEventListener('keydown', (e) => {
        if (isNaN(e.key) && e.key != "Backspace" && e.key != "." && e.key != "-" && e.key != "Tab" && e.key != "ArrowLeft" && e.key != "ArrowRight") {
            e.preventDefault();
          }
    });

    btnImprimir.addEventListener('click', (e) => {
        e.preventDefault();
        let valueB = parseFloat(b.value);

        worker.postMessage({value: valueB});

        btnImprimir.style.display = 'none';
        load.style.display = 'inline-block';
    });
}

worker.addEventListener('message', (evt) => {
    const {values} = evt.data;
    let bns, num;

    btnImprimir.style.display = 'inline-block';
    load.style.display = 'none';

    bns = values.bns;
    num = values.nums;

    imprimir(bns, num, parseFloat(b.value)); 
});

function imprimir(bns, num, valueB){
    const doc = new jsPDF();

    doc.addImage("./Integral2.png", 90, 1, 35, 13);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal", "bold");
    doc.text("a = -6", 10, 13);
    doc.text(`b = ${valueB}`, 10, 8);
    doc.text(`b0(a+(n)(`, 150, 8);
    doc.addImage("./triangle.png", 165,5, 3,3);
    doc.text(`))  -> bn(b)`, 168, 8);
    doc.addImage("./triangle.png", 22,10, 3,3);
    doc.text(` = 0.01`, 25, 13);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal", "normal");

    let limSup = 20;
    let y = 20;
    let x = 10
    let cont = 0;
    bns.forEach((item) => {
        doc.text(`F(${parseFloat(num[cont]).toFixed(3)}) = `, x, y);
        doc.text(`${parseFloat(item).toFixed(16)}`, x + 15, y);
        cont++;
        y += 5;

        if(y == 295){
            y = limSup;
            x += 50;
        }

        if(x > 200){
            doc.addPage();
            limSup = 10;
            y = limSup;
            x = 10;
        }

    })
    doc.save("resultados.pdf");
}