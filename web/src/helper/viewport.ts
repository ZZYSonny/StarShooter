import { sleep } from "./general";

export type Point = [number, number];
export type PageRange = [number, number];
export type ViewRectangle = [number, number, number, number];

export function getCurVPBox(): ViewRectangle {
  return [
    window.scrollX + visualViewport.offsetLeft,
    window.scrollY + visualViewport.offsetTop,
    window.scrollX + visualViewport.offsetLeft + visualViewport.width,
    window.scrollY + visualViewport.offsetTop + visualViewport.height
  ];
}

export function getEarlyVPBox(k: number): ViewRectangle {
  const rect = getCurVPBox();
  rect[1] -= k * visualViewport.height;
  rect[3] += k * visualViewport.height;
  return rect;
}

export function evTransformer(
  name: string,
  time: number,
  start: null | (() => void),
  end: null | (() => void)
) {
  var counter = 0;
  var is_zooming = false;
  return async (ev: Event) => {
    const id = ++counter;
    if (!is_zooming) {
      is_zooming = true;
      if (name) console.log(`--Action: Begin ${name}--`);
      if (start) start();
    }
    await sleep(time);
    if (counter == id) {
      is_zooming = false;
      if (end) end();
      if (name) console.log(`--Action: End   ${name}--`);
    }
  };
}
