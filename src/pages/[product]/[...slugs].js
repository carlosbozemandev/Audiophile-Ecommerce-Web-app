import Image from "next/image";
import BestGear from "@/components/bestGear/BestGear";
import Product from "@/components/product/Product";
import ProductCardContainer from "@/components/productCardContainer/ProductCardContainer";

export default function Slug(props) {

    const { prod } = props;
    const include = prod.includes.map((e, i) => {
        return (
            <li key={i} style={{ color: 'var(--greyOnWhite)' }}><strong style={{ color: 'var(--orange)' }}>{e.quantity}x</strong>~{e.item}</li>
        );
    });
    return (
        <>
            <div className="">
                <Product
                    key={prod.id}
                    cart={true}
                    name={prod.name}
                    price={prod.price}
                    desc={prod.description}
                    src={prod.image}
                    link={"#"}
                />
                <div className="flex marginTB" style={{ justifyContent: 'space-between' }}>
                    <div className="childsMargin" style={{ width: '60%' }}>
                        <h2>FEATURES</h2>
                        <p style={{ color: 'var(--greyOnWhite)' }}>{prod.features}</p>
                    </div>
                    <div className="childsMargin" style={{ width: '30%' }}>
                        <h2>IN THE BOX</h2>
                        <ul className="childsMargin">{include}</ul>
                    </div>
                </div>
                <div className="gallery flex marginTB childWidth" style={{height: '37rem', justifyContent: "space-between"}}>
                    <div className="childWidth height100 flex" style={{flexDirection: 'column', justifyContent: "space-between",width: '40%'}}>
                        <div className="width100" style={{height: '49%'}}>
                            <picture>
                                <source media="(min-width: 992px)" srcSet={prod.gallery.first.desktop} />
                                <source media="(min-width: 480px)" srcSet={prod.gallery.first.tablet} />
                                <Image className="b-radius width100 height100" src={prod.gallery.first.mobile} width={550} height={550} alt="image of speaker" />
                            </picture>
                        </div>
                        <div className="width100" style={{height: '49%'}}>
                            <picture>
                                <source media="(min-width: 992px)" srcSet={prod.gallery.second.desktop} />
                                <source media="(min-width: 480px)" srcSet={prod.gallery.second.tablet} />
                                <Image className="b-radius width100 height100" src={prod.gallery.second.mobile} width={550} height={550} alt="image of speaker" />
                            </picture>
                        </div>
                    </div>
                    <div className="height100" style={{width: '59%'}}>
                        <picture>
                            <source media="(min-width: 992px)" srcSet={prod.gallery.third.desktop} />
                            <source media="(min-width: 480px)" srcSet={prod.gallery.third.tablet} />
                            <Image className="b-radius width100 height100" src={prod.gallery.third.mobile} width={550} height={550} alt="image of speaker" />
                        </picture>
                    </div>
                </div>
                <h2 className="center marginTB">YOU MAY ALSO LIKE</h2>
                <ProductCardContainer />
                <BestGear />
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    const { product, slugs } = params;
    const res = await fetch(`https://audiophile-murex.vercel.app/api/products/${product}/${slugs[0]}`);
    // const res = await fetch(`http://localhost:3000/api/products/${product}/${slugs[0]}`);
    const data = await res.json();
    return {
        props: {
            prod: data,
        },
        notFound: true
    };
}

// export async function getStaticPaths() {
//     return {
//         paths: [
//         ],
//         fallback: "blocking", // false or "blocking"
//     };
// }