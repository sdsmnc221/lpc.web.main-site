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

  return {
    logo,
    photoGrids,
    links,
    pageTitle,
    pageDescription,
  };
}
