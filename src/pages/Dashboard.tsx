import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSpring, animated } from '@react-spring/web';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Counter from '@/components/Counter';

interface ChartData {
  name: string;
  value: number;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 }
  });

  useEffect(() => {
    // Mock data for the chart
    const data = Array.from({ length: 7 }, (_, i) => ({
      name: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 100)
    }));
    setChartData(data);
  }, []);

  return (
    <animated.div style={fadeIn} className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Activity Counter</h2>
            <Counter />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Activity Trend</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </animated.div>
  );
};

export default Dashboard;