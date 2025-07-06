<template>
  <div
    class="cat-sheet"
    ref="catSheet"
    :class="{ '--hidden': !open && !isAnimating }"
  >
    <Teleport to="body">
      <div
        :class="`fixed w-[100vw] h-[100dvh] top-0 left-0 cat-sheet-for-group-${groupIndex} cat-sheet__overlay ${isAdressBarHidden ? '--dvh' : ''}`"
        :style="`--random-tint: ${tint.hsla};`"
      ></div>
    </Teleport>

    <div
      class="preview__item w-[100vw] h-[100dvh]"
      :style="`--random-tint: ${tint.hsl};`"
    >
      <div class="preview__item-img-outer">
        <div
          class="preview__item-close w-full md:w-auto absolute z-10 bottom-0 bg-black p-6 pointer-events-auto flex justify-center"
          @click="closeSheet"
        >
          <div>
            <div class="cat-sheet__trigger text-lg md:text-[24px]">
              Découvrez mes ami.e.s !
            </div>
          </div>
        </div>
      </div>

      <h2 class="preview__item-title oh" v-if="catItem">
        <span
          class="oh__inner"
          :class="`${catItem.index % 2 === 0 ? 'gloock-regular' : 'albert-sans-bold'} ${catItem.catname.length >= 10 ? 'text-8xl' : ''}`"
          >{{ catItem.catname }}</span
        >
      </h2>

      <div class="preview__item-subtitle oh text-center" v-if="catItem">
        <span
          class="oh__inner text-4xl"
          :class="`${catItem.index % 2 === 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
          >{{ catItem.catname }}</span
        >

        <p
          v-if="catItem && catItem.adoptionstatus"
          class="preview__item-status oh"
        >
          <span
            :class="`${catItem.index % 2 !== 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
            class="oh__inner"
            >{{ catItem.adoptionstatus }}
          </span>
          <span v-if="catItem.catsexe" class="oh__inner">
            {{ catItem.catsexe }}</span
          >
        </p>

        <span class="preview__item-meta text-sm oh" v-if="catItem"
          ><span class="oh__inner bg-black">
            Fiche publiée le {{ catItem.createddate }}</span
          ></span
        >
      </div>

      <div
        class="preview__item-box preview__item-box--left self-end"
        v-if="catItem"
      >
        <h3
          class="preview__item-box-title text-xl ml-2 oh"
          :class="`${catItem.index % 2 === 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
        >
          <span class="oh__inner">Contact</span>
        </h3>
        <div
          class="preview__item-contact preview__item-box-desc w-full md:w-4/5 flex flex-col justify-end"
        >
          <div class="text-xs mt-2">
            <a
              href="https://lespetitsclochards.fillout.com/pre-adoption"
              target="_blank"
            >
              <Badge class="badge">Formulaire d'adoption</Badge>
            </a>
          </div>

          <prismic-rich-text
            :field="catItem.adoptionRequirements"
            class="text-xs md:text-sm pl-2 mt-1 leading-tight"
          />

          <div class="text-xs mt-4" v-if="catItem.isfosterpossible">
            <a
              href="https://lespetitsclochards.fillout.com/chatmille-accueil"
              target="_blank"
            >
              <Badge class="badge">Formulaire d'accueil</Badge>
            </a>

            <p class="text-xs md:text-sm mt-1 leading-tight pl-2">
              Ce chat cherche aussi un accueil temporaire.
            </p>
          </div>

          <div class="text-xs mt-4">
            <p class="text-sm font-bold mt-1 leading-tight pl-2 mb-1 underline">
              Conditions d'adoption :
            </p>
            <ul class="list-none">
              <li>✅ Pro-vaccination & stérilisation</li>
              <li>✅ Suivi vétérinaire régulier</li>
              <li>✅ Adoption définitive & engagement à vie</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="preview__item-box preview__item-box--right">
        <div class="flex justify-between items-end mb-4 pr-2 oh">
          <div class="preview__item-info o pl-2 oh__inner" v-if="catItem">
            <p v-if="catItem.catagenumber && catItem.catagetype">
              🎂 {{ catItem.catagenumber }} {{ catItem.catagetype }}
            </p>
            <p v-if="catItem.catbirth">📅 {{ catItem.catbirth }}</p>
            <p v-else-if="catItem.catbirthyear">
              📅 {{ catItem.catbirthyear }}
            </p>
            <p v-if="catItem.zipcode">📍 {{ catItem.zipcode }}</p>
          </div>

          <div
            class="preview__item-box preview__item-badges flex flex-col items-center gap-2 preview__item-box-desc"
            v-if="catItem"
          >
            <Badge class="max-w-[120px] md:max-w-fit text-center">{{
              catItem.catidentification
            }}</Badge>

            <Badge class="md:max-w-fit">
              Stérilisation <br />
              Castration :
              {{ catItem.catsterilization ? "✅" : "❌" }}
            </Badge>

            <Badge class="md:max-w-fit">
              Vaccination : {{ catItem.catvaccination ? "✅" : "❌" }}
            </Badge>
          </div>
        </div>

        <div
          v-if="catItem && catItem.catdescription"
          :class="`${catItem.index % 2 === 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
        >
          <prismic-rich-text
            class="preview__item-box-desc md:ml-2 text-center text-xs md:text-base"
            :field="catItem.catdescription"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { Badge } from "@/components/ui/badge";

