import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import AppNavbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <AppNavbar></AppNavbar>
      <Banner></Banner>
      <Categories></Categories>
      <Stats></Stats>
      <Footer></Footer>
    </>
  );
}
