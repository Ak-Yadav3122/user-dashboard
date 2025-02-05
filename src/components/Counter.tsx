import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [bgLevel, setBgLevel] = useState(0);

  useEffect(() => {
    setBgLevel(Math.min(100, Math.max(0, count * 5)));
  }, [count]);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => Math.max(0, prev - 1));
  const reset = () => {
    setCount(0);
    setBgLevel(0);
  };

  return (
    <div 
      className="min-h-[300px] p-8 rounded-lg transition-all duration-500"
      style={{
        backgroundColor: `hsla(221, 45%, ${bgLevel}%, 0.2)`,
      }}
    >
      <Card className="p-6 max-w-md mx-auto bg-white/90 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Counter</h2>
        <div className="text-4xl font-bold text-center mb-6">{count}</div>
        <div className="flex justify-center gap-4">
          <Button onClick={decrement} variant="outline">-</Button>
          <Button onClick={reset} variant="destructive">Reset</Button>
          <Button onClick={increment}>+</Button>
        </div>
      </Card>
    </div>
  );
};

export default Counter;