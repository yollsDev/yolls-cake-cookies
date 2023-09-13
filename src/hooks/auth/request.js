import { get } from "react-hook-form";
import { supabase } from "../../config/supabaseClient";

export const signUpRequest = async (params) => {
  try {
    // Step 1: Register the user using Supabase Auth
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

    // Step 2: Add the user to the users table
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
      // Step 3: Add the user to the members table
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

    return { user };
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

    // console.log(`error`, error);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error };
  } catch (error) {
    console.error("Login error request:", error.message);
    return { error: error.message };
  }
};
