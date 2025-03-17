import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-pink-200">
      <div className="mx-auto max-w-[1200px] py-[50px]">
        <div className="flex gap-[30px]">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/users"}>Users</Link>
          <Link href={"/profile"}>Profile</Link>
        </div>
      </div>
    </header>
  );
};
