// @ts-nocheck
import Product from './Product';
import { useHeaderContext } from '../Provider';

interface Props {
  cartProducts: any[];
}

export default function Products({ cartProducts }: Props) {
  const { checkout } = useHeaderContext();

  return (
    <>
      {cartProducts.map((product: any) => {
        return (
          <Product
            key={`${product.productId}-${product?.quantity}-${product?.size}`}
            product={product}
            checkoutId={checkout.id}
            cartLinesCounter={checkout.cartLinesCounter}
          />
        );
      })}
    </>
  );
}
