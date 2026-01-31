/**
 * Home Page
 * 
 * TODO: Implement homepage sesuai dengan design Figma
 * - Tampilkan daftar artikel blog
 * - Implement search/filter jika diperlukan
 * - Handle loading dan error states
 */

import Navigation from "@/components/Navigation";
import HomePageContent from "./(homepagecontent)/HomePageContent";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mt-[80px] mx-auto w-full max-w-[1440px] py-2">
        <HomePageContent />
      </main>
    </div>
  );
}