import { Flip } from "gsap/Flip";

import type { CatInfo } from "~/interfaces/Cat";
import { isMobile } from "~/lib/helpers";
import { PreviewItem } from "./PreviewItem";
import { ContentItem } from "./ContentItem";

type CatSheetInfo = {
  open: boolean;
  catItem: CatInfo | null;
  tint: {
    hsla: string;
    hsl: string;
  };
  groupIndex: number;
};

gsap.registerPlugin(Flip);

const props = defineProps<CatSheetInfo>();

const emits = defineEmits(["update:open-sheet"]);

const isAnimating: Ref<boolean> = ref(false);
const inPreview: Ref<boolean> = ref(false);
const catSheet = ref<HTMLDivElement | null>(null);

const previewItem = ref<PreviewItem | null>(null);
const contentItem = ref<ContentItem | null>(null);

const hasInfo = computed(
  () =>
    props.catItem?.catbirth ||
    props.catItem?.zipcode ||
    (props.catItem?.catagenumber && props.catItem?.catagetype)
);

const windowHeight = ref(0);

/**
 * Adress bar is hidden cases:
 * - on page load, adress bar is show
 * - on mounted, whether if is mobile and sheet is open
 * - on resiize, whether if is mobile and newHeight (height minus adress bar) < oldHeight
 */
const isAdressBarHidden = ref(true);

const closeSheet = () => {
  if (isAnimating.value) return;

  const contentOverlay = `.cat-sheet-for-group-${props.groupIndex}.cat-sheet__overlay`;
  isAnimating.value = true;

  previewItem.value.updateSlideTexts();
  previewItem.value.updateBoxDesc();
  previewItem.value.updateTextElements();

  gsap
    .timeline({
      defaults: {
        duration: 0.8,
        ease: "power4.inOut",
      },
      onStart: () => {
        isAnimating.value = true;
      },
      onComplete: () => {
        previewItem.value.DOM.el.classList.remove("preview__item--current");

        gsap.set(contentItem.value.DOM.el, { zIndex: 1 });

        inPreview.value = false;
        isAnimating.value = false;
        emits("update:open-sheet", { opened: false });
      },
    })
    .addLabel("start", 0)
    .addLabel("content", "start+=0.7")
    .to(
      previewItem.value.DOM.descriptions,
      {
        ease: "power2",
        opacity: 0,
      },
      "start"
    )
    .to(
      previewItem.value.DOM.descriptions,
      {
        yPercent: 15,
      },
      "start"
    )
    .to(
      previewItem.value.DOM.slideTexts,
      {
        yPercent: 100,
      },
      "start"
    )
    .to(previewItem.value?.DOM.textElements, { opacity: 0 }, ">")
    .add(() => {
      const flipstate = Flip.getState(contentItem.value.DOM.imgWrap);
      contentItem.value.DOM.button.insertBefore(
        contentItem.value.DOM.imgWrap,
        contentItem.value.DOM.button.children[1]
      );
      Flip.from(flipstate, {
        duration: 0.8,
        ease: "power4.inOut",
        absolute: true,
      });

      contentItem.value?.DOM.title.classList.remove("--previewing");
    }, "content")
    .to(
      contentOverlay,
      {
        scaleX: contentItem.value.DOM.el.offsetWidth / window.innerWidth,
        x: contentItem.value.DOM.el.offsetLeft,
        opacity: 0.48,
      },
      "content+=0.1"
    )
    .to(
      contentOverlay,
      {
        scaleY: 0,
        opacity: 0,
      },
      "content+=0.9"
    )
    .to(previewItem.value.DOM.close, { opacity: 0 }, "start");
};

