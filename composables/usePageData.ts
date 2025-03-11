// Define a composable or function for page data
export default function usePageData(templateString: string) {
  // Create a reactive reference for the page data
  const currentPage = ref<any>(null);
  const loading = ref(true);
  const error = ref(null);

  const fetchPageData = () => {
    const route = useRoute();
    const { client } = usePrismic();

    setTimeout(async () => {
      const { data: pageData } = await useAsyncData("currentPage", async () => {
        const { path: currentPagePath } = route;

        const data = await client.getByUID(
          "navigationpage",
          (currentPagePath as string)
            .replaceAll("/", "")
            .replace("adoptions", "")
        );

        return data; // Return the data instead of setting currentPage.value
      });

      // Now currentPage is properly populated with resolved data
      currentPage.value = pageData.value;
    }, 120);
  };

  watch(
    () => currentPage.value,
    () => {
      console.log(currentPage.value);
      // Check if the data properties exist
      if (
        currentPage.value?.data?.meta_title &&
        currentPage.value?.data?.meta_description
      ) {
        useSeoMeta({
          title: `${templateString} ${currentPage.value.data.meta_title ? "- " + currentPage.value.data.meta_title : ""}`,
          ogTitle: `${templateString} ${currentPage.value.data.meta_title ? "- " + currentPage.value.data.meta_title : ""}`,
          description: currentPage.value.data.meta_description,
          ogDescription: currentPage.value.data.meta_description,
        });
      }
    },
    { immediate: true, deep: true }
  );

  // Return the reactive references and the fetch function
  return {
    currentPage,
    loading,
    error,
    fetchPageData,
  };
}
