// /js/typingBanner.js
export default async function initTypingBanner(root) {
  const text = (root?.dataset?.text || "").trim();
  const strong = (root?.dataset?.strong || "").trim();
  const speed = Number(root?.dataset?.speed || 24);   // ms por carácter
  const pause = Number(root?.dataset?.pause || 400);  // pausa entre normal y negrita

  // estructura
  root.innerHTML = `
    <div class="exp-intro__inner">
      <p class="exp-intro__text">
        <span class="exp-intro__t1"></span>
        ${strong ? ' <strong class="exp-intro__t2"></strong>' : ''}
        <span class="exp-intro__cursor" aria-hidden="true"></span>
      </p>
    </div>
  `;

  const t1 = root.querySelector(".exp-intro__t1");
  const t2 = root.querySelector(".exp-intro__t2");
  const cursor = root.querySelector(".exp-intro__cursor");

  const type = (str, node) =>
    new Promise(async (resolve) => {
      for (let i = 0; i < str.length; i++) {
        node.textContent += str[i];
        await new Promise((r) => setTimeout(r, speed));
      }
      resolve();
    });

  await type(text, t1);
  if (strong) {
    await new Promise((r) => setTimeout(r, pause));
    await type(strong, t2);
  }

  // ocultar cursor al finalizar
  cursor?.remove();
  root.classList.add("exp-intro--done");
}
