"use client"

import { useState,useEffect } from "react";
import Image  from "next/image";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { ProfileDetails } from "@/components/ProfileDetails";
import { profileById ,SELECTED_PROFILE_IDS_STORAGE_KEY,type ProfileStruct } from "@/data/dummyProfiles";
const profileCardColors = [
  "border-stroke bg-secondary",
  "border-stroke bg-foreground",
  "border-stroke bg-primary",
  "border-stroke bg-white",
];

export default function DashboardPage() {
  const router = useRouter();
  const [showSystemMessage,setShowSystemMessage] = useState(true);

  const [selectedProfiles,setSelectedProfiles] = useState<ProfileStruct[]>([]);
  const [viewedProfile, setViewedProfile] =useState<ProfileStruct | null>(null);
  useEffect(() => {
  const storedIds = localStorage.getItem(SELECTED_PROFILE_IDS_STORAGE_KEY);

  if (!storedIds) {
    return;
  }
  try{
  const selectedIds: string[] = JSON.parse(storedIds);

  const profiles = selectedIds
    .map((id) => profileById.get(id))
    .filter((profile): profile is ProfileStruct => Boolean(profile));

  setTimeout(() => {
    setSelectedProfiles(profiles);
    }, 0);
  }catch{
    localStorage.removeItem(SELECTED_PROFILE_IDS_STORAGE_KEY);
  }
}, []);
function profileSelect(profileId: string) {
  setSelectedProfiles((currentProfiles) => {
    const isAlreadySelected = currentProfiles.some(
      (profile) => profile.id === profileId
    );

    let updatedProfiles: ProfileStruct[];

    if (isAlreadySelected) {
      updatedProfiles = currentProfiles.filter(
        (profile) => profile.id !== profileId
      );
    } else {
      if (currentProfiles.length >= 5) {
        return currentProfiles;
      }

      const profile = profileById.get(profileId);

      if (!profile) {
        return currentProfiles;
      }

      updatedProfiles = [...currentProfiles, profile];
    }

    localStorage.setItem(
      SELECTED_PROFILE_IDS_STORAGE_KEY,
      JSON.stringify(
        updatedProfiles.map((profile) => profile.id)
      )
    );

    return updatedProfiles;
  });
}
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background text-black">
      
      <BackgroundCurves />
      

      <main className="relative z-10 flex w-full flex-1 flex-col items-center px-4 pb-28 pt-15 sm:pt-18 ">
        <div className="flex w-full max-w-[402px]  flex-col px-1 items-center">
          <header className="mx-auto flex w-full  flex-col items-center px-3">
            <Logo />

              {!viewedProfile && (
                <div className="mt-7 flex w-full max-w-[330px] flex-col">
                  <h1 className="text-[24px] font-black leading-9">
                    Welcome!
                  </h1>

                  <p className="mt-3 text-[17px] leading-6">
                    Discover meaningful connections on campus.
                  </p>

                  <p className="mt-1 text-[17px] leading-6">
                    Select up to five people you admire. When the interest is
                    mutual, it&apos;s a match.
                  </p>
                </div>
              )}
          </header>
              {viewedProfile ? (
            <div className="mt-6 w-full">
              <ProfileDetails
                profile={viewedProfile}
                onBack={() => setViewedProfile(null)}
                onSelect={() => profileSelect(viewedProfile.id)}
                isSelected={selectedProfiles.some(
                  (profile) => profile.id === viewedProfile.id
                )}
                isDisabled={
                  !selectedProfiles.some(
                    (profile) => profile.id === viewedProfile.id
                  ) && selectedProfiles.length >= 5
                }
              />
            </div>
          ) : (
          <section className="relative mt-6 flex w-full min-h-[450px] flex-col rounded-lg border-2 border-stroke bg-white shadow-[4px_3px_3px_0.5px_rgba(0,0,0,0.4)] px-5 pb-5 pt-4">
            <h2 className="text-[20px] font-semibold leading-6">
              Selected profiles
            </h2>
            
            {selectedProfiles.length > 0 ? (
              <div className="mt-5 flex flex-col gap-4">
                {selectedProfiles.map((profile, index) => (
                  <button key={profile.id}
                  type="button"
                  onClick={()=>setViewedProfile(profile)}
                  className="block w-full text-left">
                    <SelectedProfileCard
                    profile={profile}
                    colorClass= {
                      profileCardColors[index%profileCardColors.length]
                    }/>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-1 items-center justify-center">
                  <EmptyMascot/>
                </div>
                {showSystemMessage && (
                  <Toast
                    message={`Build something meaningful.
                Make real connections.

                Search for the one your heart yearns for.`}
                    action={{
                      label: "Search",
                      onClick: () => {
                        setShowSystemMessage(false);
                        router.push("/search");
                      },
                    }}
                    onClose={() => setShowSystemMessage(false)}
                  />
                )}
              </>
            )}
            
          </section>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex justify-center">
      <Image src = "/assets/YDO.svg" alt="YDO" width={273} height={95}/>
    </div>
  );
}

function BackgroundCurves() {
  return (
    <div className="pointer-events-none absolute  z-0 overflow-hidden">
    <Image src="/assets/background.svg" alt="" width={402} height={874}/>
    </div>
  );
}
function EmptyMascot() {
  return (
    <div className="flex h-[190px] w-[230px] items-center justify-center bg-white p-4">
      <Image
        src="/assets/mascot.png"
        alt='Cupid mascot holding a magnifying glass with a caption saying "search for one"'
        width={210}  
        height={210}
        className="h-auto w-full"
      />
    </div>
  );
}

function SelectedProfileCard({
  profile,
  colorClass,
}: {
  profile: ProfileStruct;
  colorClass: string;
}) {
  return (
    <article
      className={`flex min-h-[68px] items-center rounded-md border px-4 py-3 ${colorClass}`}
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 shrink-0 rounded-sm border border-black bg-white" />

        <div className="flex flex-col">
          <h3 className="text-[12px] font-medium leading-4">
            Name : {profile.name}
          </h3>

          <p className="text-[12px] font-medium leading-4">
            Roll no. : {profile.rollNumber}
          </p>
        </div>
      </div>
    </article>
  );
}


