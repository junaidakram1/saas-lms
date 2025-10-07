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

export const addToSessionHistory = async (guideId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    guide_id: guideId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`guides:guide_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ guides }) => guides);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`guides:guide_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ guides }) => guides);
};

export const getUserGuides = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("guides")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const newGuidePermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro_guide" })) {
    return true;
  } else if (has({ feature: "2_published_guides" })) {
    limit = 5;
  } else if (has({ feature: "15_published_guides" })) {
    limit = 15;
  }

  const { data, error } = await supabase
    .from("guides")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const guideCount = data?.length;

  if (guideCount >= limit) {
    return false;
  } else {
    return true;
  }
};

export const canStartNewSession = async () => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select("id", { count: "exact" })
    .eq("user_id", userId)
    .gte(
      "created_at",
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    );

  if (error) throw new Error(error.message);

  const sessionCount = data?.length ?? 0;
  const limit = 15;

  return sessionCount < limit;
};
