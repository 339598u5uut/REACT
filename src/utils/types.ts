import { Location } from "history";

export type TLocationState = {
  background?: Location;
  state?: {
    from: Location;
  };
};

export type TLayerProps = {
  index: number;
  item: TIngredient;
  moveIngredient: (arg0: number | undefined, arg1: number) => void;
}

export type TIngredient = {
  calories: number,
  carbohydrates: number,
  constructorId: string,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  __v?: number,
  _id: string,
  key?: number,
  index?: number;
}

export type TUserIngredientsId = {
  ingredients: any[];
}

export type TReduceAcc = {
  [key: string]: number;
}

export type TReduceCur = {
  [key: string]: string;
}

export type TProduct = {
  count: number;
  image: any;
  _id: string;
  name: string;
  price: number;
  src: string;
  children?: React.ReactNode;
  handleOpenModal: (arg: TIngredient) => void;
}

export type TParamTypes = {
  id: string;
}

export type TModal = {
  onClose: () => void;
  name: string;
  children?: React.ReactNode;
}

export type TModalOverlay = {
  onClose: () => void;
  children?: React.ReactNode;
}

export type TOrderDetails = {
  number: string;
  id: string;
  message: string;
  recommendation: string;
}

export type TForm = {
  email: string;
  password: string;
}

export type TResponse = {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url:string;
  readonly res: any;  
  json(): Promise<TResponse>;
}