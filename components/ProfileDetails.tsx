"use client";

import Image from "next/image";
import type { ProfileStruct } from "@/data/dummyProfiles";

export function ProfileDetails({
  profile,
  onBack,
  onSelect,
  isSelected,
  isDisabled,
}: {
  profile: ProfileStruct;
  onBack: () => void;
  onSelect: () => void;
  isSelected: boolean;
  isDisabled: boolean;
}) {
  return (
    <section className="mx-auto w-full  max-w-[350px] min-h-[50px] rounded-[8px] border border-stroke bg-secondary  px-5 pb-5 pt-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-[20px] font-poppins font-[600]"
      >
        <span className="text-[24px] font-poppins font-medium leading-[26px]">←</span>
        Account Details
      </button>

      <div className="mt-7 flex flex-col text-[12px] font-poppins font-[400] gap-3">
        <ProfileField label="Name" >
          <span className="rounded-full border border-stroke bg-white px-4 py-1 font-poppins font-[400] leading-[20px] text-[12px]">
            {profile.name}
          </span>
        </ProfileField>

        <ProfileField label="Roll no.">
          <span className="rounded-full border border-stroke bg-white font-poppins font-[400]  leading-[20px] px-4 py-1 text-[16px]">
            {profile.rollNumber}
          </span>
        </ProfileField>

        <ProfileField label="Bio" >
          <p className="flex-1 rounded-[18px] max-w-[239px]  border border-stroke  bg-white px-3 py-2 text-[12px] font-poppins tracking-[0px] leading-[19px]">
            {profile.bio || "No bio has been added."}
          </p>
        </ProfileField>
      </div>

      {profile.currentlyPlaying && (
        <div className="mt-5 rounded-[7px] bg-[#1f5663] p-2 text-white">
          <div className="flex items-center gap-3">
            {profile.currentlyPlaying.image ? (
              <Image
                src={profile.currentlyPlaying.image}
                alt={`${profile.currentlyPlaying.songName} cover`}
                width={55}
                height={55}
                className="h-[55px] w-[55px] shrink-0 object-cover"
              />
            ) : (
              <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center bg-white/20 text-[22px]">
                ♪
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-[14px]">
                {profile.currentlyPlaying.songName}
              </p>

              <p className="truncate text-[9px] text-white/70">
                {profile.currentlyPlaying.artistName}
              </p>

              <div className="mt-2 text-center text-[12px]">
                ◀　▶　▶|
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5">
        <span className="rounded-full border border-stroke bg-primary px-3 py-[2px] font-poppins font-[500] text-[12px]">
          Hobbies corner
        </span>

        <div className="mt-2 flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-stroke bg-white px-4 py-[3px] font-poppins font-[500] tracking-[1px] text-[12px]"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onSelect}
        disabled={isDisabled}
        className="mt-7 w-full font-poppins font-[510] rounded-[7px] border border-stroke bg-primary py-3 text-[16px] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSelected
          ? "Selected"
          : isDisabled
            ? "Maximum 5 profiles selected"
            : "Select Profile"}
      </button>
    </section>
  );
}

function ProfileField({
  label,
  alignStart = false,
  children,
}: {
  label: string;
  alignStart?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex gap-5 ${
        alignStart ? "items-start" : "items-center"
      }`}
    >
      <span className="max-w-[65px] font-poppins font-[400] shrink-0 rounded-full border border-stroke bg-primary px-2 py-[2px] text-center text-[12px]">
        {label}
      </span>

      {children}
    </div>
  );
}