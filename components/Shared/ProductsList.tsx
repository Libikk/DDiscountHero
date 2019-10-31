import React from 'react';
import Link from 'next/link';
import DiscountIcon from '../../static/svg/discounted.svg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteUserProduct } from '../../dispatchers/productDispatchers';

import '../../styles/productsList.scss';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

interface ProductsListT {
    hostName: string,
    imageUrl: string,
    productName: string,
    productUrl: string,
    createdAt: string | undefined,
    isActive: number,
    productId: number,
    isPromo: number,

   // isPromo:

  }

type MyProps = {
    products: Array<ProductsListT> | null,
    pageName: string,
    deleteUserProduct: Function
};

class ProductsList extends React.Component<MyProps> {

    deleteUserProduct = (productId :number) => this.props.deleteUserProduct(productId)

    render() {
        const { products, pageName } = this.props
        const isLandingPage = pageName === 'landingPage';
      return (
          <section className="product-list__container">
              {
                products && products.map(singleProduct => {
                    const { productUrl, hostName, imageUrl, productName, productId, isActive, isPromo, productDiscountedPrice, productPrice } = singleProduct;
                    return (
                        <section className="container__product" key={productName + productId}>
                            <div className={`product__product-wrapper ${ !isActive && !isLandingPage && 'inactive-product' }`}>
                                <header>
                                    <h2 className="header__host-name">{hostName}</h2>
                                    <div className="header__img-wrapper">
                                        <img src={imageUrl || 'https://via.placeholder.com/200x200'} alt={'productName'} />
                                        {isPromo && <DiscountIcon />}
                                        {
                                            !isLandingPage &&
                                            <div className="img-wrapper__delete-icon">
                                                <DeleteOutline onClick={() => this.deleteUserProduct(productId)}/>
                                            </div>
                                        }
                                    </div>
                                </header>
                                <body>
                                    <Link href={productUrl} >
                                        <a className="body__url">
                                            {productName || productUrl}
                                        </a>
                                    </Link>
                                    {(productDiscountedPrice && productPrice) ?
                                        <div className="body__product-prices">
                                            <span className="product-prices__current-price">{productPrice}</span>
                                            <span className="product-prices__arrow"> --></span>
                                            <span className="product-prices__discounted-price">{productDiscountedPrice}</span>
                                        </div> :
                                        <div className="body__product-prices-unavailable">
                                            <span>Product prices are not available yet</span>
                                        </div>
                                    }


                                </body>
                                <article className="product-wrapper__inactive-message">
                                    <span>This product needs to be verified</span>
                                </article>
                            </div>
                        </section>
                    )
                })
              }
          </section>
    );
  }
}
const mapDispatchToProps = dispatch => ({
    deleteUserProduct: bindActionCreators(deleteUserProduct, dispatch),
});

export default connect(null, mapDispatchToProps)(ProductsList);