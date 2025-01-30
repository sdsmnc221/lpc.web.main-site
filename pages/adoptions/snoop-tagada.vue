<template>
  <div class="fixed bg">
    <AuroraBackground></AuroraBackground>
  </div>
  <div class="adoptions snoop-tagada flex flex-col space-y-3 p-8">
    <h1 class="text-lg md:mt-4 md:w-1/2 text-left m-auto">
      <img
        src="/snoop-tagada/cover-tagada.jpg"
        alt="Adoption de Snoop et Tagada"
        class="w-[720px] md:w-[640px] rounded-xl mb-4"
      />
      <span class="font-semibold text-lg md:text-2xl">
        Tagada
        <span
          class="text-stone-400 tracking-tight text-sm md:text-2xl md:tracking-normal"
          >, et il était une fois, Snoop.</span
        ></span
      >
      <br />
      <span
        class="font-normal text-sm md:text-2xl tracking-tight md:tracking-normal"
      >
        L'histoire en Tagada, d'un duo en
      </span>
      <span class="font-bold">
        <TextHighlight
          :delay="320"
          text-end-color="hsl(var(--accent))"
          class="rounded-lg bg-gradient-to-r text-xs md:text-lg from-yellow-500 to-slate-500"
          >Or Noir.</TextHighlight
        ></span
      >
    </h1>

    <div class="m-auto flex flex-col space-y-3 md:w-1/2 w-72">
      <div class="flex md:flex-row flex-col">
        <div class="md:basis-1/2 basis-full md:mr-10">
          <h2 class="text-left text-base mt-4">
            <span class="font-bold">Tagada</span>
          </h2>
          <p class="text-xs">À l'aube de ans, femelle, née 09.2020</p>
          <div class="h-px bg-slate-400 mb-4"></div>
          <p class="text-xs min-h-24 flex flex-col items-start justify-center">
            <span class="inline-block">- Stérélisée, identifiée.</span>
            <br />
            <span class="inline-block"
              >- <span class="font-semibold">Peureuse</span>, très
              <span class="font-semibold">joueuse</span> et
              <span class="font-semibold">gourmande</span>.</span
            >
            <br />
            <span class="inline-block"
              >- Avant son départ, elle était souvent avec son frère
              Snoop.</span
            >
          </p>
          <div class="h-px bg-slate-400 mt-4 mb-2"></div>
          <p class="text-xs">
            <span class="font-bold"
              >Elle a appris à faire confiance avec son frère Snoop, et même
              après son décès, elle continue son chemin avec courage.</span
            >
          </p>
        </div>

        <div class="md:basis-1/2 basis-full text-stone-400">
          <h2 class="text-left text-base mt-4">
            <span class="font-bold">Snoop</span>
          </h2>
          <p class="text-xs">À l'aube de ans, mâle (09.2020 - 19.01.2025)</p>
          <div class="h-px bg-slate-400 mb-4"></div>
          <p class="text-xs min-h-24 flex flex-col items-start justify-center">
            <span class="inline-block">- Castré, identifié.</span>
            <span class="inline-block"
              >- <span class="font-semibold">Peureux</span> mais
              <span class="font-semibold">se laissait parfois caresser</span> en
              lui tendant la main pour qu’il s’y frottait avec sa joue, surtout
              au moment de la pâtée et des friandises.</span
            >
            <span class="inline-block"
              >- <span class="font-semibold">Très joueur.</span></span
            >
            <span class="inline-block"
              >- <span class="font-semibold">Nous a quittés</span> le 19 janvier
              2025, laissant un grand vide au foyer et dans le cœur de sa sœur
              Tagada</span
            >
          </p>
          <div class="h-px bg-slate-400 mt-4 mb-2"></div>
          <p class="text-xs">
            Ça aurait été bien qu’il puisse se faire adopter ensemble, avec sa
            sœur Tagada.
          </p>
        </div>
      </div>

      <div class="flex md:flex-row flex-col w-100">
        <div class="md:basis-1/2 basis-full md:mr-10">
          <div class="">
            <h2 class="text-left text-base mt-10 mb-2">
              <span class="font-bold">Une histoire d'amour fraternel :</span>
            </h2>
            <p class="text-xs">
              Tagada partageait avec son frère Snoop non seulement un pelage
              d'ébène, mais aussi un parcours touchant.
              <span class="font-bold"
                >Après 6 mois de vie sauvage, ils ont appris ensemble à faire
                confiance aux humains.
              </span>
              Aujourd'hui, bien que Snoop nous ait quittés, Tagada
              <span class="font-bold">
                <TextHighlight
                  :delay="640"
                  class="rounded-lg bg-gradient-to-r from-pink-200 to-orange-100"
                  >continue son chemin de socialisation,</TextHighlight
                ></span
              >
              portant en elle la force de leur lien fraternel.
            </p>
          </div>

          <div class="">
            <h2 class="text-left text-base mt-10 mb-2">
              <span class="font-bold">Ce qu'elle aime :</span>
            </h2>
            <p class="text-xs">- Les friandises (le chemin vers son cœur !)</p>
            <p class="text-xs">- Les jeux (elle est active et participative)</p>
            <p class="text-xs">- Sa zone de confort (son royaume !) :</p>
            <p class="text-xs mt-2 mb-4 p-2 border">
              Elle est déjà copine avec les caisses de transport, ce qui
              facilitera grandement les déplacements comme par exemple le départ
              du foyer d’accueil pour l’arrivée à son foyer à vie. Ces petits
              détails, qui peuvent sembler anodins, sont en réalité de grandes
              victoires pour des chats anciennement craintifs !
            </p>
          </div>
        </div>
        <div class="basis-1/2 md:p-8 p-2 mt-4">
          <img
            alt="Snoop et Tagada, avec ce qu'ils aiment"
            src="/snoop-tagada/7half.jpg"
          />
        </div>
      </div>

      <div
        class="flex md:flex-row flex-col w-100 text-xs md:flex-wrap flex-nowrap"
      >
        <h2 class="basis-full text-left text-base mt-10">
          <span class="font-bold"
            >"Mais pourquoi adopter un chat
            <TextHighlight
              :delay="640"
              class="rounded-lg bg-gradient-to-r from-yellow-200 to-slate-200"
              >adulte</TextHighlight
            >
            ?"
          </span>
        </h2>

        <p class="basis-full mb-2">
          Laissez-nous vous raconter pourquoi Tagada est un trésor unique :
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
              <span class="inline-block mx-2"> - Elle a déjà ses repères </span>
              <span class="inline-bloc mx-2">
                - Plus de surprises de caractère : vous savez déjà qui elle est
              </span>
              <span class="inline-block mx-2">
                - Fini les belles bêtises de chatons !
              </span>
              <span class="inline-block mx-2">
                - La maturité lui a appris la patience
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
                - Sa confiance, une fois gagnée, est inestimable
              </span>
              <span class="inline-block mx-2">
                - Sa gratitude se manifeste de façon unique
              </span>
              <span class="inline-block mx-2">
                - Son amour, plus discret, n'en est que plus précieux
              </span>
            </p>

            <p class="flex flex-col my-2">
              <span class="inline-block font-bold">
                <TextHighlight
                  :delay="640"
                  class="rounded-lg bg-gradient-to-r from-yellow-200 to-slate-200"
                  >Sa santé, suivie avec soin :</TextHighlight
                ></span
              >
              <span class="inline-block mx-2">
                - Déjà identifiée et stérilisée
              </span>
              <span class="inline-block mx-2">
                - Régulièrement déparasitée et vermifugée
              </span>
              <span class="inline-block mx-2">
                - En bonne santé et propre
              </span>

              <span class="mt-2">
                Aux Petits Clochards, l'adoption responsable commence par nous :
                nous garantissons la santé et le bien-être de chaque chat, de
                son arrivée au foyer jusqu'à son départ vers sa famille pour la
                vie. Chaque adoption est précédée d'examens vétérinaires
                complets, et nous accompagnons ce processus :
                <span class="inline-block mx-2 mt-2">
                  - Vaccination à prévoir, avec notre aide*
                </span>
                <span class="inline-block mx-2">
                  - Bilan de santé complet avant adoption
                </span>
                <span class="inline-block mx-2">
                  - Conseils et suivi post-adoption
                </span>
              </span>

              <span class="inline-block mx-2 mt-4" style="font-size: 0.64rem">
                (*)Remboursement des soins de base à l'adoption.<br />
                L'association vous accompagne pour la vaccination.
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
            words="Adopter Tagada, c'est choisir une aventure différente, peut-être plus lente, mais tellement enrichissante : telle que l'avait choisie l'adoptante de Rufus - ancien pensionnaire du foyer d'accueil (cf. vidéo ci-dessus). Avec Snoop, ils avaient connu la vie sauvage et maintenant même après son départ, elle connait parfaitement aussi la vie en foyer d'accueil. Elle sait mieux que quiconque la valeur d'un foyer aimant. Son amour, une fois gagné, est un cadeau d'une pureté incomparable."
          ></TextGenerateEffect>
        </div>
      </div>

      <div class="flex md:flex-row flex-col w-100">
        <div class="md:basis-1/2 basis-full md:mr-10 flex flex-col">
          <h3 class="font-bold mt-10 mb-2">
            Témoignages de Marie <br />(notre comportementaliste) :
          </h3>

          <p class="font-serif border p-2 m-auto mt-4 basis-full text-xs">
            “Tagada est plus timide que son frère Snoop, mais est prête pour
            un.e adoptant.e patient.e. Et puis comme c'est une grande joueuse,
            elle pourrait se détendre beaucoup plus, et plus rapidement si on
            prend le temps de jouer avec elle.”⁣
          </p>

          <div class="basis-1/2">
            <h3 class="font-bold mt-10 mb-2">
              Il était une fois, le voyage de Snoop, qui est devenu maintenant
              celui de Tagada :
            </h3>
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

        <div
          class="md:basis-1/2 basis-full flex flex-col justify-between md:ml-10"
        >
          <div class="flex flex-col aligns-center items-center mb-4 mt-10">
            <h2 class="text-left text-base">
              <span class="font-bold">Adoption ou Accueil :</span>
            </h2>

            <div class="text-xs mt-2">
              <a
                href="https://lespetitsclochards.fillout.com/pre-adoption"
                target="_blank"
              >
                <Badge>Formulaire d'adoption</Badge>
              </a>
            </div>

            <div class="text-xs mt-2">
              <a
                href="https://lespetitsclochards.fillout.com/chatmille-accueil"
                target="_blank"
              >
                <Badge>Formulaire d'accueil</Badge>
              </a>
            </div>

            <div class="text-xs mt-2">
              <a href="tel:+33642804318" target="_blank">
                <Badge>06 42 80 43 18 (Mme Bonniot)</Badge>
              </a>
            </div>

            <div class="text-xs mt-2">
              <a href="mailto:lespetitsclochards91@gmail.com" target="_blank">
                <Badge>lespetitsclochards91@gmail.com</Badge>
              </a>
            </div>
          </div>
          <img
            alt="Snoop et Tagada"
            class="md:p-8 p-2 mt-4"
            src="/snoop-tagada/1half.jpg"
          />
        </div>
      </div>

      <div class="flex flex-col w-100">
        <h3 class="font-bold mt-10 mb-2">Un mot du cœur :</h3>

        <p class="text-xs">
          Aujourd'hui, Tagada n'est plus une chatte sauvage, mais une âme
          sensible qui a traversé bien des épreuves. Elle a appris à faire
          confiance avec son frère Snoop, et même après son départ, elle
          continue son chemin avec courage. Cette résilience témoigne de la
          force extraordinaire qui se cache derrière sa timidité.
        </p>

        <p class="text-xs mt-4">
          Elle cherche maintenant une famille d'accueil ou un foyer aimant, où
          elle pourra continuer à s'épanouir dans l'environnement de ses
          adoptant(e)s, essentiel à sa socialisation. Son histoire avec Snoop
          nous a appris que même les chats les plus craintifs peuvent s'ouvrir à
          l'amour avec de la patience et de la douceur.
        </p>

        <p class="text-xs mt-4">
          En devenant famille pour Tagada, vous n'adoptez pas seulement une
          chatte - vous devenez gardien d'une histoire, celle d'un duo en or
          noir dont l'un brille maintenant ailleurs. Certes, cela demande de la
          patience et de la persévérance, mais quelle plus belle récompense que
          de voir cette petite âme s'épanouir, jour après jour, portant en elle
          un peu de la lumière de son frère ?
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
