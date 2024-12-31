<template>
  <div class="fixed bg">
    <AuroraBackground></AuroraBackground>
  </div>
  <div class="adoptions snoop-tagada flex flex-col space-y-3 p-8">
    <adoption-hero
      banner="/snoop-tagada/cover.jpg"
      title="Snoop & Tagada"
      subtitle="Notre duo en "
      highlight="Or Noir."
    ></adoption-hero>

    <div class="m-auto flex flex-col space-y-3 md:w-1/2 w-72">
      <div class="flex md:flex-row flex-col">
        <cat-details
          name="Snoop"
          age-sex-dob="4 ans, mâle, né 09.2020"
          is-sterilised
          is-male
          highlight-trait="Ce serait bien qu’il reste avec sa sœur Tagada."
        >
          <span class="inline-block"
            >- <span class="font-semibold">Peureux</span> mais
            <span class="font-semibold">se laisse parfois caresser</span> en lui
            tendant la main pour qu’il s’y frotte avec sa joue, surtout au
            moment de la pâtée et des friandises.</span
          >
          <span class="inline-block"
            >- <span class="font-semibold">Très joueur.</span></span
          >
        </cat-details>
        <cat-details
          name="Tagada"
          age-sex-dob="4 ans, femelle, née 09.2020"
          is-sterilised
          highlight-trait="Il serait donc préférable qu’elle reste avec lui."
        >
          <br />
          <span class="inline-block"
            >- <span class="font-semibold">Peureuse</span>, très
            <span class="font-semibold">joueuse</span> et
            <span class="font-semibold">gourmande</span>.</span
          >
          <br />
          <span class="inline-block">- Souvent avec son frère Snoop.</span>
        </cat-details>
      </div>

      <div class="flex md:flex-row flex-col w-100">
        <div class="md:basis-1/2 basis-full md:mr-10">
          <div class="">
            <h2 class="text-left text-base mt-10 mb-2">
              <span class="font-bold">Leur histoire d'amour fraternel :</span>
            </h2>
            <p class="text-xs">
              Ces deux âmes complices partagent non seulement leur pelage
              d'ébène, mais aussi une histoire touchante.
              <span class="font-bold"
                >Après 6 mois de vie sauvage, ils ont appris ensemble à faire
                confiance aux humains.
              </span>
              Aujourd'hui,
              <span class="font-bold">
                <TextHighlight
                  :delay="640"
                  class="rounded-lg bg-gradient-to-r from-pink-200 to-orange-100"
                  >leur lien est précieux</TextHighlight
                ></span
              >
              - Tagada trouve son assurance auprès de son frère, tandis que
              Snoop veille tendrement sur sa sœur.
            </p>
          </div>

          <div class="">
            <h2 class="text-left text-base mt-10 mb-2">
              <span class="font-bold">Ce qu'ils aiment :</span>
            </h2>
            <p class="text-xs">- Les friandises (le chemin vers leur cœur !)</p>
            <p class="text-xs">- Les jeux (ils sont actifs et participatifs)</p>
            <p class="text-xs">
              - Leur zone de confort respective (leur royaume !) :
            </p>
            <p class="text-xs mt-2 mb-4 p-2 border">
              Snoop s'est créé son petit coin de paradis dans son dodo douillet
              favori, tandis que Tagada, déjà copine avec les caisses de
              transport, facilite grandement les déplacements comme par exemple
              le départ du foyer d’accueil pour l’arrivée à son foyer à vie. Ces
              petits détails, qui peuvent sembler anodins, sont en réalité de
              grandes victoires pour des chats anciennement craintifs !
            </p>

            <p class="text-xs">
              - Et surtout...
              <span class="font-bold underline decoration-wavy">
                <TextHighlight
                  :delay="640"
                  class="rounded-lg bg-gradient-to-r from-pink-200 to-orange-100"
                  >être ensemble</TextHighlight
                ></span
              >
              !
            </p>
          </div>
        </div>
        <div class="basis-1/2 md:p-8 p-2 mt-4">
          <img
            alt="Snoop et Tagada, avec ce qu'ils aiment"
            src="/snoop-tagada/7.jpg"
          />
        </div>
      </div>

      <div
        class="flex md:flex-row flex-col w-100 text-xs md:flex-wrap flex-nowrap"
      >
        <h2 class="basis-full text-left text-base mt-10">
          <span class="font-bold"
            >"Mais pourquoi adopter des chats
            <TextHighlight
              :delay="640"
              class="rounded-lg bg-gradient-to-r from-yellow-200 to-slate-200"
              >adultes</TextHighlight
            >
            ?"
          </span>
        </h2>

        <p class="basis-full mb-2">
          Laissez-nous vous raconter pourquoi Snoop et Tagada sont des trésors
          uniques :
        </p>

        <div class="basis-full flex md:flex-row flex-col">
          <div class="basis-1/2 md:p-4 flex justify-center items-center">
            <video
              src="/snoop-tagada/e00.mp4"
              class="w-auto h-[500px] m-auto"
              controls
            ></video>
          </div>

          <div class="basis-1/2 p-4 flex flex-col justify-between">
            <p class="flex flex-col my-2">
              <span class="inline-block font-bold">L'âge de la sagesse :</span>
              <span class="inline-block mx-2">
                - Ils ont déjà leurs repères (arbre à chat pour Snoop, caisse de
                transport pour Tagada)
              </span>
              <span class="inline-bloc mx-2">
                - Plus de surprises de caractère : vous savez déjà qui ils sont
              </span>
              <span class="inline-block mx-2">
                - Fini les belles bêtises de chatons !
              </span>
              <span class="inline-block mx-2">
                - La maturité leur a appris la patience
              </span>
            </p>

            <p class="flex flex-col my-2">
              <span class="inline-block font-bold"
                >La magie des chats timides :</span
              >
              <span class="inline-block mx-2">
                - Chaque progrès est une victoire émouvante
              </span>
              <span class="inline-bloc mx-2">
                - Leur confiance, une fois gagnée, est inestimable
              </span>
              <span class="inline-block mx-2">
                - Leur gratitude se manifeste de façon unique
              </span>
              <span class="inline-block mx-2">
                - Leur amour, plus discret, n'en est que plus précieux
              </span>
            </p>

            <p class="flex flex-col my-2">
              <span class="inline-block font-bold"
                >Leur santé suivie avec soin :</span
              >
              <span class="inline-block mx-2">
                - Déjà identifiés et stérilisés
              </span>
              <span class="inline-block mx-2">
                - Régulièrement déparasités et vermifugés
              </span>
              <span class="inline-block mx-2">
                - En bonne santé et propres
              </span>
              <span class="inline-block mx-2">
                - Vaccination à prévoir, avec notre aide*
              </span>
              <span class="inline-block mx-2 mt-4" style="font-size: 0.64rem">
                (*)Remboursement des soins de base à l'adoption.<br />
                L'association vous accompagne pour la vaccination.
              </span>
            </p>

            <p class="flex flex-col my-2">
              <span class="inline-block font-bold"
                >Le plus beau des cadeaux :</span
              >
              <span class="inline-block mx-2">
                - La fierté de voir leur évolution
              </span>
              <span class="inline-block mx-2">
                - La joie de gagner leur confiance
              </span>
              <span class="inline-block mx-2">
                - Un lien unique qui se construit jour après jour
              </span>
              <span class="inline-block mx-2">
                - La satisfaction d'offrir une vraie seconde chance
              </span>
            </p>
          </div>
        </div>

        <div
          class="basis-full md:text-sm text-xs mt-2 text-center md:p-6 p-0 font-semibold"
          ref="textRef"
        >
          <TextGenerateEffect
            v-if="isVisible"
            :duration="1.2"
            words="Adopter Snoop et Tagada, c'est choisir une aventure différente, peut-être plus lente, mais tellement enrichissante : telle que l'avait choisie l'adoptante de Rufus - ancien pensionnaire du foyer d'accueil (cf. vidéo ci-dessus). Ces chats, qui ont connu la vie sauvage et celle en foyer d'accueil, savent mieux que quiconque la valeur d'un foyer aimant. Leur amour, une fois gagné, est un cadeau d'une pureté incomparable."
          ></TextGenerateEffect>
        </div>
      </div>

      <div class="flex md:flex-row flex-col w-100">
        <div class="md:basis-1/2 basis-full md:mr-10 flex flex-col">
          <h3 class="font-bold mt-10 mb-2">
            Témoignages de Marie <br />(notre comportementaliste) :
          </h3>

          <p class="font-serif border p-2 m-auto mt-4 basis-full text-xs">
            “Il [Snoop] est arrivé sauvage, je ne pouvais pas le toucher, je ne
            pouvais pas le caresser. Mais là après des années, je peux la
            caresser, il vient réclamer la caresse avant chaque repas.”⁣
          </p>

          <p class="font-serif border p-2 m-auto mt-4 basis-full text-xs">
            “Tagada est plus timide que son frère Snoop, mais est prête pour
            un.e adoptant.e patient.e. Et puis comme c'est une grande joueuse,
            elle pourrait se détendre beaucoup plus, et plus rapidement si on
            prend le temps de jouer avec elle.”⁣
          </p>

          <div class="basis-1/2">
            <h3 class="font-bold mt-10 mb-2">Le voyage de Snoop :</h3>
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FlesPetitsClochards%2Fvideos%2F528407173307717%2F&show_text=false&width=476&t=0"
              class="w-100 h-[320px] m-auto my-6"
              style="border: none; overflow: hidden"
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen="true"
            ></iframe>
          </div>
        </div>

        <adoption-ctas
          cats="Snoop et Tagada"
          banner="/snoop-tagada/1.jpg"
          foster
        ></adoption-ctas>
      </div>

      <div class="flex flex-col w-100">
        <h3 class="font-bold mt-10 mb-2">Un mot du cœur :</h3>

        <p class="text-xs">
          Aujourd'hui, Snoop et Tagada ne sont plus des chats sauvages, mais
          simplement des chats timides qui ont besoin de vous. Ces deux âmes
          sensibles cherchent maintenant des familles d'accueil ou un foyer
          aimant, où ils pourront tout le temps partager l'environnement de
          leurs adoptants(es), essentiels à leur socialisation. ⁣ ⠀⁣
        </p>

        <p class="text-xs mt-4">
          En devenant famille pour les chats comme Snoop et Tagada, vous leur
          offrez une chance dont ils vous resont grandement reconnaissants toute
          leur vie. Certes, cela demande de la patience et de la persévérance,
          mais quelle plus belle récompense que de gagner leur confiance, jour
          après jour ?⁣
        </p>

        <p
          class="text-xs mt-2 text-right underline decoration-wavy pr-4 font-semibold"
        >
          <a
            href="https://www.facebook.com/photo.php?fbid=573438812019333&set=pb.100080596572190.-2207520000&type=3"
            target="_blank"
            ><TextHighlight
              :delay="640"
              class="rounded-lg bg-gradient-to-r from-pink-200 to-orange-100"
              >[Tout lire]</TextHighlight
            ></a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuroraBackground from "@/components/AuroraBackground.vue";
