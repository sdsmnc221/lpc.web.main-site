import type { Image } from "./Common";

export type CatInfo = {
  index: number;
  id: string;
  uid: string;
  createddate: string;
  catphoto: Image;
  catphoto2: Image;
  catname: string;
  catsexe?: string;
  catbirth?: string;
  catbirthyear?: string;
  catagenumber?: number;
  catagetype?: string;
  catdescription?: any;
  catidentification?: string;
  catvaccination?: boolean;
  catsterilization?: boolean;
  zipcode?: null | number;
  relatedcat?: any | null;
  adoptionstatus?: string;
  contactInfo?: any;
  adoptionRequirements?: any;
  avatarPlaceholder?: Image;
  isfosterpossible?: boolean;
};
