"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../assets/images/logo.svg";
import { HomeIcon } from "@/assets/icons/home-icon";
import { TransactionsIcon } from "@/assets/icons/transactions-icon";
import { UserIcon } from "@/assets/icons/user-icon";
import { WarehouseIcon } from "@/assets/icons/warehouse-icon";
import { SettingsIcon } from "@/assets/icons/settings-icon";
import { usePathname } from "next/navigation";

export const Layout = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: <HomeIcon /> },
    {
      href: "/transactions",
      label: "Transactions",
      icon: <TransactionsIcon />,
    },
    { href: "/patient", label: "Patients", icon: <UserIcon /> },
    { href: "/warehouse", label: "Warehouse", icon: <WarehouseIcon /> },
    { href: "/settings", label: "Settings", icon: <SettingsIcon /> },
  ];
  return (
    <div className="h-screen w-[250px] bg-[#fff] border-r-[1px] border-r-[#e6eff5] flex flex-col justify-between">
      <div>
      <div className="p-[32px]">
        <Link href={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>
      </div>
      <ul className="pt-[15px] pl-[40px]">
        {links.map(({ href, label, icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex gap-[26px] font-[400] text-[18px] cursor-pointer mb-[40px] transition-colors 
                  ${
                    pathname === href
                      ? "text-[#2D60FF]"
                      : "text-[#B1B1B1] hover:text-[#5A85FF]"
                  }`}
            >
              {icon}
              {label}
            </Link>
          </li>
        ))}
      </ul>
      </div>
      <div className="ml-[40px] mb-[30px]">
        <button className="rounded bg-[#2D60FF] py-[10px] px-[20px] text-[#fff] text-[18px] font-medium">
          Logout
        </button>
      </div>
    </div>
  );
};
