export default async function useLinkstreeLayout(uid?: string) {
  const config = useRuntimeConfig();

  const { client } = usePrismic();

  const { data: linkstree } = await useAsyncData("linkstree", () =>
    client.getByUID("linkstreepage", uid ?? "links")
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

  const meta = ref({
    title: assets.value?.meta_title,
    description: assets.value?.meta_description,
    image: assets.value?.meta_image.url,
  });

  watch(
    () => assets.value,
    () => {
      meta.value = {
        title: assets.value?.meta_title,
        description: assets.value?.meta_description,
        image: assets.value?.meta_image.url,
      };
    }
  );

  return {
    logo,
    photoGrids,
    links,
    pageTitle,
    pageDescription,
    meta,
  };
}