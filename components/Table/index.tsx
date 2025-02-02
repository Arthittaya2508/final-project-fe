import { extendVariants, Table as TableHeroUI } from "@heroui/react";
import type { TableProps } from "@heroui/react";
import React, { FC, useMemo, forwardRef } from "react";

const ExtendedTable = extendVariants(TableHeroUI, {
  variants: {
    color: {
      danger: {
        th: "bg-primary-300 text-grey-600",
        wrapper: ["bg-primary-100/50"],
        tr: ["bg-light", "data-[selected=true]:border-danger-600"],
        td: ["data-[selected=true]:before:bg-danger-50"],
      },
    },
    radius: {
      none: {
        wrapper: ["!rounded-t-none", "!rounded-b-none"],
        table: ["!rounded-t-sone", "!rounded-b-none"],
        th: ["!rounded-s-none", "!rounded-e-none"],
      },
      lg: {
        wrapper: ["!rounded-t-lg", "!rounded-b-none"],
        table: ["!rounded-t-lg", "!rounded-b-none"],
        th: ["!rounded-s-none", "!rounded-e-none"],
      },
    },
    textSize: {
      md: {
        th: "text-table",
        td: "text-small2",
      },
    },
    emptyWrapper: {
      true: {
        wrapper: "bg-primary-100/50",
        tbody: "h-screen",
      },
      loadingWrapper: {
        true: {
          wrapper: "bg-primary-100/50",
          tbody: "h-screen",
        },
      },
    },
    size: {
      md: {
        base: "w-full h-full",
        tbody: "!p-2",
      },
    },
  },
  defaultVariants: {
    color: "danger",
    radius: "lg",
    textSize: "md",
    size: "md",
  },
});

interface Props extends TableProps {
  emptyWrapper?: boolean | undefined;
}

const Table: FC<Props> = forwardRef<HTMLElement, Props>(
  ({ children, ...rest }, ref) => {
    const checkboxClasses = useMemo(() => {
      switch (rest.color) {
        case "danger":
          return {
            wrapper: "before:border-primary-600 bg-white",
          };

        default:
          return rest.checkboxesProps?.classNames;
      }
    }, [rest.color, rest.checkboxesProps?.classNames]);

    return (
      <ExtendedTable
        {...rest}
        checkboxesProps={{
          ...rest.checkboxesProps,
          classNames: checkboxClasses,
        }}
      >
        {children}
      </ExtendedTable>
    );
  }
);

export default Table;
