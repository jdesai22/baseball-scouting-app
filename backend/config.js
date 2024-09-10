import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const { PORT, HOST, HOST_URL, API_KEY, SUPABASE_URL, GOOGLE_MAPS_API_KEY } =
  process.env;

assert(PORT, "Port is required");
assert(HOST, "Host is required");

export default {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  supabaseConfig: {
    apiKey: API_KEY,
    url: SUPABASE_URL,
  },
  googlaMapsApiKey: GOOGLE_MAPS_API_KEY,
};
