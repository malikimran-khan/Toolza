function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
          Welcome to the Future
        </h1>
        <p className="text-xl text-purple-300 mb-8 max-w-xl mx-auto">
          The universe is under no obligation to make sense to you — but we'll
          try our best anyway.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-colors">
            Get Started
          </button>
          <button className="border border-purple-400 text-purple-300 hover:bg-purple-800/30 font-semibold px-8 py-3 rounded-full transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;