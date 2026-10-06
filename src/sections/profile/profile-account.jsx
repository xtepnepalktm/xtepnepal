
import { ProfileGeneral } from "./profile-general";
import { ProfileSecurity } from "./profile-security";

export function ProfileAccount() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="w-full">
        <ProfileGeneral />
      </div>

      <div className="w-full">
        <ProfileSecurity />
      </div>
    </div>
  );
}