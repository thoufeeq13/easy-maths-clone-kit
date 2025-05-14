
import { Calculator } from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Easy Math Calculator</h1>
      <Calculator />
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>A simple calculator built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Index;
