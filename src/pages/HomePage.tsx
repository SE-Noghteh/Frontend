import Footer from "@/components/shared/Footer/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-10">
        <h1>Home</h1>
      </main>

      <Footer />
    </div>
  );
}