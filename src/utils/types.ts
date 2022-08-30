import { Location } from "history";
import { TIngredientState } from "../services/reducers/ingredient-reduser";

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
  constructorId?: string,
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
  ingredients: string[];
}

export type TReduceAcc = {
  [key: string]: number;
}

export type TReduceCur = {
  [key: string]: string;
}

export type TProduct = {
  count: number;
  image: string;
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
  number: number;
  id: string;
  message: string;
  recommendation: string;
}

export type TForm = {
  email: string;
  password: string;
}

export type TFeedItem = {
  number: number;
  data: string;
  name: string;
  key:number;
  _id:string;
  list:React.ReactNode;
  totalPrice:number;
  price?:number;
  status?:string;
}

export type TUser = {
  email: string;
  name: string;
  password?:string;
}

export type TString ={
  [_id: string]: string;  
}

export type TIngredientUser = {
  ingredient: string
  constructorId?: string;
  _id?:string;
}

export type TIngredientInState = {
  _id: string,
  constructorId?: string; 
}

export type TMessage = {
  id: number;
  name: string;
  message: string;
}; 

export type TOrderPage= {
  number: number;
  data: number;
  name: string;
  price: number;
}

export type TOrder = {
  price: number;
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TGetOrdersResponse = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
}

export type TFeedDetales = {
	number: number;
	name: string;
	status: string;
	price: number;
	createdAt: string;
	totalPrice: number;
	children: React.ReactNode;
}

export type TFeedStatistics = {
	total: number;
	totalToday: number;
	ready: React.ReactNode;
	inwork: React.ReactNode;
	children?: React.ReactNode;
}

export type TOrderProfileDetails = {
	number: number;
	name: string;
	status: string;
	price: number;
	createdAt: string;
	totalPrice: number;
	children: React.ReactNode;
}

export type TSelector= {
  calories: number,
  carbohydrates: number,
  constructorId?: string,
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

export type TFeedList = {
	number?: number;
	name?: string;
	price?: number;
}

export type TFeedListIngredients = {
	name: string;
	price: number;
	image: string;
	counter: number;
}
