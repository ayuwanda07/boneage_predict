import Hero from '@/components/Hero';
import ImageUploadProps from '@/components/ImageUpload';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <ImageUploadProps/>
      <Footer />
    </main>
  );
}