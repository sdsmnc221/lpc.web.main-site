<template>
  <footer class="footer-menu bg-white">
    <p class="footer-menu__copyright albert-sans-light" v-if="copyright">
      {{ copyright }}
    </p>
    <div class="footer-menu__aside">
      <div
        class="footer-menu__social-medias"
        v-if="socialmedias && socialmedias.length"
      >
        <a
          v-for="(sc, index) in socialmedias"
          :key="`social-media-lpc-${index}`"
          :href="sc.socialmediaLink.url"
          target="_blank"
        >
          <prismic-image :field="sc.socialmediaicon" />
        </a>
      </div>

      <div class="footer-menu__pop-banners">
        <slot name="popover-banner"></slot>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
type Props = {
  copyright?: string;
  socialmedias?: {
    socialmediaLink: any;
    socialmediaicon: any;
    socialmedialabel: string;
  }[];
};

const props = defineProps<Props>();
</script>

<style lang="scss">
@import "@/styles/index.scss";

.footer-menu {
  display: flex;
  padding: var(--spacing-l) var(--spacing-m);
  gap: var(--spacing-s);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  text-align: left;

  &__copyright {
    font-size: var(--base-ft-size);
  }

  &__aside {
    display: flex;
    flex: 1;
    width: 100%;
    gap: var(--spacing-s) / 2;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
  }

  &__social-medias,
  &__pop-banners {
    display: flex;
    gap: var;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;
  }

  a {
    img {
      display: inline-block;
      width: var(--base-ft-size);
      height: var(--base-ft-size);
      aspect-ratio: 1;
    }
  }
}

@container nuxt (min-width: 700px) {
  .footer-menu {
    gap: var(--spacing-l);
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    &__copyright {
      font-size: 1rem;
    }

    &__aside {
      justify-content: flex-end;
      gap: var(--spacing-m);
      margin-right: var(--spacing-s);
      margin-left: 0;
    }

    &__social-medias,
    &__pop-banners {
      flex-direction: row;
      gap: var(--spacing-s);

      a {
        img {
          display: inline-block;
          width: 20px;
          height: 20px;
          aspect-ratio: 1;
        }
      }
    }
  }
}
</style>
