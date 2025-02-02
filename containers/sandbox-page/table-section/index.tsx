"use client";

import Button from "@/components/Buttons";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Text from "@/components/Text";
import { TooltipIcon } from "@/components/Tooltip/tooltipicons";
import { columns, users as usersData } from "@/lib/data";
import {
  Selection,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import Image from "next/image";
import React, { FC, useMemo, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";

const TableSection: FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const handleMultipleDelete = () => {
    // console.log('Selected Keys:', selectedKeys)

    if (selectedKeys === "all") {
      setUsers([]);
    } else {
      const selectedID = Array.from(selectedKeys);
      // console.log('Selected IDs:', selectedID)

      setUsers((prev) => {
        const NewUsers = prev.filter(
          (user) => !selectedID.includes(user.id.toString())
        );
        // console.log('Filtered Users:', NewUsers)
        return NewUsers;
      });
    }

    setSelectedKeys(new Set());
  };

  const [users, setUsers] = useState(usersData);

  const isEmpty = users.length === 0;

  const [rowsPerPage] = React.useState(10);

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, rowsPerPage, users]);

  return (
    <div className="mt-2">
      <Table
        topContent={
          selectedKeys == "all" || selectedKeys.size > 0 ? (
            <div className="flex w-full items-center justify-between bg-danger-50 p-2 px-4">
              <Text variant="text-table" className="text-danger-600">
                {selectedKeys === "all"
                  ? "All rows selected"
                  : `${selectedKeys.size}  selected`}
              </Text>
              <div className="flex justify-end">
                <Button
                  size="icon"
                  isIconOnly={true}
                  className="text-danger-600"
                  onClick={handleMultipleDelete}
                >
                  <TooltipIcon icon={<FaRegTrashCan />} tooltip="Delete" />
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )
        }
        aria-label="table"
        color="danger"
        radius="lg"
        selectionMode="multiple"
        emptyWrapper={isEmpty}
        bottomContentPlacement="outside"
        bottomContent={
          isEmpty ? (
            <></>
          ) : (
            <Pagination
              showControls
              page={page}
              total={pages}
              variant="light"
              onChange={setPage}
              className="flex justify-center"
            />
          )
        }
        classNames={{
          wrapper: "p-0 !gap-0",
          th: "p-4",
          td: "p-4",
          tbody: "!p-0",
        }}
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
      >
        <TableHeader className="bg-primary-300" columns={columns}>
          {(column) => {
            return <TableColumn key={column.uid}>{column.name}</TableColumn>;
          }}
        </TableHeader>

        <TableBody
          items={items}
          emptyContent={
            <div className="flex flex-col items-center gap-4 p-5">
              <Image
                src="/images/no_data.svg"
                width={150}
                height={150}
                alt=""
              />
              <Text variant="text-header3" className="text-grey-400">
                No organization added
              </Text>
              <Text variant="text-body1" className="text-grey-400">
                Click below to add organization
              </Text>
              <Button size="md" startContent={<FiPlusCircle size={20} />}>
                Create Organization
              </Button>
            </div>
          }
        >
          {(item) => {
            return (
              <TableRow key={item.id}>
                {(columnKey) => {
                  return (
                    <TableCell>
                      <>{columnKey}</>
                    </TableCell>
                  );
                }}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      {/* {isModalOpen && <ModalContainer closeModal={closeModal} />} */}
    </div>
  );
};

export default TableSection;
