-- Camping 2025 trip checklist — schema, access control, and seed data.
-- Run once in the Supabase SQL editor (or via the Supabase MCP connection).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  group_name text not null,
  category text not null,
  name text not null,
  sort_order int not null default 0
);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.items(id) on delete cascade,
  person_name text not null,
  avatar text,
  note text,
  created_at timestamptz not null default now()
);

-- Holds only the bcrypt hash of the trip passcode. RLS is enabled with no
-- policies below, so this table is unreadable via the API even with the
-- anon key — only the security-definer function below can read it.
create table if not exists public.app_secrets (
  key text primary key,
  value text not null
);

alter table public.items enable row level security;
alter table public.assignments enable row level security;
alter table public.app_secrets enable row level security;

-- ---------------------------------------------------------------------------
-- Passcode check — lives in a `private` schema, not `public`, so PostgREST
-- (Supabase's auto REST API) never exposes it as a callable /rpc/ endpoint.
-- If these lived in `public`, anyone could brute-force passcode guesses via
-- POST /rest/v1/rpc/is_valid_passcode directly, bypassing the RLS gate.
-- ---------------------------------------------------------------------------

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to anon, authenticated;

create or replace function private.request_passcode()
returns text
language sql
security definer
set search_path = private
stable
as $$
  select coalesce(current_setting('request.headers', true)::json ->> 'x-trip-passcode', '');
$$;

create or replace function private.is_valid_passcode(input text)
returns boolean
language sql
security definer
set search_path = private, public, extensions
stable
as $$
  select exists (
    select 1 from public.app_secrets
    where key = 'trip_passcode'
      and value = crypt(coalesce(input, ''), value)
  );
$$;

revoke all on function private.request_passcode() from public;
grant execute on function private.request_passcode() to anon, authenticated;

revoke all on function private.is_valid_passcode(text) from public;
grant execute on function private.is_valid_passcode(text) to anon, authenticated;

-- Set (or update) the trip passcode. Re-run with a new value to rotate it.
insert into public.app_secrets (key, value)
values ('trip_passcode', crypt('CHANGE_ME', gen_salt('bf')))
on conflict (key) do update set value = excluded.value;

-- ---------------------------------------------------------------------------
-- RLS policies — every read/write requires the `x-trip-passcode` header to
-- match the stored passcode.
-- ---------------------------------------------------------------------------

drop policy if exists items_select on public.items;
create policy items_select on public.items
  for select using (private.is_valid_passcode(private.request_passcode()));

drop policy if exists items_insert on public.items;
create policy items_insert on public.items
  for insert with check (private.is_valid_passcode(private.request_passcode()));

drop policy if exists items_update on public.items;
create policy items_update on public.items
  for update using (private.is_valid_passcode(private.request_passcode()))
  with check (private.is_valid_passcode(private.request_passcode()));

drop policy if exists items_delete on public.items;
create policy items_delete on public.items
  for delete using (private.is_valid_passcode(private.request_passcode()));

drop policy if exists assignments_select on public.assignments;
create policy assignments_select on public.assignments
  for select using (private.is_valid_passcode(private.request_passcode()));

drop policy if exists assignments_insert on public.assignments;
create policy assignments_insert on public.assignments
  for insert with check (private.is_valid_passcode(private.request_passcode()));

drop policy if exists assignments_update on public.assignments;
create policy assignments_update on public.assignments
  for update using (private.is_valid_passcode(private.request_passcode()))
  with check (private.is_valid_passcode(private.request_passcode()));

drop policy if exists assignments_delete on public.assignments;
create policy assignments_delete on public.assignments
  for delete using (private.is_valid_passcode(private.request_passcode()));

-- ---------------------------------------------------------------------------
-- Seed data — item names/categories only, parsed from "Camping List 2025.xlsx"
-- (Camping 2025 sheet). No assignees are seeded; the group starts fresh.
-- Safe to re-run: skipped if items already exist.
-- ---------------------------------------------------------------------------

insert into public.items (group_name, category, name, sort_order)
select * from (values
  ('Camping Basics', 'Camping Basics', 'Tents', 0),
  ('Camping Basics', 'Camping Basics', 'Air Mattress/Air Pump', 1),
  ('Camping Basics', 'Camping Basics', 'Sleeping Cot (if applicable)', 2),
  ('Camping Basics', 'Camping Basics', 'Sleeping Bag/Blankets', 3),
  ('Camping Basics', 'Camping Basics', 'Pillows', 4),
  ('Camping Basics', 'Camping Basics', 'Mallet or hammer (for tent stakes)', 5),
  ('Personal', 'Personal', 'Showers', 6),
  ('Personal', 'Personal', 'Towels', 7),
  ('Personal', 'Personal', 'Toothbrush/Toothpaste', 8),
  ('Personal', 'Personal', 'Personal Toiletries', 9),
  ('Personal', 'Personal', 'Comb/Brush', 10),
  ('Personal', 'Personal', 'Toilet Paper', 11),
  ('Personal', 'Personal', 'Sunscreen', 12),
  ('Personal', 'Personal', 'Bug Repellent', 13),
  ('Personal', 'Personal', 'Medications/Vitamins/Painkillers', 14),
  ('Personal', 'Personal', 'Hand Wipes / wet wipes', 15),
  ('Personal', 'Personal', 'Warm jackets/cold weather clothing', 16),
  ('Personal', 'Personal', 'Hats', 17),
  ('Personal', 'Personal', 'Socks', 18),
  ('Personal', 'Personal', 'Rain jacket / poncho', 19),
  ('Personal', 'Personal', 'Swimsuit (if swimming nearby)', 20),
  ('Personal', 'Personal', 'First Aid', 21),
  ('Personal', 'Personal', 'Walking shoes for hiking', 22),
  ('Food', 'Proteins / Mains', 'Eggs', 23),
  ('Food', 'Proteins / Mains', 'Breakfast patties (meat and vegan)', 24),
  ('Food', 'Proteins / Mains', 'Bacon – turkey and pork', 25),
  ('Food', 'Proteins / Mains', 'Pork Belly', 26),
  ('Food', 'Proteins / Mains', 'Chicken (Halal Friendly)', 27),
  ('Food', 'Proteins / Mains', 'Cooked Beyond Meat ground for tacos', 28),
  ('Food', 'Proteins / Mains', 'Cooked chicken ground meat for tacos', 29),
  ('Food', 'Proteins / Mains', 'Beans (no non-veg stuff)', 30),
  ('Food', 'Proteins / Mains', 'Cooked Tilapia Fish w/ Rice (and chilli oil)', 31),
  ('Food', 'Proteins / Mains', 'Hot Dogs (No Beef)', 32),
  ('Food', 'Proteins / Mains', 'Hot Dogs (Vegan)', 33),
  ('Food', 'Vegetables / Produce', 'Mini Potatoes', 34),
  ('Food', 'Vegetables / Produce', 'Onions', 35),
  ('Food', 'Vegetables / Produce', 'Guac', 36),
  ('Food', 'Vegetables / Produce', 'Cilantro', 37),
  ('Food', 'Vegetables / Produce', 'Green Onions', 38),
  ('Food', 'Vegetables / Produce', 'Lime', 39),
  ('Food', 'Vegetables / Produce', 'Lettuce for Tacos / K-BBQ', 40),
  ('Food', 'Vegetables / Produce', 'Corn', 41),
  ('Food', 'Vegetables / Produce', 'Watermelon', 42),
  ('Food', 'Vegetables / Produce', 'Strawberry', 43),
  ('Food', 'Vegetables / Produce', 'Other Berries', 44),
  ('Food', 'Dairy / Cold Items', 'Butter', 45),
  ('Food', 'Dairy / Cold Items', 'Milk', 46),
  ('Food', 'Dairy / Cold Items', 'Cheese for Tacos', 47),
  ('Food', 'Breakfast / Brunch', 'Pancake Mix', 48),
  ('Food', 'Breakfast / Brunch', 'Maple Syrup', 49),
  ('Food', 'Taco Night / Dinner Add-ons', 'Taco Shells (Hard and Soft)', 50),
  ('Food', 'Taco Night / Dinner Add-ons', 'Salsa, hot sauces', 51),
  ('Food', 'Taco Night / Dinner Add-ons', 'Hot dog buns', 52),
  ('Food', 'Snacks', 'Snacks (Chips, Biscuits, etc)', 53),
  ('Food', 'Snacks', 'Choco Pie and Custard Cakes', 54),
  ('Food', 'Snacks', 'Smores?', 55),
  ('Food', 'Snacks', 'Brownies?', 56),
  ('Food', 'Condiments / Pantry', 'Cooking Oil', 57),
  ('Food', 'Condiments / Pantry', 'Salt / Pepper / Sugar / Spices', 58),
  ('Food', 'Condiments / Pantry', 'Condiments (Ketchup, Hot Sauces)', 59),
  ('Food', 'Condiments / Pantry', 'Kimchi and Seafood Pancake', 60),
  ('Food', 'Beverages', 'Coffee / Tea (Chiya)', 61),
  ('Food', 'Beverages', 'San Pellegrino', 62),
  ('Food', 'Beverages', 'Mango Juice', 63),
  ('Food', 'Beverages', 'Beer', 64),
  ('Food', 'Beverages', 'Water', 65),
  ('Food', 'Beverages', 'Osric Dai Wine (Sangria)', 66),
  ('Food', 'Cooler Items', 'Cooler /  Ice', 67),
  ('Cooking Gear', 'Cooking Gear', 'Lighter', 68),
  ('Cooking Gear', 'Cooking Gear', 'Propane/Butane Stove', 69),
  ('Cooking Gear', 'Cooking Gear', 'Plates, bowls, paper cups', 70),
  ('Cooking Gear', 'Cooking Gear', 'Cutting board', 71),
  ('Cooking Gear', 'Cooking Gear', 'Forks, Spoons, Knives', 72),
  ('Cooking Gear', 'Cooking Gear', 'Kitchen Knives', 73),
  ('Cooking Gear', 'Cooking Gear', 'Kettle', 74),
  ('Cooking Gear', 'Cooking Gear', 'Pots and Pans', 75),
  ('Cooking Gear', 'Cooking Gear', 'Spatula/Tongs/Cooking Utensils', 76),
  ('Cooking Gear', 'Cooking Gear', 'Bottle opener', 77),
  ('Cooking Gear', 'Cooking Gear', 'Aluminum Foil', 78),
  ('Cooking Gear', 'Cooking Gear', 'Ziploc bags', 79),
  ('Cooking Gear', 'Cooking Gear', 'Paper towels/napkins (Need three rolls)', 80),
  ('Cooking Gear', 'Cooking Gear', 'Dish soap/ sponge', 81),
  ('Cooking Gear', 'Cooking Gear', 'Recycle bags/garbage bags', 82),
  ('Cooking Gear', 'Cooking Gear', 'Marshmallow roasting sticks', 83),
  ('Cooking Gear', 'Cooking Gear', 'Firewood', 84),
  ('Cooking Gear', 'Cooking Gear', 'Hatchet', 85),
  ('Cooking Gear', 'Cooking Gear', 'Red solo cups', 86),
  ('Cooking Gear', 'Cooking Gear', 'Water Jug for washing dishes', 87),
  ('Cooking Gear', 'Cooking Gear', 'Hot drink cups', 88),
  ('Misc.', 'Misc.', 'Flashlights/Lamps', 89),
  ('Misc.', 'Misc.', 'Camping Chairs', 90),
  ('Misc.', 'Misc.', 'Bluetooth speaker', 91),
  ('Misc.', 'Misc.', 'Hand sanitizer', 92),
  ('Misc.', 'Misc.', 'Can opener', 93),
  ('Misc.', 'Misc.', 'Picnic blankets', 94),
  ('Misc.', 'Misc.', 'Portable Power Bank', 95),
  ('Misc.', 'Misc.', 'Headlamps', 96),
  ('Misc.', 'Misc.', 'Table cloth (cheap)', 97),
  ('Misc.', 'Recreation / Fun', 'Playing cards / Games', 98),
  ('Misc.', 'Recreation / Fun', 'Bikes / outdoor games', 99),
  ('Misc.', 'Recreation / Fun', 'Recreational Drugs', 100),
  ('Misc.', 'Recreation / Fun', 'Drinks - We need tequilahh', 101)
) as seed(group_name, category, name, sort_order)
where not exists (select 1 from public.items);
