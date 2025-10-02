"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export const createGuide = async (formData: CreateGuide) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("guides")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a guide");

  return data[0];
};

export const getAllGuides = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllGuides) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("guides").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: guides, error } = await query;

  if (error) throw new Error(error.message);

  return guides;
};

export const getGuide = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("guides").select().eq("id", id);

  if (error) return console.log(error);

  return data[0];
};
