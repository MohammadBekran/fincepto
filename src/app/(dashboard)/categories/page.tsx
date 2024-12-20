import type { Metadata } from "next";

import Categories from "@/features/categories/components";

const CategoriesPage = () => {
  return <Categories />;
};

export const metadata: Metadata = {
  title: "Categories",
  description: "manage all of your categories",
};

export default CategoriesPage;
