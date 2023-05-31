export interface ProductData {
  brand: string;
  category: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  rating: number;
  thumbnail: string;
  title: string;
}

export interface PorductResponseData {
  products: ProductData[];
  total: number;
}

export interface PorductResponsePagination {
  products: ProductData[];
  page: number;
}

export interface ProductInitialState {
  products: ProductData[];
  bestProduct: ProductData | undefined
  pagesCount: number;
  currentPage: number;
  error: unknown;
  isLoading: boolean;
}
