import Head from 'next/head';
import VHSLabelGenerator from '../components/VHSLabelGenerator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Blockbuster VHS Label Generator</title>
        <meta name="description" content="Create your own Blockbuster VHS label" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="container mx-auto py-8 px-4">
        <VHSLabelGenerator />
      </main>

      <footer className="mt-8 py-6 text-center text-gray-500 text-sm">
        <p>Blockbuster VHS Label Generator &copy; {new Date().getFullYear()}</p>
        <p className="mt-2">Original SVG template designed by Ryan Finnie (CC-BY-SA)</p>
      </footer>
    </div>
  );
}