import { get } from "react-hook-form";
import { supabase } from "../../config/supabaseClient";

export const getUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error.message);
    }
    return { user, error };
  } catch (error) {
    console.error("User error:", error.message);
    throw error;
  }
};

export const signUpRequest = async (params) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          name: params.name,
          city: params.city,
          birthdate: params.birthdate,
          role: params.role,
        },
      },
    });

    if (error) {
      throw error;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: userRecord, error: userError } = await supabase
      .from("users")
      .upsert([
        {
          auth_id: user.id,
          email: params.email,
          password: params.password,
          role: params.role,
        },
      ]);

    if (userError) {
      throw userError;
    }

    if (params.role === "MEMBER") {
      const { data: memberRecord, error: memberError } = await supabase
        .from("members")
        .upsert([
          {
            user_id: user.id,
            name: params.name,
            city: params.city,
            birthDate: params.birthdate,
            points: 0,
          },
        ]);

      if (memberError) {
        throw memberError;
      }
    }

    // console.log(`data`, user);

    return { data };
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};

export const loginRequest = async (params) => {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (error) {
      throw new Error(error.message);
    }
    return { data, error };
  } catch (error) {
    console.error("Login error request:", error.message);
    throw error;
  }
};
