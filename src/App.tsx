import Quicklinks from "./components/app/Quicklinks";
import Header from "./components/layout/Header/Header";
import Revenue from "./pages/revenue/Revenue";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background px-4">
      <Header />
      <main className="flex-1 pb-24 lg:pb-0">
        <Revenue />
      </main>
      <Quicklinks />
    </div>
  );
}

export default App;
