import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../config/supabaseClient";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/auth/admin/login");
    }
  };
  return (
    <div onClick={handleLogoutClick} className="cursor-pointer">
      Logout
    </div>
  );
};