const onOpenSheet = (
  contentItemEl: ContentItem,
  current: number,
  groupIndex: number
) => {
  const contentOverlay = `.cat-sheet-for-group-${groupIndex}.cat-sheet__overlay`;

  contentItem.value = contentItemEl;

  const tl = gsap
    .timeline({
      defaults: {
        duration: 0.8,
        ease: "power4.inOut",
      },
      onStart: () => {
        inPreview.value = true;

        previewItem.value.updateSlideTexts();
        previewItem.value.updateBoxDesc();
        previewItem.value.updateTextElements();

        // bodyEl.classList.add('preview-open');
        // gsap.set(contentItem.value.DOM.el, {zIndex: 10});

        gsap.set(previewItem.value?.DOM.close, { yPercent: 120, opacity: 0 });
        gsap.set(contentOverlay, {
          transformOrigin: current % 2 ? "0% 100%" : "0% 0%",
          scaleX: contentItem.value.DOM.el.offsetWidth / window.innerWidth,
          scaleY: 0,
          x: contentItem.value.DOM.el.offsetLeft,
          opacity: 0,
        });

        gsap.set(previewItem.value.DOM.textElements, { opacity: 0 });
        gsap.set(previewItem.value.DOM.slideTexts, { yPercent: 100 });
        gsap.set(previewItem.value.DOM.descriptions, {
          yPercent: (pos) => 100 * (pos + 1),
          opacity: 0,
        });

        previewItem.value.DOM.el.classList.add("preview__item--current");
      },
      onComplete: () => (isAnimating.value = false),
    })
    .addLabel("start", 0)
    .addLabel("content", "start+=0.6")
    .add(() => {
      contentItem.value.DOM.title.classList.add("--previewing");
    })
    .to(
      contentOverlay,
      {
        scaleY: 1,
        opacity: 0.32,
        zIndex: 11,
      },
      "start"
    )

    .to(
      contentOverlay,
      {
        scaleX: 1,
        x: 0,
        opacity: 1,
        duration: 1.6,
      },
      "start+=0.2"
    )
    .add(() => {
      const flipstate = Flip.getState(contentItem.value.DOM.imgWrap);
      previewItem.value.DOM.imgOuter.appendChild(contentItem.value.DOM.imgWrap);
      Flip.from(flipstate, {
        duration: 0.8,
        ease: "power4.inOut",
        absolute: true,
      });
    }, "content");

  setTimeout(() => {
    tl.to(previewItem.value?.DOM.textElements, { opacity: 1 }, ">")
      .to(
        previewItem.value.DOM.slideTexts,
        {
          duration: 1.1,
          ease: "expo",
          yPercent: 0,
        },
        ">-=0.2"
      )
      .to(
        previewItem.value.DOM.descriptions,
        {
          duration: 1.1,
          ease: "expo",
          opacity: 1,
          yPercent: 0,
        },
        ">-=0.2"
      )
      .to(
        previewItem.value?.DOM.imgOuter,
        { opacity: 1, duration: 0.64, ease: "expo" },
        ">-=0.6"
      )
      .to(
        previewItem.value?.DOM.close,
        {
          duration: 1.1,
          ease: "expo",
          opacity: 1,
          yPercent: 0,
        },
        ">-=0.7"
      );
  }, 480);
};

onMounted(() => {
  nextTick(() => {
    windowHeight.value = window.innerHeight;
    isAdressBarHidden.value = isMobile() && props.open;
  });
});

watch(
  () => catSheet.value,
  () => {
    if (catSheet.value) {
      previewItem.value = new PreviewItem(catSheet.value);
    }
  }
);

defineExpose({ onOpenSheet });
</script>

