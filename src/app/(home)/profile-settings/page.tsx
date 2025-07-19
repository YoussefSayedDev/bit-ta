import { ProfileSettings } from "@/components/profile-settings";
import { User } from "@/types";

const user: User = {
  user_metadata: {
    username: "ahmed_coder",
    college: "كلية الهندسة",
    year: "3",
    codeforces_handle: "ahmed_coder",
    leetcode_handle: "ahmed_coder",
  },
  email: "ahmed.coder@gmail.com",
};

export default function ProfileSettingsPage() {
  return <ProfileSettings user={user} />;
}
