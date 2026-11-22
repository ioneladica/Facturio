export type CreditPack = {
  id: string;
  name: string;
  description: string;
  credits: number;
  price: number;
  isActive: boolean;
};

export type CreditPackInput = {
  name: string;
  description: string;
  credits: number;
  price: number;
  isActive: boolean;
};
