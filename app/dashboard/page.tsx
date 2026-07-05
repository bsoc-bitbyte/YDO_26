"use client"

import { useState,useEffect } from "react";
import Link from "next/link";
import Image  from "next/image";
import BottomNav from "@/components/BottomNav"
import { profileById ,SELECTED_PROFILE_IDS_STORAGE_KEY,type ProfileStruct } from "@/data/dummyProfiles";
const profileCardColors = [
  "border-stroke bg-secondary",
  "border-stroke bg-foreground",
  "border-stroke bg-primary",
  "border-stroke bg-white",
];

export default function DashboardPage() {
  const [showSystemMessage,setShowSystemMessage] = useState(true);

  const [selectedProfiles,setSelectedProfiles] = useState<ProfileStruct[]>([]);
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
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background text-black">
      
      <BackgroundCurves />
      

      <main className="relative z-10 flex w-full flex-1 flex-col items-center px-4 pb-28 pt-15 sm:pt-18 ">
        <div className="flex w-full max-w-[402px]  flex-col px-1 items-center">
          <header className="mx-auto flex w-full  flex-col items-center px-3">
            <Logo />

            <div className="mt-7  flex w-full max-w-[330px] flex-col">
              <h1 className="text-[24px] font-black leading-9">Welcome!</h1>

              <p className="mt-3 text-[17px] leading-6">
                Discover meaningful connections on campus.
              </p>

              <p className="mt-1 text-[17px] leading-6">
                Select up to five people you admire. When the interest is
                mutual, it&apos;s a match.
              </p>
            </div>
          </header>

          <section className="relative mt-6 flex w-full min-h-[450px] flex-col rounded-lg border-2 border-stroke bg-white shadow-[4px_3px_3px_0.5px_rgba(0,0,0,0.4)] px-5 pb-5 pt-4">
            <h2 className="text-[20px] font-semibold leading-6">
              Selected profiles
            </h2>
            
            {selectedProfiles.length > 0 ? (
              <div className="mt-5 flex flex-col gap-4">
                {selectedProfiles.map((profile, index) => (
                  <SelectedProfileCard
                    key={profile.id}
                    profile={profile}
                    colorClass={profileCardColors[index % profileCardColors.length]}
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-1 items-center justify-center">
                  <EmptyMascot/>
                </div>
                {showSystemMessage && (
                  <div className="absolute left-1/2 top-[-70px] z-50 w-full max-w-[320px] -translate-x-1/2">
                    <EmptySelectedProfileState onClose={()=> setShowSystemMessage(false)}/>
                  </div>
                )}
              
              </>
            )}
            
          </section>
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
    <div className="flex h-[190px] w-[230px] items-center justify-center bg-[#d9d9d9] p-4">
      <Image
        src="/assets/search-for-one.svg"
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
function SystemBoxHeader({onClose}: {onClose:()=>void}){
 
  return(

    <div className="relative w-full">
    <Image src="/assets/Frame 62.svg" alt="" width={390} height={65} className="pointer-events-none h-auto w-full"/>
    <button type="button" aria-label = "close system message"  onClick={()=>{ onClose();}} className="absolute  right-4 top-3 z-[9999] h-7 w-7 rounded-full"/>
  </div>
  );
}
function SysMsgline(){
  return(
    <Image src="/assets/Line 14.svg" alt="" aria-hidden="true" width={265} height={0}/>
  );
}
function SearchButton(){
  return(
    <Image src="/assets/search button.svg" alt="" width={164} height={43} />
  )
}
function EmptySelectedProfileState({onClose}:{onClose:()=>void}){
  return(
    <div className="flex flex-col m-2 bg-white shadow-[4px_4px_3px_rgba(0,0,0,0.4)] rounded-xl border-2 w-full border-[#101010] max-w-[320px] pb-9 overflow-hidden">
      <SystemBoxHeader onClose={onClose}/>
      <div className="flex min-h-[100px] gap-4  mt-2 w-full max-w-[300px] flex-col items-center justify-center text-center font-prime text-[16px] font-normal leading-[25px] tracking-[1px] text-[#000000] pl-3">
        <p >
          Build something meaningful.
          <br />
          Make real connections.
        </p>
        <p>
          Search for the one your heart yearns for.
        </p>
        <SysMsgline/>
        <div className="flex mt-3 w-full justify-center">
          <Link href="/search" aria-label="Search" title="Search">
            <SearchButton/>
          </Link>
        </div>
      </div>
      
    </div>
  );
}

