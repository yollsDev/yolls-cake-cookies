import { supabase } from "../../../config/supabaseClient";

export const GetAllMember = async () => {
  try {
    let { data: members, error } = await supabase.from("members").select("*");

    if (error) {
      throw new Error("Error getting all members");
    } else {
      const userEmailPromises = members.map(async (member) => {
        let { data: users, error } = await supabase
          .from("users")
          .select("email")
          .eq("auth_id", member.user_id)
          .single();

        if (error) {
          throw new Error("Error getting user email");
        }

        return users.email;
      });

      const userEmails = await Promise.all(userEmailPromises);
      //   console.log(userEmails);
      return { userEmails, members, error: null };
    }
  } catch (error) {
    console.error("Member Request error:", error.message);
    return { error: error.message };
  }
};

export const getMemberByID = async (id) => {
  try {
    let { data: member, error } = await supabase
      .from("members")
      .select("*")
      .eq("user_id", id)
      .single();

    return { member, error };
  } catch (error) {
    console.error("getMemberByID Request error:", error.message);
    return { error: error.message };
  }
};

export const deleteMemberRequest = async (id) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .delete()
      .eq("member_id", id);

    return { data, error };
  } catch (error) {
    console.error("User Delete error request:", error.message);
    return { error: error.message };
  }
};
