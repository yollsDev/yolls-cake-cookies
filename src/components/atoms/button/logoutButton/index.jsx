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
    <div
      onClick={handleLogoutClick}
      className="cursor-pointer focus:outline-none rounded-full text-center inline-flex items-center gap-4 bg-red-400 text-white p-2 w-24 justify-center mt-5"
    >
      Logout
    </div>
  );
};
