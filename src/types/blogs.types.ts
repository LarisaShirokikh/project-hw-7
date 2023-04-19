export type BlogsType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export type BlogsExtendedType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: [BlogsType | BlogsType[]];
};
