<template>
  <div
    class="w-3/5 h-screen flex flex-col items-center justify-center bg-gray-300 relative"
  >
    <h1 class="md:text-lg" v-html="processedPageTitle"></h1>

    <div class="bg-white mx-auto my-0 w-11/12 md:w-1/2 p-2">
      <div class="albert-sans-regular text-center text-gray-700 p-2">
        <prismic-rich-text
          class="page-description"
          :field="pageDescription"
        ></prismic-rich-text>
      </div>

      <!-- Navigation Links -->
      <nav class="w-full md:w-3/4 md:m-auto space-y-4 pb-1 md:pb-4">
        <NuxtLink
          v-for="link in computedLinks"
          :key="`right-col-link-${link.linklabel}`"
          :to="linkAdapter(link)"
          :target="link.linkitem.target ?? '_self'"
          class="block w-full p-2 md:p-4 text-xs bg-gray-200 hover:bg-gray-300 transition-colors duration-300 text-center font-serif italic text-gray-800"
        >
          {{ link.linklabel }}
        </NuxtLink>
      </nav>
    </div>

    <img
      v-if="logo.length"
      :src="logo"
      class="logo block md:h-[100px] absolute bottom-1"
    />
  </div>
</template>

<script setup lang="ts">
import linkAdapter from "~/prismic/linkAdapter";

type Props = {
  pageTitle: string;
  pageDescription: any;
  logo: string;
  links: {
    linklabel: string;
    linksrc: any;
  }[];
};

const props = defineProps<Props>();

const computedLinks = computed(() =>
  props.links
    ? props.links.map((link) => ({
        linklabel: link.linklabel,
        linkitem: link.linksrc,
        linkhref: link.linksrc.url,
      }))
    : []
);

const processedPageTitle = computed(() => {
  const splitOnBr = props.pageTitle?.split("<br />") || [];
  let htmlString = "";

  splitOnBr.forEach((text, index) => {
    htmlString += `<div class="meow-script-regular text-center px-2 ${index < splitOnBr.length - 1 ? "md:mb-3" : ""}">`;
    htmlString += text;
    htmlString += "</div>";
  });

  return htmlString;
});
</script>
