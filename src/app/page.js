import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import AppNavbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <AppNavbar></AppNavbar>
      <Banner></Banner>
      <Footer></Footer>
    </>
  );
}
