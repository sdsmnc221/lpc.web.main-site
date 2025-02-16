import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { onMounted, nextTick, watch } from "vue";

import "lenis/dist/lenis.css";

export default function useSmoothScroll() {
  const route = useRoute();

  const playMagic = () => {
    const lenis = new Lenis({
      content: document.body.querySelector("#__nuxt") as HTMLElement,
      wrapper: document.body,
    });

    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(raf);
  };

  onMounted(() => {
    nextTick(() => {
      playMagic();
    });
  });

  watch(
    () => route.path,
    () => {
      nextTick(() => {
        console.log(route.path);
      });
    }
  );

  return {
    playMagic,
  };
}
