// Define a composable or function for page data
export default function usePageData(templateString: string) {
  // Create a reactive reference for the page data
  const currentPage = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const fetchPageData = async () => {
    const route = useRoute();
    const { client } = usePrismic();

    const { data: pageData } = await useAsyncData("currentPage", async () => {
      const { path: currentPagePath } = route;

      const data = await client.getByUID(
        "navigationpage",
        (currentPagePath as string).replaceAll("/", "").replace("adoptions", "")
      );

      return data; // Return the data instead of setting currentPage.value
    });

    // Now currentPage is properly populated with resolved data

    console.log(pageData.value);

    // Check if the data properties exist
    if (
      pageData.value?.data?.meta_title &&
      pageData.value?.data?.meta_description
    ) {
      useSeoMeta({
        title: `${templateString} ${pageData.value.data.meta_title ? "- " + pageData.value.data.meta_title : ""}`,
        ogTitle: `${templateString} ${pageData.value.data.meta_title ? "- " + pageData.value.data.meta_title : ""}`,
        description: pageData.value.data.meta_description,
        ogDescription: pageData.value.data.meta_description,
      });
    }
  };

  // Return the reactive references and the fetch function
  return {
    currentPage,
    loading,
    error,
    fetchPageData,
  };
}
