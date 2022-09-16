export type Menu = {
  id: string;
  name: string;
  categories: Array<string>;
};

export type Category = {
  id: string;
  name: string;
  items: Array<string>;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  selections: Array<Selection>;
};

export type Selection = {
  id: string;
  name: string;
  options: Array<Option>;
};

export type Option = {
  id: string;
  name: string;
  price: number;
};
