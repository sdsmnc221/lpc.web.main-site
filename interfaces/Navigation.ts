export type LinkItem = {
  id: string;
  type: string;
  tags: string[];
  lang: string;
  slug: string;
  first_publication_date: string;
  last_publication_date: string;
  link_type: string;
  isBroken: boolean;
  uid?: string;
};

export type Link = {
  linkitem?: LinkItem;
  linklabel: string;
  linkhref?: string;
};
