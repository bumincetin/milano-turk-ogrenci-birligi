interface CouponAttributes {
  title: string;
  description: string;
  // Diğer özellikler...
}

interface CouponData {
  id: number;
  attributes: CouponAttributes;
}

interface StrapiResponse {
  data: CouponData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
} 