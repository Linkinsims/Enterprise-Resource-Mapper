import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return navigate("/");
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) setError(error.message);
    else navigate("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="bg-bg-card p-8 rounded-lg border border-border-default w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Atlas Login</h1>
        {!isSupabaseConfigured && (
          <button onClick={() => navigate("/")} className="w-full mb-4 bg-green-600 text-white py-2 rounded">
            View Demo Dashboard
          </button>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-bg-surface border rounded" placeholder="Email" /></div>
          <div className="mb-4"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-bg-surface border rounded" placeholder="Password" /></div>
          {error && <p className="text-negative text-sm mb-4">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-text-primary text-bg-primary py-2 rounded">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