import TextGenerateEffect from "@/components/TextGenerateEffect.vue";
import TextHighlight from "@/components/TextHighlight.vue";
import { Badge } from "@/components/ui/badge";

import AdoptionHero from "~/components/UiAdoptions/AdoptionHero.vue";
import CatDetails from "~/components/UiAdoptions/CatDetails.vue";
import AdoptionCtas from "~/components/UiAdoptions/AdoptionCtas.vue";

import { ref, onMounted, onUnmounted } from "vue";

const textRef = ref(null);
const isVisible = ref(false);

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      isVisible.value = true;
      // Optional: Disconnect observer after first appearance
      // observer.disconnect();
    }
  });
};

let observer;

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, {
    // Adjust these options as needed
    threshold: 0.1, // Triggers when 10% of the element is visible
    rootMargin: "50px", // Adds 50px margin to trigger slightly before the element is in view
  });

  if (textRef.value) {
    observer.observe(textRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

definePageMeta({
  layout: "discover",
});
</script>

<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
}
.adoptions {
  width: 100%;
  height: auto;
  padding-top: 12vh;
  padding-bottom: 16vh;
  overflow-y: scroll;
  overflow-x: hidden;

  @media screen and (max-width: 320px) {
    margin-bottom: 0;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}
.snoop-tagada {
}
</style>
