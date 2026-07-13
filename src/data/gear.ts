// Structured camping gear list. Edit these objects to update the /gear page.
// All entries below are PLACEHOLDERS — replace with your real gear list.

export type GearItem = {
  name: string;
  weight?: string;
  notes?: string;
};

export type GearCategory = {
  title: string;
  items: GearItem[];
};

export const intro =
  // TODO: replace with your own intro.
  "The gear I bring camping. Not exhaustive, but it's what ends up in the pack most trips.";

export const gearCategories: GearCategory[] = [
  {
    title: 'Shelter & Sleep',
    items: [
      { name: 'Placeholder tent', weight: '2.5 lb', notes: 'TODO: brand/model' },
      { name: 'Placeholder sleeping bag', weight: '1.8 lb', notes: 'TODO: temp rating' },
      { name: 'Placeholder sleeping pad', notes: 'TODO' },
    ],
  },
  {
    title: 'Cooking & Water',
    items: [
      { name: 'Placeholder stove', notes: 'TODO' },
      { name: 'Placeholder water filter', notes: 'TODO' },
      { name: 'Placeholder cookware', notes: 'TODO' },
    ],
  },
  {
    title: 'Clothing',
    items: [
      { name: 'Placeholder rain shell', notes: 'TODO' },
      { name: 'Placeholder insulating layer', notes: 'TODO' },
    ],
  },
  {
    title: 'Miscellaneous',
    items: [
      { name: 'Placeholder headlamp', notes: 'TODO' },
      { name: 'Placeholder first aid kit', notes: 'TODO' },
    ],
  },
];
