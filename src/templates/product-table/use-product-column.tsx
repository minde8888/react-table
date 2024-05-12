import clsx from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ListIcon from "../../fundamentals/icons/list-icon";
import TileIcon from "../../fundamentals/icons/tile-icon";
import ImagePlaceholder from "../../fundamentals/image-placeholder";
import StatusIndicator from "../../fundamentals/status-indicator";

type Product = {
  title: string;
  thumbnail?: string;
  collection?: { title: string };
  status: "proposed" | "published" | "rejected" | "draft" | string;
  variants: { inventory_quantity: number }[];
};

type Column = {
  Header: string | JSX.Element;
  accessor: string;
  Cell?: (props: { row?: { original: Product }; cell?: { value: any } }) => JSX.Element;
};

type StatusVariant = "warning" | "success" | "danger" | "default" | "primary" | "active";

interface UseProductTableColumnProps {
  setTileView: () => void;
  setListView: () => void;
  showList: boolean;
}

function getProductStatus(t: (key: string, options?: { defaultValue?: string }) => string, status: string): JSX.Element {
  const statuses: Record<string, { title: string; variant: StatusVariant }> = {
    proposed: { title: t("product-table-proposed", { defaultValue: "Proposed" }), variant: "warning" },
    published: { title: t("product-table-published-title", { defaultValue: "Published" }), variant: "success" },
    rejected: { title: t("product-table-rejected", { defaultValue: "Rejected" }), variant: "danger" },
    draft: { title: t("product-table-draft-title", { defaultValue: "Draft" }), variant: "default" }
  };

  const statusInfo = statuses[status] || { title: status, variant: "default" };

  return <StatusIndicator title={statusInfo.title} variant={statusInfo.variant} />;
}

const useProductTableColumn = ({ setTileView, setListView, showList }: UseProductTableColumnProps): [Column[]] => {
  const { t } = useTranslation();

  const columns: Column[] = useMemo(
    () => [
      {
        Header: t("product-table-name", { defaultValue: "Name" }),
        accessor: "title",
        Cell: ({ row }) => {
          const original = row?.original as Product;
          return (
            <div className="flex items-center">
              <div className="my-1.5 mr-4 flex h-[40px] w-[30px] items-center">
                {original.thumbnail ? (
                  <img
                    src={original.thumbnail}
                    alt={original.title}
                    className="rounded-soft h-full object-cover"
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
              {original.title}
            </div>
          );
        },
      },
      {
        Header: t("product-table-collection", { defaultValue: "Collection" }),
        accessor: "collection",
        Cell: ({ cell }) => {
          const value = cell?.value as { title: string } | undefined;
          return <div>{value?.title || "-"}</div>;
        },
      },
      {
        Header: t("product-table-status", { defaultValue: "Status" }),
        accessor: "status",
        Cell: ({ cell }) => {
          const value = cell?.value as string;
          return getProductStatus(t, value);
        },
      },
      {
        Header: t("product-table-inventory", { defaultValue: "Inventory" }),
        accessor: "variants",
        Cell: ({ cell }) => {
          const value = cell?.value as { inventory_quantity: number }[];
          const inventoryCount = value.reduce((acc, next) => acc + next.inventory_quantity, 0);
          return (
            <div>
              {inventoryCount}
              {t(
                "product-table-inventory-in-stock-count",
                " in stock for {{count}} variant(s)",
                { count: value.length }
              )}
            </div>
          );
        },
      },
      {
        accessor: "col-3",
        Header: (
          <div className="flex justify-end text-right">
            <span
              onClick={setListView}
              className={clsx("hover:bg-grey-5 cursor-pointer rounded p-0.5", {
                "text-grey-90": showList,
                "text-grey-40": !showList,
              })}
            >
              <ListIcon size={20} />
            </span>
            <span
              onClick={setTileView}
              className={clsx("hover:bg-grey-5 cursor-pointer rounded p-0.5", {
                "text-grey-90": !showList,
                "text-grey-40": showList,
              })}
            >
              <TileIcon size={20} />
            </span>
          </div>
        ),
      }
    ],
    [t, showList, setListView, setTileView]
  );

  return [columns];
};

export default useProductTableColumn;
