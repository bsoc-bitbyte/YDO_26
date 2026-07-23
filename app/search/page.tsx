"use client"
import BottomNav from "@/components/BottomNav";
import Image from "next/image";
import { useState,useEffect } from "react";
import { dummyProfiles,SELECTED_PROFILE_IDS_STORAGE_KEY ,type ProfileStruct} from "@/data/dummyProfiles";
import { ProfileDetails } from "@/components/ProfileDetails";



const PROFILES_PER_PAGE = 5;

const commonInterests = [
  "Photography",
  "Music",
  "Dance",
  "Drawing",
  "Badminton",
  "Design",
];
const profileCardColors = [
  "border-stroke bg-secondary",
  "border-stroke bg-foreground",
  "border-stroke bg-primary",
  "border-stroke bg-white",
];
const searchableProfiles = dummyProfiles.map((profile) => ({
  ...profile,
  searchKey: `${profile.name} ${profile.rollNumber}`.toLowerCase(),
}));


function SearchPage(){
  
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());
  const [searchText, setSearchText] = useState("");
  const [selectedProfileIds, setSelectedProfileIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [viewedProfile, setViewedProfile] =useState<ProfileStruct | null>(null);

  useEffect(()=>{
    const storedIds = localStorage.getItem(SELECTED_PROFILE_IDS_STORAGE_KEY);
    if(!storedIds){
      return ;
    }
    try{
    const parsedIds = JSON.parse(storedIds);

    setTimeout(() => {
      setSelectedProfileIds(new Set(parsedIds));
    }, 0);
    }catch{
      localStorage.removeItem(SELECTED_PROFILE_IDS_STORAGE_KEY);
    }
  },[]);
  function buttonClickController(interest : string){
    setSelectedInterests((currentButtons) => {
      const updatedButtons = new Set(currentButtons);

      if (updatedButtons.has(interest)) {
        updatedButtons.delete(interest);
      } else {
        updatedButtons.add(interest);
      }

      return updatedButtons;
    });
    setCurrentPage(1);
  }
  function profileSelect(profileId : string ){
    setSelectedProfileIds((currentIds) => {
      const updatedIds = new Set(currentIds);
      if(updatedIds.has(profileId)){
        updatedIds.delete(profileId);
        localStorage.setItem(SELECTED_PROFILE_IDS_STORAGE_KEY,
          JSON.stringify([...updatedIds])
        );
        return updatedIds;
      }
      if(updatedIds.size>=5){
        return updatedIds;
      }
      updatedIds.add(profileId);
      localStorage.setItem(SELECTED_PROFILE_IDS_STORAGE_KEY,
        JSON.stringify([...updatedIds])
      );

      return updatedIds;
    });
    
  }

  const searchValue = searchText.trim().toLowerCase();
  const filteredProfiles = searchableProfiles.filter((profile)=>{
    const matchesSearch = searchValue=== "" || profile.searchKey.includes(searchValue);
    const matchesInterest = selectedInterests.size=== 0 || profile.interests.some((interest)=>{
      return selectedInterests.has(interest);
    });
    return matchesSearch && matchesInterest;
  });
  const shouldShowMascot = searchValue === "" && selectedInterests.size === 0;
  const totalPages = Math.ceil(filteredProfiles.length/PROFILES_PER_PAGE);
  const startIndex = (currentPage-1)*(PROFILES_PER_PAGE);
  const profilesOnCurrentPage = filteredProfiles.slice(startIndex,startIndex+PROFILES_PER_PAGE);

    return (
      
        <div className="relative flex flex-col min-h-screen w-full items-center bg-background  text-black ">
            <BackgroundCurves/>
            <main className="flex relative w-full  max-w-[402px] flex-col items-center px-6 pb-28 ">
              
              <div className="relative flex mt-10  gap-4 w-full">
                <Logo/>
              </div>
              <div className="relative z-10 mt-6 gap-4 flex h-[55px] w-full items-center rounded-full border border-stroke bg-white px-5">
                <SearchIcon/>

                <input
                  type="text"
                  id="profile-search"
                  aria-label="Search profiles by name or roll number"
                  value={searchText}
                  onChange={(event)=>{
                    setSearchText(event.target.value);
                    setCurrentPage(1);
                    setViewedProfile(null);
                  }}
                  placeholder="Enter name or roll no."
                  className="w-full bg-transparent text-[14px] outline-none placeholder:text-black/50 focus:outline-none"
                />
              </div>
              <div
                  className={`relative mt-5 flex w-full flex-col  ${
                    viewedProfile ? "px-0" : "px-4"
                  }`}
                >
                {viewedProfile ? (
                    <ProfileDetails
                      profile={viewedProfile}
                      onBack={() => setViewedProfile(null)}
                      onSelect={() => profileSelect(viewedProfile.id)}
                      isSelected={selectedProfileIds.has(viewedProfile.id)}
                      isDisabled={
                        !selectedProfileIds.has(viewedProfile.id) &&
                        selectedProfileIds.size >= 5
                      }
                    />
                  ) : (
                    <>
                <p className="text-[16px]  text-black tracking-[0.5px] leading-[16px] font-poppins ">
                  Search by common interests
                </p>
                 <div className="mt-3 flex flex-wrap gap-x-3.5 gap-y-2">
                  {commonInterests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      
                      onClick={()=>{buttonClickController(interest);}}
                      className={`min-w-[92px] rounded-full border border-stroke/70 border-[1.2px]  px-3 py-1 text-[12px] text-black/80 tracking-[0.6px] font-poppins
                          ${selectedInterests.has(interest)? "bg-primary hover:bg-primary/70 border-stroke shadow-[1.5px_1.5px_1px] " : "bg-white hover:bg-[#fff7e8]"}
                        `}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <div className="relative mt-5 flex min-h-[470px] w-full max-w-[330px] flex-col   rounded-xl border border-stroke/50 bg-white/50 px-3 py-4">
                  {!shouldShowMascot && (
                    <div className="mb-3 flex w-full items-center justify-between">
                      <h2 className="font-poppins text-[16px] font-semibold leading-5">
                        Results
                      </h2>

                      <p className="font-poppins text-[11px] text-black/60">
                        {selectedProfileIds.size}/5 selected
                      </p>
                    </div>
                  )}
                  {shouldShowMascot ? (
                    <div className="flex flex-1 items-center justify-center">
                    <EmptyMascot />
                    </div>
                  ) : filteredProfiles.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center text-center text-[14px] text-black/60">
                      No matching profiles found.
                    </div>
                  ) : (
                    <>

                      <div className="flex w-full flex-col gap-3">
                        {profilesOnCurrentPage.map((profile,index) =>(
                          <ProfileResultCard
                            key={profile.id}
                            profile={profile}
                            colorClass={profileCardColors[(startIndex +index)%profileCardColors.length]}
                            isSelected={selectedProfileIds.has(profile.id)}
                            isDisabled={
                              !selectedProfileIds.has(profile.id)&&selectedProfileIds.size>=5
                            }
                            onSelect={() => profileSelect(profile.id)}
                            onView={() => setViewedProfile(profile)}
                          />
                        ))}
                      </div>

                      {totalPages > 1 && (
                        <div className="mt-4 flex w-full items-center justify-between">
                          <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((page) => page - 1)}
                            className="rounded-full border border-stroke bg-white px-4 py-1 text-[12px] disabled:opacity-40"
                          >
                            Prev
                          </button>

                          <span className="text-[12px] text-black/60">
                            Page {currentPage} of {totalPages}
                          </span>

                          <button
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((page) => page + 1)}
                            className="rounded-full border border-stroke bg-white px-4 py-1 text-[12px] disabled:opacity-40"
                          >
                            Next
                          </button>
                        </div>
                      )}
                      
                      </>
                  )}
                </div>

                    </>
                  )}
              </div>
            </main>
            <BottomNav/>
        </div>
        
    );
}
function ProfileResultCard({profile,colorClass,isSelected,isDisabled,onSelect,onView,
}: {profile: ProfileStruct;colorClass: string;  isSelected: boolean;isDisabled: boolean;onSelect: () => void;onView: ()=>void;}) {
  return (
    <article
      className={`rounded-lg border px-4 py-3 shadow-[2px_2px_0_rgba(0,0,0,0.22)] ${colorClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={onView} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <div className="relative h-[41px] w-[41px] shrink-0 overflow-hidden rounded-sm border border-stroke bg-white">
            {profile.profileImage && (
              <Image
              src={profile.profileImage}
              alt={`${profile.name}'s profile`}
              fill
              sizes="41px"
              className="object-cover"/>
            )}
          </div>
        <div>
          <h3 className="text-[13px] font-poppins leading-4">
            {profile.name}
          </h3>

          <p className="mt-1 text-[12px] text-black/70">
            Roll no. : {profile.rollNumber}
          </p>
        </div>
        </button>
        <button
          type="button"
          disabled={isDisabled}
          onClick={onSelect}
          className={`rounded-full border border-stroke px-3 py-1 text-[11px] disabled:cursor-not-allowed disabled:opacity-40 ${
            isSelected ? "bg-[#d3bcf9]" : "bg-white"
          }`}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
    </article>
  );
}
function EmptyMascot() {
  return (
    <div className="flex h-[190px] w-[230px] items-center justify-center  p-4">
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
function SearchIcon(){
  return(
    <div>
      <Image src="/assets/search.svg" alt="" aria-hidden="true" height={18} width={21} />
    </div>
  )
}
function Logo() {
  return (
    <div className="flex ">
      <Image src = "/assets/YDO.svg" alt="YDO" width={98} height={34}/>
    </div>
  );
}
function BackgroundCurves() {
  return (
    <div className="pointer-events-none absolute   z-0 overflow-hidden">
    <Image src="/assets/background.svg" alt="" width={402} height={874}/>
    </div>
  );
}
export default SearchPage;