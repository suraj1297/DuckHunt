import { bird } from "./bird2-1.js";

import { bird2 } from "./bird2-2.js";

import { bird3 } from "./bird2.js";

async function drawBird() {
  Promise.all([bird(), bird2()]);
}

export { drawBird };
