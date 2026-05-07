// This file is now a placeholder as the project has been moved to a hardcoded data model.
// All Supabase connections have been removed.

export const createBrowserClient = () => ({});
export const createServerClient = () => ({});
export const createServerSideClient = async () => ({
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: {}, error: null }),
  },
  from: () => ({
    select: () => ({
      order: () => ({
        data: [],
        error: null,
      }),
      single: () => ({
        data: null,
        error: null,
      }),
      data: [],
      error: null,
    }),
    insert: () => ({ error: null }),
    upsert: () => ({ error: null }),
    update: () => ({
      eq: () => ({ error: null }),
    }),
    delete: () => ({
      eq: () => ({ error: null }),
    }),
  }),
});
