export interface TrustedOrganization {
  name: string;
  logo: string;
  alt: string;
  sizeClass?: string;
}

export const TRUSTED_ORGANIZATIONS: TrustedOrganization[] = [
  {
    name: "New Era",
    logo: "/clients/new-era.png",
    alt: "New Era - The World School Logo",
    sizeClass: "max-h-10 max-w-[82%]",
  },
  {
    name: "Genesis",
    logo: "/clients/genesis.png",
    alt: "Genesis Official Logo",
    sizeClass: "max-h-12 max-w-[82%]",
  },
  {
    name: "MamaSprash",
    logo: "/clients/mamasprash.png",
    alt: "MamaSprash Preschool Logo",
    sizeClass: "max-h-11 max-w-[84%]",
  },
  {
    name: "Joy School",
    logo: "/clients/joy-school.png",
    alt: "Kinder Joy School Logo",
    sizeClass: "max-h-10 max-w-[82%]",
  },
  {
    name: "Dcode",
    logo: "/clients/dcode.png",
    alt: "The Dcode Store Logo",
    sizeClass: "max-h-9 max-w-[82%]",
  },
];
