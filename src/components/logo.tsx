import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:flex">
        <Image src="/logo.svg" alt="Logo" width={28} height={28} />
        <p className="text-2xl font-semibold ml-2.5 text-white">Fincepto</p>
      </div>
    </Link>
  );
};

export default Logo;
