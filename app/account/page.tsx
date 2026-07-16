import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase.server";
import AccountForm from "./AccountForm";
import BottomNav from "@/components/BottomNav";
import Image from "next/image";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, bio, hobbies")
    .eq("id", user.id)
    .single();

return (
  <div
    className="relative flex min-h-screen flex-col pb-28"
    style={{backgroundColor: "var(--color-background)", padding: "0px 50px",fontFamily: "var(--font-poppins)" }}
  >
    
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <Image src="/BgStrokes.svg" alt="" fill role="presentation" className="object-cover" />
    </div>

    
    <div className="relative flex flex-col" style={{ zIndex: 0 }}>
      <Image
        src="/YDO.svg"
        alt="YDO"
        width={98}
        height={34}
        style={{ marginTop: "45px", marginLeft: "-24px" }}
      />
      <h1
        className="font-[600] text-center text-[28px] leading-[25px]  text-black"
        style={{ fontFamily: "var(--font-poppins)" , marginTop: "60px"}}
      >
        Account Centre
      </h1>
      <AccountForm
        email={user.email ?? ""}
        initialName={profile?.name ?? ""}
        initialBio={profile?.bio ?? ""}
        initialHobbies={profile?.hobbies ?? []}
      />
      <BottomNav />
    </div>
  </div>
)}