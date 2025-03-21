import { ref } from "vue";
import type { CatInfo } from "~/interfaces/Cat";

export default function useCat() {
  const currentCatItem = ref<CatInfo | null>(null);
  const defaultOpen = ref(false);

  const router = useRouter();

  const commonOpen = (opened: boolean, catItem = null) => {
    defaultOpen.value = opened;

    if (opened) {
      if (catItem) {
        currentCatItem.value = catItem;

        router.push({
          name: router.currentRoute.value.name,
          query: { id: catItem.id },
        });
      }
    } else {
      router.push({
        name: router.currentRoute.value.name,
      });

      setTimeout(() => {
        currentCatItem.value = null;
      }, 1200);
    }
  };

  watch(
    () => router.currentRoute.value,
    (newRoute, oldRoute) => {
      if (!newRoute.query.id) {
        defaultOpen.value = false;
      } else {
        setTimeout(() => {
          defaultOpen.value = currentCatItem.value?.id === newRoute.query.id;
        }, 320);
      }
    },
    { immediate: true, deep: true }
  );

  return {
    currentCatItem,
    defaultOpen,
    commonOpen,
  };
}
