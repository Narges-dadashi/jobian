import { PaginationParams } from "./paginationParams.model";

export class AdvertisementParams extends PaginationParams {
    orderBy: string = 'created';
    search: string = '';
}