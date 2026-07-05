"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase.server";
import { INTEREST_TAGS, BIO_MAX_WORDS, MAX_HOBBIES } from "@/lib/constants";

export type UpdateProfileResult = { error: string | null };

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

export async function updateProfile(
  formData: FormData,
): Promise<UpdateProfileResult> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const bio = (formData.get("bio") as string | null)?.trim() ?? "";
  const hobbies = formData.getAll("hobbies").map(String);

  if (!name) return { error: "Name can't be empty." };
  if (countWords(bio) > BIO_MAX_WORDS) return { error: `Bio must be ${BIO_MAX_WORDS} words or fewer.` };
  if (hobbies.length > MAX_HOBBIES) return { error: `Max ${MAX_HOBBIES} hobbies.` };

  const invalid = hobbies.find((h) => !(INTEREST_TAGS as readonly string[]).includes(h));
  if (invalid) return { error: `Unknown tag: ${invalid}` };

  const { error } = await supabase
    .from("profiles")
    .update({ name, bio, hobbies, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/account");
  return { error: null };
}