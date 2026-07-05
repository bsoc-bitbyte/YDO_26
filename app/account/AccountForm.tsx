"use client";

import { useState, useTransition, type FormEvent } from "react";
import { updateProfile } from "./actions";
import { INTEREST_TAGS, BIO_MAX_WORDS, MAX_HOBBIES } from "@/lib/constants";

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function FloatingField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-xl border border-black bg-white px-4"
    style={{height: ""}}>
      <legend className="px-1 text-xs text-black-500">{label}</legend>
      {children}
    </fieldset>
  );
}

export default function AccountForm({
  email,
  initialName,
  initialBio,
  initialHobbies,
}: {
  email: string;
  initialName: string;
  initialBio: string;
  initialHobbies: string[];
}) {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [hobbies, setHobbies] = useState<string[]>(initialHobbies);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const wordCount = countWords(bio);
  const availableTags = INTEREST_TAGS.filter((t) => !hobbies.includes(t));

  function removeHobby(tag: string) {
    setHobbies((p) => p.filter((h) => h !== tag));
    setSaved(false);
  }

  function addHobby(tag: string) {
    if (hobbies.length >= MAX_HOBBIES) {
      return;
    }
    setError(null);
    setHobbies((p) => [...p, tag]);
    setShowPicker(false);
    setSaved(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const fd = new FormData();
    fd.set("name", name);
    fd.set("bio", bio);
    hobbies.forEach((h) => fd.append("hobbies", h));

    startTransition(async () => {
      const res = await updateProfile(fd);
      if (res.error) setError(res.error);
      else setSaved(true);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]"
    style = {{marginTop: "40px"}}>
      
      <fieldset className="rounded-xl border border-black bg-white px-4" 
      style={{ height: "60px", paddingLeft: "25px", paddingTop: "5px", paddingRight: "25px"}}>
      <legend className="px-5 text-xs bg-white rounded-xl leading-5" style={{padding: "0px 15px"}}>Name</legend>        
      <input
          value={name}
          onChange={(e) => { setName(e.target.value); setSaved(false); }}
          maxLength={60}
          className="w-full bg-transparent py-2 text-base text-black focus:outline-none"
        />
      </fieldset>

      <fieldset className="rounded-xl border border-black bg-white px-4" 
      style={{ height: "60px", paddingLeft: "25px", paddingTop: "5px", paddingRight: "25px"}}>
        <legend className="px-5 text-xs bg-white rounded-xl leading-5" style={{padding: "0px 15px"}}>Email</legend>
        <input
          value={email}
          readOnly
          disabled
          className="w-full bg-transparent py-2 text-base text-black focus:outline-none"
        />
      </fieldset>

      <fieldset className="rounded-xl border border-black bg-white px-4 pb-3"
      style={{ height: "120px", padding: "5px 25px"}}>
        <legend className="px-5 text-xs bg-white rounded-xl leading-5" style={{padding: "0px 15px"}}>Bio</legend>
        <textarea
          value={bio}
          onChange={(e) => { setBio(e.target.value); setSaved(false); }}
          rows={4}
          className="w-full resize-none bg-transparent py-2 text-base text-black focus:outline-none"
          style={{height: "80px"}}
        />
        <p className="text-right text-[8px] text-gray-500 tracking-[1px]"
          style={{ marginRight: "-20px", marginTop: "-3px" }}>
          {wordCount > BIO_MAX_WORDS
            ? <span className="text-red-500">{wordCount}/{BIO_MAX_WORDS} words</span>
            : `Upto ${BIO_MAX_WORDS} words`}
        </p>
      </fieldset>


      {/* Music widget — Spotify integration is out of scope, render placeholder */}
      <div
        className="flex items-center border border-black justify-center rounded-xl px-5 py-8"
        style={{ backgroundColor: "var(--color-foreground)", height: "80px", marginTop: "10px"}}
      >
        <p className="text-xs font-semibold text-white">
          What are you listening to? 🎧
        </p>
      </div>

      <fieldset className="rounded-xl border border-black bg-white px-4 pb-4 pt-0"
      style={{padding: "5px 25px"}}>
        <legend className="px-5 text-xs bg-white rounded-xl leading-5" style={{padding: "0px 15px"}}>Hobbies corner</legend>

        <div className="flex flex-wrap gap-2 pt-1"
        style={{marginBottom: "5px"}}>
          {hobbies.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => removeHobby(tag)}
              style={{ borderRadius: "15px", height: "20px", padding: "0px 12px", border: "1px solid black", backgroundColor: "white", fontSize: "10px" }}
              className="text-black whitespace-nowrap"
            >
              {tag} ×
            </button>
          ))}

          <button
            type="button"
            onClick={() => setShowPicker((p) => !p)}
            style={{ borderRadius: "15px", height: "20px", padding: "0 12px", border: "1px solid black", backgroundColor: "white", fontSize: "10px" }}
            className="text-black whitespace-nowrap"
          >
            + Add
          </button>
        </div>

        {showPicker && availableTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2" style={{padding: "px 0px"}}>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => addHobby(tag)}
                className="rounded-full border border-dashed border-gray-400 bg-white px-4 py-1.5 text-xs text-black-500"
                style={{ borderRadius: "15px", height: "20px", padding: "0 12px", border: "1px dashed", backgroundColor: "white", fontSize: "10px" }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
                {hobbies.length >= MAX_HOBBIES && (
          <p className="text-[10px] text-red-500 tracking-[1px]">Max {MAX_HOBBIES} hobbies.</p>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="border border-black rounded-2xl py-3 text-xs text-white disabled:opacity-60"
        style={{ backgroundColor: "#F9B63C" /* YDO logo color used, as no token exists for this yet */, height: "50px" ,width: "150px", alignSelf: "center"}}
      >
        {isPending ? "Saving…" : "Save changes"}
      </button>

      {error && <p className="text-[10px] tracking-[1px] text-red-500"
      style={{alignSelf: "center"}}>{error}</p>}
      {saved && !error && <p className="text-[10px] tracking-[1px]" style={{color: "#779C32"}}>Saved.</p>}
    </form>
  );
}