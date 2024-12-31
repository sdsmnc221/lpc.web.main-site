<template>
  <div class="links w-dvw h-dvh bg-white">
    <div class="flex flex-row">
      <!-- Left side image grid -->
      <div class="w-2/5 h-dvh grid grid-cols-3 grid-rows-3 gap-0">
        <div class="row-span-2">
          <img
            class="object-cover object-left inline-block w-full h-full"
            alt=""
            :src="photoGrids[0]"
          />
        </div>
        <div class="col-start-1 row-start-3">
          <img
            class="object-cover object-center inline-block w-full h-full"
            alt=""
            :src="photoGrids[1]"
          />
        </div>
        <div class="col-span-2 col-start-2 row-start-1">
          <img
            class="object-cover object-right-top inline-block w-full h-full"
            alt=""
            :src="photoGrids[2]"
          />
        </div>
        <div class="row-span-2 col-start-2 row-start-2">
          <img
            class="object-cover object-center inline-block w-full h-full"
            alt=""
            :src="photoGrids[3]"
          />
        </div>
        <div class="row-span-2 col-start-3 row-start-2">
          <img
            class="object-cover inline-block w-full h-full"
            alt=""
            :src="photoGrids[4]"
          />
        </div>
      </div>

      <!-- Right side content -->
      <div
        class="w-3/5 flex flex-col items-center justify-center bg-gray-300 relative"
      >
        <h1 class="meow-script-regular text-center md:text-lg px-2">
          {{ pageTitle }}
        </h1>

        <div class="bg-white mx-auto my-0 w-11/12 md:w-1/2 p-2">
          <div class="albert-sans-regular text-center text-gray-700 p-2">
            <prismic-rich-text :field="pageDescription"></prismic-rich-text>
          </div>

          <!-- Navigation Links -->
          <nav class="w-full md:w-3/4 md:m-auto space-y-4 pb-1 md:pb-4">
            <NuxtLink
              v-for="link in links"
              :key="link.linklabel"
              :href="
                link.linksrc.link_type !== 'Web'
                  ? `/${link.linksrc.uid}`
                  : link.linksrc.url
              "
              :target="link.linksrc.target ?? '_self'"
              class="block w-full p-2 md:p-4 text-xs bg-gray-200 hover:bg-gray-300 transition-colors duration-300 text-center font-serif italic text-gray-800"
            >
              {{ link.linklabel }}
            </NuxtLink>
          </nav>
        </div>

        <img :src="logo" class="logo block md:h-[100px] absolute bottom-1" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { client } = usePrismic();

const route = useRoute();

const { data: linkstree } = await useAsyncData("linkstree", () =>
  client.getByUID("linkstreepage", route.params.id)
);

const { data: assets } = await useAsyncData("assets", async () => {
  const { data: defaultLayout } = await client.getByUID(
    "pagelayout",
    "linkstree-layout"
  );

  return defaultLayout;
});
const pageTitle = computed(() => linkstree.value?.data.pagetitle);

const pageDescription = computed(() => linkstree.value?.data.pagedescription);

const links = computed(() => linkstree.value?.data.linkstree);

const photoGrids = computed(() =>
  assets.value?.photosgrid5.map((photo) => photo.img.url)
);

const logo = computed(() => assets.value?.logo.url);

definePageMeta({
  layout: "linkstree",
});

onMounted(() => {
  console.log(route);
});
</script>

<style lang="scss">
.app:has(.links) {
  padding: 0;

  .links {
    padding: 0;

    p {
      font-size: 0.72rem;
      margin-bottom: var(--spacing-s);
    }

    h1 {
      font-size: 1.4rem;
      transform: translateY(8px);
    }

    nav a {
      @extend .gloock-regular;
      letter-spacing: 1px;
      font-size: 0.64rem;
      text-transform: uppercase;
    }

    img {
      border-radius: 0;
    }

    .logo {
      transform: translateY(5px);
      pointer-events: none;
    }
  }
}

@media screen and (min-width: 768px) {
  .app:has(.links) {
    .links {
      p {
        @include ft-s(16);
      }

      h1 {
        @include ft-s(xlarge);
        transform: translateY(0);
      }

      nav a {
        @include ft-s(16);
      }
    }
  }
}
</style>
