import ButtonSection from "@/containers/sandbox-page/button-section";
import DropdownSection from "@/containers/sandbox-page/dropdown";
import TabbarSection from "@/containers/sandbox-page/tabbar-section";
import TableSection from "@/containers/sandbox-page/table-section";
import React from "react";

function SandBox() {
  return (
    <section className="container m-auto">
      <ButtonSection />
      <TabbarSection />
      <DropdownSection />
      <TableSection />
    </section>
  );
}

export default SandBox;
