<template>
  <div class="cat-sheet" ref="catSheet" :class="{ '--hidden': !open }">
    <Teleport to="body">
      <div
        :class="`fixed w-[100vw] h-[100svh] top-0 left-0 cat-sheet-for-group-${groupIndex} cat-sheet__overlay ${isAdressBarHidden ? '--svh' : ''}`"
        :style="`--random-tint: ${tint.hsla};`"
      ></div>
    </Teleport>

    <div
      class="preview__item w-[100vw] h-[100dvh]"
      :style="`--random-tint: ${tint.hsl};`"
    >
      <div class="preview__item-img-outer"></div>
      <h2 class="preview__item-title oh" v-if="catItem">
        <span
          class="oh__inner"
          :class="`${catItem.index % 2 === 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
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
          class="preview__item-status"
        >
          <span
            :class="`${catItem.index % 2 !== 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
            >{{ catItem.adoptionstatus }}
          </span>
          <span v-if="catItem.catsexe"> {{ catItem.catsexe }}</span>
        </p>
      </div>

      <span class="preview__item-meta oh"
        ><span class="oh__inner">2007</span></span
      >
      <div class="preview__item-box preview__item-box--left">
        <h3 class="preview__item-box-title oh">
          <span class="oh__inner">Setting</span>
        </h3>
        <p class="preview__item-box-desc">
          Madame sosostris, famous clairvoyante, had a bad cold, nevertheless is
          known to be the wisest woman in europe.
        </p>
      </div>
      <div class="preview__item-box preview__item-box--right pr-2">
        <div class="flex justify-between items-end mb-4">
          <div class="preview__item-info oh" v-if="catItem && hasInfo">
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
            class="preview__item-box preview__item-badges flex flex-col gap-2"
            v-if="catItem"
          >
            <Badge class="max-w-[120px] md:max-w-max text-center">{{
              catItem.catidentification
            }}</Badge>
            <Badge>
              Vaccination : {{ catItem.catvaccination ? "✅" : "❌" }}
            </Badge>
            <Badge>
              Stérilisation : {{ catItem.catsterilization ? "✅" : "❌" }}
            </Badge>
          </div>
        </div>

        <prismic-rich-text
          v-if="catItem && catItem.catdescription"
          class="preview__item-box-desc z-10"
          :class="`${catItem.index % 2 === 0 ? 'gloock-regular' : 'albert-sans-bold'}`"
          :field="catItem.catdescription"
        />
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
import type { ContentItem } from "./ContentItem";

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
const contentOverlay = ref<HTMLDivElement | null>(null);

const catItemIndex = ref(null);
const groupItemsIndex = ref(null);

const catHasAvatar = computed(() =>
  props.catItem?.catphoto?.hasOwnProperty("url")
);

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
  emits("update:open-sheet", { opened: false });
};

const onOpenSheet = (contentItem: ContentItem, current: number, groupIndex) => {
  catItemIndex.value = current;
  groupItemsIndex.value = groupIndex;

  const contentOverlay = `.cat-sheet-for-group-${groupIndex}.cat-sheet__overlay`;

  gsap
    .timeline({
      defaults: {
        duration: 0.8,
        ease: "power4.inOut",
      },
      onStart: () => {
        inPreview.value = true;
        // bodyEl.classList.add('preview-open');
        // gsap.set(contentItem.DOM.el, {zIndex: 10});

        gsap.set(contentOverlay, {
          transformOrigin: current % 2 ? "0% 100%" : "0% 0%",
          scaleX: contentItem.DOM.el.offsetWidth / window.innerWidth,
          scaleY: 0,
          x: contentItem.DOM.el.offsetLeft,
          opacity: 0,
        });

        gsap.set(previewItem.value.DOM.slideTexts, { yPercent: 100 });
        gsap.set(previewItem.value.DOM.descriptions, {
          xPercent: (pos) => (pos ? -5 : 5),
          opacity: 0,
        });

        // gsap.set(backCtrl, { x: "+=15%", opacity: 0 });

        previewItem.value.DOM.el.classList.add("preview__item--current");
      },
      onComplete: () => (isAnimating.value = false),
    })
    .addLabel("start", 0)
    .addLabel("content", "start+=0.6")
    .to(
      contentItem.DOM.titleInner,
      {
        yPercent: current % 2 ? -100 : 100,
      },
      "start"
    )
    .to(
      contentItem.DOM.caption,
      {
        yPercent: current % 2 ? -10 : 10,
        opacity: 0,
      },
      "start"
    )
    .to(
      contentOverlay,
      {
        scaleY: 1,
        opacity: 0.32,
      },
      "start"
    )
    .to(contentItem.DOM.exploreCTA, { opacity: 0 }, "start")
    .to(
      contentOverlay,
      {
        scaleX: 1,
        x: 0,
        opacity: 1,
      },
      "content"
    )
    .add(() => {
      const flipstate = Flip.getState(contentItem.DOM.imgWrap);
      previewItem.value.DOM.imgOuter.appendChild(contentItem.DOM.imgWrap);
      Flip.from(flipstate, {
        duration: 0.8,
        ease: "power4.inOut",
        absolute: true,
      });
    }, "content")
    .to(
      previewItem.value.DOM.slideTexts,
      {
        duration: 1.1,
        ease: "expo",
        yPercent: 0,
      },
      "content+=0.3"
    )
    .to(
      previewItem.value.DOM.descriptions,
      {
        duration: 1.1,
        ease: "expo",
        opacity: 1,
        xPercent: 0,
      },
      "content+=0.3"
    );
};

