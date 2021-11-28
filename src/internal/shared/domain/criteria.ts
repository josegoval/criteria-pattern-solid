export type FieldOperatorCriteria =
  | "greater than"
  | "greater or equal than"
  | "less than"
  | "less or equal than"
  | "equal"
  | "not"
  | "includes";

export type CriteriaField<FieldNameType> = {
  fieldName: FieldNameType;
  operator: FieldOperatorCriteria;
  value: string | number;
};

export type OrderByCriteria<FieldNameType> = {
  fieldName: FieldNameType;
  order: "ASC" | "DESC";
};

export class PaginationCriteria {
  fromPage: number;
  toPage: number;
  pageSize: number;

  constructor(fromPage: number, toPage: number, pageSize: number) {
    this.fromPage = fromPage;
    this.toPage = toPage;
    this.pageSize = pageSize;
  }

  isValid(): boolean {
    return +this.toPage > +this.fromPage;
  }
}

export class DefaultCriteria<FieldNameType> {
  fields;
  orderBy;
  pagination;

  constructor(
    fields: CriteriaField<FieldNameType>[],
    orderBy: OrderByCriteria<FieldNameType>,
    pagination: PaginationCriteria
  ) {
    this.fields = fields;
    this.orderBy = orderBy;
    this.pagination = pagination;
  }

  hasFields(): boolean {
    return Array.isArray(this.fields) && this.fields.length > 0;
  }
  hasOrderBy(): boolean {
    return !!this.orderBy;
  }
  hasValidPagination(): boolean {
    return this.pagination.isValid();
  }
}
