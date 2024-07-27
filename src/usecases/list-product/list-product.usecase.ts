import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecase";

export type ListProductInputDto = void;

export type ListProductsOutputDto = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export class ListProductUsecase
  implements Usecase<ListProductInputDto, ListProductsOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new ListProductUsecase(productGateway);
  }

  public async execute(): Promise<ListProductsOutputDto> {
    const aProducts = await this.productGateway.list();
    const output = this.presentOutput(aProducts);
    
    return output;
  }

  private presentOutput(products: Product[]): ListProductsOutputDto {
    return {
      products: products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        };
      }),
    };
  }
}
