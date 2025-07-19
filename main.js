// Encuentra el canvas HTML ya existente
const canvas = document.querySelector("canvas")

// Inicializa Hydra y le decimos que use ese canvas
const hydra = new Hydra({
  canvas: canvas,
  detectAudio: false,
  enableStreamCapture: false
})

// Inicia la cámara
s0.initCam({ crossOrigin: 'anonymous' })


// Definir los visuales
const visuals = [
  () => osc().add(s0).out(o0),
  () => noise().add(s0).out(o0),
  () => voronoi().add(s0).out(o0),
  () => gradient().add(s0).out(o0),
]

let currentVisual = 0

function changeVisual(index) {
  currentVisual = index
  visuals[currentVisual]()
  updateButtons()
}

// Asigna los botones
document.getElementById("btn0").onclick = () => changeVisual(0)
document.getElementById("btn1").onclick = () => changeVisual(1)
document.getElementById("btn2").onclick = () => changeVisual(2)
document.getElementById("btn3").onclick = () => changeVisual(3)

// Oculta el botón del visual activo
function updateButtons() {
  for (let i = 0; i < 4; i++) {
    document.getElementById(`btn${i}`).style.display = (i === currentVisual) ? "none" : "inline-block"
  }
}

// Captura pantalla del canvas actual
document.getElementById("screenshot").onclick = () => {
    const canvas = document.querySelector("canvas");
  
    // Crea un segundo canvas temporal (offscreen) del mismo tamaño
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
  
    // Copia el contenido del canvas WebGL a 2D
    try {
      tempCtx.drawImage(canvas, 0, 0);
      const link = document.createElement("a");
      link.download = `hydra-capture-${Date.now()}.png`;
      link.href = tempCanvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      alert("No se pudo capturar la imagen. Algunos navegadores bloquean esto por seguridad.");
      console.error(e);
    }
  };
  

// Inicia con visual 0
changeVisual(0)
