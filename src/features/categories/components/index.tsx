"use client";

import { Row } from "@tanstack/react-table";
import { Loader2, PlusIcon } from "lucide-react";

import CreateCategoryModal from "@/features/categories/components/create-category-modal";
import EditCategoryModal from "@/features/categories/components/edit-category-modal";
import { CATEGORY_COLUMNS } from "@/features/categories/core/constants";
import { useCreateCategoryModal } from "@/features/categories/core/hooks";
import { useBulkDeleteCategory } from "@/features/categories/core/services/api/mutations.api";
import { useGetCategories } from "@/features/categories/core/services/api/queries.api";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Categories = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories();
  const { mutate: bulkDeleteCategory, isPending: bulkDeleteCategoryPending } =
    useBulkDeleteCategory();
  const { open } = useCreateCategoryModal();

  const isDisabled = isCategoriesLoading || bulkDeleteCategoryPending;

  const containerClassName = "w-full max-w-screen-2xl mx-auto pb-10 -mt-24";
  const cardClassName = "border-bone drop-shadow-sm";

  if (isCategoriesLoading) {
    return (
      <div className={containerClassName}>
        <Card className={cardClassName}>
          <CardHeader>
            <Skeleton className="w-48 h-8" />
          </CardHeader>
          <CardContent>
            <div className="w-full h-[500px] flex justify-center items-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = (
    row: Row<{
      id: string;
      name: string;
    }>[]
  ) => {
    const ids = row.map((categoryRow) => categoryRow.original.id);

    bulkDeleteCategory({ json: { ids } });
  };

  return (
    <div className={containerClassName}>
      <Card className={cardClassName}>
        <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle>Categories page</CardTitle>
          <Button size="sm" onClick={open} disabled={isDisabled}>
            <PlusIcon className="size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            columns={CATEGORY_COLUMNS}
            data={categories ?? []}
            disabled={isDisabled}
            onDelete={(row) => handleDelete(row)}
          />
        </CardContent>
      </Card>
      <CreateCategoryModal />
      <EditCategoryModal />
    </div>
  );
};

export default Categories;
