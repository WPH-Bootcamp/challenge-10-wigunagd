import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { iconBlankDocument } from "../../../public/asset/asset";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="container mt-[80px] mx-auto w-full max-w-[1440px] py-2 flex-grow flex flex-col items-center justify-center text-center gap-5">
        <Image 
          src={iconBlankDocument} 
          width={150} 
          height={150} 
          alt="Not Found" 
          className="opacity-50"
        />
        
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-gray-900">404</h1>
          <h2 className="text-2xl font-bold text-gray-700">Page Not Found</h2>
          <p className="text-gray-500 max-w-md">
            The post or page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Button asChild className="rounded-full px-10 h-[48px] mt-4">
          <Link href="/">Back to Homepage</Link>
        </Button>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;