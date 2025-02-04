"use client";

import Button from "@/components/Buttons";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Text from "@/components/Text";
import { TooltipIcon } from "@/components/Tooltip/tooltipicons";
import { columns } from "@/lib/data";
import {
  Selection,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import Image from "next/image";
import React, { FC, useMemo, useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";

// สร้างฟังก์ชันเพื่อดึงข้อมูลจาก API
const fetchOrders = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

const TableSection: FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [orders, setOrders] = useState<any[]>([]); // เก็บข้อมูลจาก API
  const [isLoading, setIsLoading] = useState(true); // สำหรับการโหลดข้อมูล

  // ดึงข้อมูลจาก API เมื่อ Component โหลด
  useEffect(() => {
    const getData = async () => {
      const data = await fetchOrders();
      setOrders(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  // ฟังก์ชันลบข้อมูลหลายรายการ
  const handleMultipleDelete = () => {
    if (selectedKeys === "all") {
      setOrders([]);
    } else {
      const selectedID = Array.from(selectedKeys);
      setOrders((prev) =>
        prev.filter((order) => !selectedID.includes(order.id.toString()))
      );
    }
    setSelectedKeys(new Set());
  };

  const isEmpty = orders.length === 0;
  const [rowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(orders.length / rowsPerPage);

  // คำนวณข้อมูลที่จะแสดงในตาราง
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return orders.slice(start, end);
  }, [page, rowsPerPage, orders]);

  // แสดงข้อความโหลดขณะดึงข้อมูล
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-2">
      <Table
        topContent={
          selectedKeys == "all" || selectedKeys.size > 0 ? (
            <div className="flex w-full items-center justify-between bg-danger-50 p-2 px-4">
              <Text variant="text-table" className="text-danger-600">
                {selectedKeys === "all"
                  ? "All rows selected"
                  : `${selectedKeys.size} selected`}
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
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        {/* แสดงข้อมูลใน TableBody */}
        <TableBody>
          {items.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell>{order.user_id}</TableCell>
              <TableCell>{order.order_date}</TableCell>
              <TableCell>{order.total_amount}</TableCell>
              {/* เพิ่มคอลัมน์อื่น ๆ ตามข้อมูลที่ได้จาก API */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSection;
