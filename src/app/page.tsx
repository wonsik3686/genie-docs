import MainScene from '@/components/three/MainScene';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20">
      <MainScene />
      <main className="flex flex-col items-center justify-center gap-8 sm:items-start">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl-medium">Genie Docs</h1>
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-center gap-6">
        <p>Genie Docs</p>
      </footer>
    </div>
  );
}
