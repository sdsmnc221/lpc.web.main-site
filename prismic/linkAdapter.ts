import type { Link } from "~/interfaces/Navigation";

export default function linkAdapter(link: Link) {
  if (link.linkhref && link.linkitem?.link_type === "Web") {
    return link.linkhref;
  } else if (link.linkitem?.type && link.linkitem?.uid) {
    switch (link.linkitem.type) {
      case "homepage":
        return { name: "index" };
      case "navigationpage":
        return { name: link.linkitem.uid };
      case "linkstreepage":
        return {
          name: "links-id",
          params: { id: link.linkitem.uid },
        };
      case "catfiche":
        return `/adoptions?uid=${link.linkitem.uid}`;
      default:
        return `/${link.linkitem.uid}`;
    }
  }
  return "/";
}
