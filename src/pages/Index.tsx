import Counter from "@/components/Counter";
import UserForm from "@/components/UserForm";
import RichEditor from "@/components/RichEditor";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen gradient-bg p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">
            Interactive Dashboard
          </h1>
          {isAuthenticated ? (
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} variant="outline">
              Login
            </Button>
          )}
        </div>

        <Counter />

        <div className="grid gap-8 md:grid-cols-2">
          <UserForm />
          <RichEditor />
        </div>
      </div>
    </div>
  );
};

export default Index;
