import React from 'react';
import Link from 'next/link';
import ReactSVG from 'react-svg'

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
    products: Array<ProductsListT> | null
};

class ProductsList extends React.Component<MyProps> {

    deleteUserProduct = (productId :number) => this.props.deleteUserProduct(productId)

    render() {

        const { products } = this.props
      return (
          <section className="product-list__container">
              {
                products && products.map(singleProduct => {
                    const { productUrl, hostName, imageUrl, productName, productId, isActive, isPromo } = singleProduct;
                    return (
                        <section className="container__product" key={productName + productId}>
                            <div className={`product__product-wrapper ${ !isActive && 'inactive-product' }`}>
                                <header>
                                    <h2 className="header__host-name">{hostName}</h2>
                                    <div className="header__img-wrapper">
                                        <img src={imageUrl || 'https://via.placeholder.com/200x200'} alt={'productName'} />
                                        {isPromo && <ReactSVG src='../static/svg/discounted.svg'/>}
                                        <div className="img-wrapper__delete-icon">
                                            <DeleteOutline onClick={() => this.deleteUserProduct(productId)}/>
                                        </div>

                                    </div>
                                </header>
                                <body>
                                    <Link href={productUrl} >
                                        <a className="body__url">
                                            {productName || productUrl}
                                        </a>
                                    </Link>
                                    <div>
                                        <span className={`${isActive ? '' : 'inactive'}`}>{isActive ? '' : 'INACTIVE'}</span>
                                    </div>
                                </body>
                                <article className="product-wrapper__inactive-message">
                                    <span>This product needs to be verified, it usually take up to 24 hours :)</span>
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