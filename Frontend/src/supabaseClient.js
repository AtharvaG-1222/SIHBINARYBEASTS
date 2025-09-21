// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ivozrjchveblnxjnmvaq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2b3pyamNodmVibG54am5tdmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MDUzMTIsImV4cCI6MjA3Mjk4MTMxMn0.QbXHuLgGXBFvdpz6-CgIoiQWEO0pD7L_bKG84Uk8pUo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
