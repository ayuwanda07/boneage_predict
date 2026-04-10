import Hero from '@/components/Hero';
import ImageUpload from '@/components/ImageUpload';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <ImageUpload />
      <Footer />
    </main>
  );
}