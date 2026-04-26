"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Clarity from "@microsoft/clarity";

export default function ClarityInit() {
  const pathname = usePathname();

  useEffect(() => {
    Clarity.init("whgujq1fkw");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    Clarity.upgrade(pathname);
    Clarity.setTag("page", pathname);
  }, [pathname]);

  return null;
}
