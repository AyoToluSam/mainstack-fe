import Header from "./components/layout/Header";
import Revenue from "./pages/revenue/Revenue";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Revenue />
      </main>
    </div>
  );
}

export default App;
