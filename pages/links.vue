<template>
  <div class="links w-dvw h-dvh bg-white">
    <div class="flex flex-row">
      <!-- Left side image grid -->
      <div class="w-2/5 h-dvh grid grid-cols-3 grid-rows-3 gap-0">
        <div class="row-span-2">
          <img
            class="object-cover object-left inline-block w-full h-full"
            alt=""
            src="/links/cell-1.jpg"
          />
        </div>
        <div class="col-start-1 row-start-3">
          <img
            class="object-cover object-center inline-block w-full h-full"
            alt=""
            src="/links/cell-2.jpg"
          />
        </div>
        <div class="col-span-2 col-start-2 row-start-1">
          <img
            class="object-cover object-right-top inline-block w-full h-full"
            alt=""
            src="/links/cell-3.jpg"
          />
        </div>
        <div class="row-span-2 col-start-2 row-start-2">
          <img
            class="object-cover object-center inline-block w-full h-full"
            alt=""
            src="/links/cell-4.jpg"
          />
        </div>
        <div class="row-span-2 col-start-3 row-start-2">
          <img
            class="object-cover object-center inline-block w-full h-full"
            alt=""
            src="/links/cell-5.jpg"
          />
        </div>
      </div>

      <!-- Right side content -->
      <div class="w-3/5 flex flex-col items-center justify-center bg-gray-300">
        <h1 class="meow-script-regular text-center px-2">
          Les Petits Clochards
        </h1>

        <div class="bg-white mx-auto my-0 w-11/12 p-2">
          <p class="albert-sans-regular text-xs text-center text-gray-700 p-2">
            L'association, créée en 2004 et basée dans le 91, Ile-de-France,
            œuvre pour la protection des chats abandonnés errants.
          </p>

          <p
            class="albert-sans-bold text-xs text-center text-gray-600 p-2 mb-4"
          >
            Découvrez notre passion et nos efforts.
          </p>

          <!-- Navigation Links -->
          <nav class="w-full space-y-4">
            <a
              v-for="link in links"
              :key="link.text"
              :href="link.url"
              class="block w-full p-2 text-xs bg-gray-200 hover:bg-gray-300 transition-colors duration-300 text-center font-serif italic text-gray-800"
            >
              {{ link.text }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CatIcon } from "lucide-vue-next";

const links = [
  { text: "SITE WEB", url: "#" },
  { text: "FACEBOOK", url: "#" },
  { text: "HELLO ASSO", url: "#" },
  { text: "ADOPTEZ", url: "#" },
  { text: "ACCUEILLEZ", url: "#" },
  { text: "NOS CHAT'DULTES", url: "#" },
  { text: "NOS CHATS CRAINTIFS", url: "#" },
  { text: "FAITES UN DON", url: "#" },
  { text: "DEVENEZ ADHERENT.E", url: "#" },
];

definePageMeta({
  layout: "default-temp",
});
</script>

<style lang="scss">
.app.--links {
  padding: 0;

  .links {
    padding: 0;

    p {
      font-size: 0.72rem;
    }

    h1 {
      font-size: 1.4rem;
      transform: translateY(8px);
    }

    nav a {
      @extend .gloock-regular;
      letter-spacing: 1px;
      font-size: 0.64rem;
    }

    img {
      border-radius: 0;
    }
  }
}
</style>
