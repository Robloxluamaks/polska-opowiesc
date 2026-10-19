create type public.app_role as enum ('admin','user');
create table public.user_roles (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade not null, role app_role not null, unique(user_id, role));
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role) returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;
create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.handle_first_admin() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles(user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users for each row execute function public.handle_first_admin();

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null default 'BANG BLAZE 40K',
  flavor text not null,
  description text not null default '',
  image_url text,
  ice boolean not null default false,
  price_single numeric(10,2),
  price_bulk numeric(10,2),
  bulk_qty integer not null default 10,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "public reads active" on public.products for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "admin insert" on public.products for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admin update" on public.products for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete" on public.products for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.site_settings (key text primary key, value text not null default '');
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "public reads settings" on public.site_settings for select to anon, authenticated using (true);
create policy "admin writes settings" on public.site_settings for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

insert into public.site_settings(key,value) values
('hero_title','BANG BLAZE'),('hero_subtitle','Wyrazisty design. Charakterystyczny styl.'),
('hero_image','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png'),('contact_email','kontakt@[uzupełnij].pl'),('contact_phone','[uzupełnij]'),('contact_address','[uzupełnij]'),
('about_text','BANG BLAZE to marka zbudowana na odwadze i wyrazistym stylu. Nasza maskotka — małpa w złotej koronie i czarnych okularach — to symbol pewności siebie i miejskiego luzu.');

create policy "admin read images" on storage.objects for select to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(),'admin'));
create policy "admin upload images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.has_role(auth.uid(),'admin'));
create policy "admin update images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(),'admin'));
create policy "admin delete images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(),'admin'));

insert into public.products(slug,flavor,description,image_url,ice,price_single,price_bulk,sort_order) values
('watermelon-strawberry-watermelon','Watermelon & Strawberry Watermelon','Dwa smaki w jednym urządzeniu: Watermelon oraz Strawberry Watermelon.','/__l5e/assets-v1/9edb957e-58e9-493f-8275-9e1087b77d3b/watermelon.png',false,40,35,0),
('blueberry-ice-blueberry-raspberry','Blueberry Ice & Blueberry Raspberry','Dwa smaki w jednym urządzeniu: Blueberry Ice oraz Blueberry Raspberry.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',true,40,35,1),
('mango-ice-strawberry-mango','Mango Ice & Strawberry Mango','Dwa smaki w jednym urządzeniu: Mango Ice oraz Strawberry Mango.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',true,40,35,2),
('watermelon-watermelon-bubblegum','Watermelon & Watermelon Bubblegum','Dwa smaki w jednym urządzeniu: Watermelon oraz Watermelon Bubblegum.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',false,40,35,3),
('pineapple-ice-pineapple-coconut','Pineapple Ice & Pineapple Coconut','Dwa smaki w jednym urządzeniu: Pineapple Ice oraz Pineapple Coconut.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',true,40,35,4),
('mixed-fruit-triple-berry','Mixed Fruit & Triple Berry','Dwa smaki w jednym urządzeniu: Mixed Fruit oraz Triple Berry.','/__l5e/assets-v1/491f97a9-c5d2-4368-a289-304e01deac02/mixed-fruit.png',false,40,35,5),
('peach-ice-mango-peach','Peach Ice & Mango Peach','Dwa smaki w jednym urządzeniu: Peach Ice oraz Mango Peach.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',true,40,35,6),
('cherry-cherry-coke','Cherry & Cherry Coke','Dwa smaki w jednym urządzeniu: Cherry oraz Cherry Coke.','/__l5e/assets-v1/ba3cb9a7-6846-48ed-8c3e-501f2ff72a60/cherry.png',false,40,35,7),
('grape-blueberry-grape','Grape & Blueberry Grape','Dwa smaki w jednym urządzeniu: Grape oraz Blueberry Grape.','/__l5e/assets-v1/af9f2322-cfcd-4032-90ef-98cd352c571f/grape.png',false,40,35,8),
('mint-blueberry-mint','Mint & Blueberry Mint','Dwa smaki w jednym urządzeniu: Mint oraz Blueberry Mint.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',true,40,35,9),
('black-dragon-ice-red-bull','Black Dragon Ice & Red Bull','Dwa smaki w jednym urządzeniu: Black Dragon Ice oraz Red Bull.','/__l5e/assets-v1/2c7bc53d-a180-4ed0-b990-757ba26239ea/black-dragon.png',true,40,35,10),
('strawberry-ice-strawberry-kiwi','Strawberry Ice & Strawberry Kiwi','Dwa smaki w jednym urządzeniu: Strawberry Ice oraz Strawberry Kiwi.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',true,40,35,11),
('tropical-fruits-triple-watermelon','Tropical Fruits & Triple Watermelon','Dwa smaki w jednym urządzeniu: Tropical Fruits oraz Triple Watermelon.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',false,40,35,12),
('sour-mango-pineapple-lemon-lime','Sour Mango Pineapple & Lemon Lime','Dwa smaki w jednym urządzeniu: Sour Mango Pineapple oraz Lemon Lime.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',false,40,35,13),
('summer-time-apple-ice','Summer Time & Apple Ice','Dwa smaki w jednym urządzeniu: Summer Time oraz Apple Ice.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',true,40,35,14),
('rainbow-candy-arctic-freezing','Rainbow Candy & Arctic Freezing','Dwa smaki w jednym urządzeniu: Rainbow Candy oraz Arctic Freezing.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',true,40,35,15),
('raspberry-watermelon-jieshuang','Raspberry Watermelon & Jieshuang','Dwa smaki w jednym urządzeniu: Raspberry Watermelon oraz Jieshuang.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',false,40,35,16),
('lemon-romance-california-cherry','Lemon Romance & California Cherry','Dwa smaki w jednym urządzeniu: Lemon Romance oraz California Cherry.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',false,40,35,17),
('mango-peach-apricot-white-gummies','Mango Peach Apricot & White Gummies','Dwa smaki w jednym urządzeniu: Mango Peach Apricot oraz White Gummies.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',false,40,35,18),
('mary-s-dream-aloe-mango-melon-ice','Mary''s Dream & Aloe Mango Melon Ice','Dwa smaki w jednym urządzeniu: Mary''s Dream oraz Aloe Mango Melon Ice.','/__l5e/assets-v1/0cb0da01-14c2-4469-bc23-dd4f7e02d598/hero-duo.png',true,40,35,19);