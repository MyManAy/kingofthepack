import { createClient } from "@supabase/supabase-js";
import cardProps from "./jadeCardPropsFromImages.json" assert { type: "json" };
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const setName = "Jade";

const { data: set } = await supabase
  .from("set")
  .select("id")
  .eq("name", setName)
  .single();

const id = set.id;

const { data: card } = await supabase
  .from("card")
  .insert(cardProps.map((obj) => ({ ...obj, setId: id })))
  .select();
console.log(JSON.stringify(card, null, 4));
