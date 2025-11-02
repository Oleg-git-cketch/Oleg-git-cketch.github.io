// Эффект появления при скролле
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
    const trigger = window.innerHeight / 1.2;
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < trigger) sec.classList.add("visible");
    });
});

// Плавный скролл с учетом фиксированного header
const header = document.querySelector('header');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // высота header
            const headerHeight = header.offsetHeight;
            // позиция цели относительно документа
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10; // -10 для отступа
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// MATRIX
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}
resizeCanvas();

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>:{}[]()#@";
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00bfff";
  ctx.font = fontSize + "px monospace";
  for(let i=0; i<drops.length; i++){
    const text = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text, i*fontSize, drops[i]*fontSize);
    if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(draw,33);

window.addEventListener('resize', () => {
  resizeCanvas();
  columns = canvas.width / fontSize;
  drops = Array(Math.floor(columns)).fill(1);
});
