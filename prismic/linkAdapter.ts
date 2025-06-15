import type { Link } from "~/interfaces/Navigation";

export default function linkAdapter(link: Link, linkType?: string) {
  console.log(linkType);
  let to = "";
  if (link.linkhref && link.linkitem?.link_type === "Web") {
    to = link.linkhref;
  } else if (linkType) {
    switch (linkType) {
      case "homepage":
        to = "/";
        break;
      case "navigationpage":
        to = link.linkitem.uid;
        break;
      case "linkstreepage":
        to = `/links/${link.linkitem?.uid}`;
        break;
      default:
        to = link.linkitem.uid;
        break;
    }
  } else {
    to = "/";
  }

  return to;
}
