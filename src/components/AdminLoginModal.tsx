import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginModal({ open, onClose, onSuccess }: { open: boolean, onClose: () => void, onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  if (!open) return null;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setErrorMsg(error.message);
    else {
      setErrorMsg("Account created! Now sign in.");
      setIsSignUp(false);
      setEmail("");
      setPassword("");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMsg(error.message);
    else onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded-xl min-w-[320px] flex flex-col gap-3" onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <div className="font-bold text-lg mb-2">{isSignUp ? "Create Account" : "Admin Login"}</div>
        <Input autoFocus required placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</Button>
        <Button type="button" variant="ghost" onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(null); setEmail(""); setPassword(""); }}>
          {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </Button>
        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
        {errorMsg && <div className={`text-sm mt-2 ${errorMsg.includes("created") ? "text-green-600" : "text-red-600"}`}>{errorMsg}</div>}
      </form>
    </div>
  );
}
