"use client";

import { Dashboard } from "@/components/dashboard";
import { supabase } from "@/lib/supabase";

const user = {
  user_metadata: {
    username: "ahmed_coder",
  },
};

export default function Home() {
  const createUser = async () => {
    const { data, error } = await supabase.from("users").insert({
      // username: "ahmed_coder",
      // college: "كلية الهندسة",
      // year: "3",
      // codeforces_handle: "ahmed_coder",
      // leetcode_handle: "ahmed_coder",
      name: "ahmed_coder",
    });
    if (error) console.log(error);

    console.log(data);
  };

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <Button onClick={createUser}>create user</Button>
  //   </div>
  // );
  return <Dashboard user={user} />;
}