<style lang="scss">
body {
  .cat-sheet {
    .cat-item-img-wrap {
      overflow: hidden;
      position: relative;

      will-change: transform;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      width: 100vw;
      height: 100dvh;
      position: absolute;
      top: 0;
      left: 0;

      img {
        width: 100vh;
        height: auto;
        aspect-ratio: auto;
        opacity: 0.64;
        cursor: pointer;
      }
    }
  }

  .preview,
  .--current .content {
    &__item {
      &-img-outer {
        position: fixed;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          filter: none;
          border-radius: 0;
        }
      }
    }
  }
}

@media screen and (min-width: 53em) {
  body {
    &:has(.cat-sheet) {
      overflow: hidden;
    }

    .cat-sheet {
      .cat-item-img-wrap {
        align-items: center;
      }

      .preview,
      .--current .content {
        &__item {
          &-img-outer {
            img {
              width: auto;
              height: 72vh;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.cat-sheet {
  // width: 100vw;
  // height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;

  * {
    transition: all ease-in-out 0.64s;
  }

  z-index: 12;

  display: block;
  pointer-events: all;

  &.--hidden {
    opacity: 0;
    z-index: -99;
    pointer-events: none;
  }

  &__trigger {
    color: var(--white);
    display: inline-block;
    text-transform: uppercase;
  }

  &__overlay {
    --random-tint: var(--white);

    pointer-events: none;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0;

    width: 100vw;
    height: 100vh;

    background-color: var(--black);

    background-color: hsla(211.57894736842098, 8%, 58%, 1);
    background-image: radial-gradient(
        circle at 15% 85%,
        hsla(0, 0%, 0%, 1) 19%,
        transparent 84%
      ),
      radial-gradient(circle at 31% 1%, var(--random-tint), transparent 85%),
      radial-gradient(
        circle at 88% 87%,
        hsla(209.99999999999997, 6%, 38%, 1) 3.6400864520532363%,
        transparent 75.20902830975928%
      ),
      radial-gradient(
        circle at 30% 27%,
        hsla(209.99999999999997, 6%, 38%, 1) 14%,
        transparent 90%
      );
    background-blend-mode: normal, normal, normal, normal;
  }

  .oh {
    position: relative;
    overflow: hidden;
  }

  .oh__inner {
    will-change: transform;
    display: inline-block;
  }

  .oh,
  .preview__item-box-desc {
    opacity: 0;
  }

  .preview__item {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto auto 1fr;
    grid-template-areas:
      "subtitle"
      "..."
      "box-left"
      "..."
      "box-right";
    align-items: end;
    padding-top: 1rem;

    &--current {
      opacity: 1;
      pointer-events: auto;
    }

    &-close {
      opacity: 0;

      &:hover {
        & > * {
          filter: blur(2.4px);
          transform: scale(1.2);
        }
      }
    }

    &-title,
    &-subtitle,
    &-meta,
    &-status,
    &-info,
    &-box-title {
      color: var(--random-tint);
    }

    &-title {
      align-self: self-start;
      justify-self: center;
      grid-area: title;
      font-size: clamp(3rem, 24vw, 17rem);
      font-weight: 300;
      margin: 0;
      line-height: 1;
      will-change: transform;
      padding-top: 1vw;

      mix-blend-mode: difference;
    }

    &-title {
      display: none;
    }

    &-subtitle {
      justify-self: center;
      position: relative;
      grid-area: subtitle;
      font-weight: 300;
      margin: 0;
    }

    &-box {
      &-desc {
        padding: var(--spacing-s);
        background-color: var(--random-tint);

        &.preview__item-badges {
          background-color: transparent;
        }
      }

      &--right {
        grid-area: box-right;
        transform: translateY(-12vh);
      }

      &--left {
        grid-area: box-left;
      }
    }
  }
}

@media screen and (min-width: 53em) {
  .cat-sheet {
    .preview__item {
      grid-template-columns: 30% 1fr 30%;
      grid-template-rows: 1fr auto auto auto;
      grid-template-areas:
        "title title title"
        "... ... ..."
        "box-left subtitle box-right"
        "box-left ... box-right";

      padding-top: 0;

      &-title {
        display: block;
      }

      &-box--right {
        transform: translateY(0);
      }
    }
  }
}
</style>