onMounted(() => {
  nextTick(() => {
    windowHeight.value = window.innerHeight;
    isAdressBarHidden.value = isMobile() && props.open;

    window.addEventListener("resize", () => {
      windowHeight.value = window.innerHeight;
    });
  });
});

watch(
  () => windowHeight.value,
  (newHeight, oldHeight) => {
    isAdressBarHidden.value = newHeight < oldHeight && isMobile();
  }
);

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
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100svh;
      position: absolute;
      top: 0;
      left: 0;

      img {
        width: auto;
        height: 72vh;
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

  z-index: 9;

  display: block;
  pointer-events: all;

  &.--hidden {
    display: none;
    pointer-events: none;
  }

  &__overlay {
    --random-tint: var(--white);

    pointer-events: none;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
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

  .preview__item {
    display: grid;
    padding-top: 0;
    grid-template-columns: 30% 1fr 30%;
    grid-template-rows: 1fr auto auto auto;
    grid-template-areas:
      "title title title"
      "box-left ... box-right"
      "box-left subtitle box-right"
      "box-left subtitle box-right";

    &-title,
    &-subtitle,
    &-status,
    &-info {
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
        background-color: color-mix(
          in srgb,
          var(--random-tint) 36%,
          transparent
        );
      }

      &--right {
        grid-area: box-right;
      }

      &--left {
        grid-area: box-left;
      }
    }
  }
}

@media screen and (max-width: 699px) {
  body {
    .cat-sheet {
      z-index: 999;

      .cat-sheet__overlay {
        display: grid;
        grid-template-columns: 0.5fr repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;

        &.--svh {
          height: 100svh;
        }

        &__div1 {
          grid-area: 1 / 1 / 3 / 3;
          background-color: black;

          .cat-sheet {
            &__avatar {
              height: 100%;
              width: auto;
            }
          }
        }

        &__div2 {
          grid-area: 3 / 3 / 4 / 4;

          img.cat-sheet__avatar {
            bottom: 0;
            height: 100%;
            width: 100%;
            object-fit: cover !important;
          }
        }

        &__div3 {
          grid-area: 3 / 1 / 4 / 3;

          justify-content: center;
          padding: 0;

          .cat-sheet__trigger {
            position: relative;
            z-index: 2;
            @include ft-s(20);
          }
        }

        &__div4 {
          grid-area: 2 / 3 / 3 / 4;
          gap: var(--spacing-s);
          top: -10vh;

          .cat-sheet__details {
            top: -6.4vh;

            &__info {
              @include ft-s(small);
              top: 28%;
            }

            &__status {
              margin-top: var(--spacing-s);
              & > *:first-child {
                @include ft-s(16);
              }

              & > *:not(:first-child) {
                line-height: 0.8rem;
                @include ft-s(small);
              }
            }

            &__badges {
              padding: var(--spacing-s);
              align-self: center;
              position: fixed;
              bottom: 32vh;
              left: 0;
              margin-bottom: var(--spacing-s);
            }

            &__description {
              padding-left: var(--spacing-m);
              margin-top: 0;
              padding-right: var(--spacing-s);
              padding-bottom: 0;
              padding-top: var(--spacing-s);

              width: 56vw;

              & > div {
                text-align: right;
                overflow-y: visible;
                height: 164px;
                font-size: calc(var(--base-ft-size) * 0.72);
              }
            }
          }
        }

        &__div5 {
          grid-area: 1 / 2 / 2 / 4;
          align-items: flex-end;

          .cat-sheet {
            &__title {
              padding-top: var(--spacing-m);

              text-align: right;

              span {
                font-size: calc((var(--base-ft-size) * 3));
                line-height: calc((var(--base-ft-size) * 3));
              }
            }

            &__publication {
              color: var(--black);
              width: auto;
              align-self: flex-end;
              @include ft-s(small);
            }
          }
        }

        &__div6 {
          grid-area: 3 / 3 / 4 / 4;
          padding: var(--spacing-m);

          align-content: flex-end;

          .cat-sheet {
            &__footnote {
              justify-content: flex-end;
              flex-direction: column;
              display: flex;

              &__section {
                @include ft-s(small);
                line-height: 0.98rem;
              }

              &__content:not(:has(.badge)) {
                background-color: rgba(0, 0, 0, 0.64);
                font-size: calc(var(--base-ft-size) * 0.72) !important;
                line-height: 0.72rem;
              }

              &__content {
                gap: 8px;

                * {
                  font-size: 8px;
                  margin-top: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1000px) {
  body {
    .cat-sheet {
      &__overlay {
        &__div4 {
          .cat-sheet__details {
            &__status {
              line-height: calc(var(--base-ft-size) * 6);
            }

            &__info {
              position: relative !important;
              left: unset !important;
              right: auto !important;
              top: unset !important;
              width: auto !important;
              background-color: transparent !important;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-height: 720px) {
  body {
    .cat-sheet {
      &__overlay {
        &__div6 {
          height: 28vh;
        }
      }

      &__details {
        top: -6.4svh;
      }
    }
  }
}
</style>
