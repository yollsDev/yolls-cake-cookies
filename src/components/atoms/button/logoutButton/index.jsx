import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../config/supabaseClient";

export const LogoutButton = ({ role }) => {
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      if (role === "MEMBER") {
        navigate("/auth/member/login");
      } else {
        navigate("/auth/admin/login");
      }
    }
  };
  return (
    <div onClick={handleLogoutClick} className="cursor-pointer">
      Logout
    </div>
  );
};
