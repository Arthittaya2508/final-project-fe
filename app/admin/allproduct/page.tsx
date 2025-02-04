"use client";
import React, { useEffect, useState } from "react";

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
    return []; // คืนค่ากลับเป็นอาร์เรย์ว่างหากเกิดข้อผิดพลาด
  }
};

function AllProduct() {
  const [orders, setOrders] = useState<any[]>([]); // เก็บข้อมูลจาก API
  const [isLoading, setIsLoading] = useState(true); // การแสดงสถานะการโหลด

  useEffect(() => {
    const getData = async () => {
      const data = await fetchOrders();
      setOrders(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // แสดงข้อความโหลดขณะดึงข้อมูล
  }

  return (
    <div>
      <h1>All Products</h1>
      {orders.length === 0 ? (
        <p>No orders available</p> // ถ้าไม่มีข้อมูล
      ) : (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Shipping Date</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.user_id}>
                <td>{order.user_id}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>{" "}
                {/* แปลงวันที่เป็นรูปแบบที่อ่านง่าย */}
                <td>{order.total_amount}</td>
                <td>
                  {new Date(order.shipping_date).toLocaleDateString()}
                </td>{" "}
                {/* แปลงวันที่เป็นรูปแบบที่อ่านง่าย */}
                <td>{order.order_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllProduct;
