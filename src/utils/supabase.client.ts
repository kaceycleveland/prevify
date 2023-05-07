import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ywgfioawjhjvkyyaloxe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Z2Zpb2F3amhqdmt5eWFsb3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM0NzYwMzQsImV4cCI6MTk5OTA1MjAzNH0.UHIhDZkonBi1y5N-4fz4OZp_OGnMyw4tnbILcabxtOk"
);
