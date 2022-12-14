import React, { Fragment } from 'react';
import Card from '../../Molecules/Card/Card';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useContext } from 'react';
import { MainContext } from '../../../Context/MainContext';
import Link from '../../Atoms/Link/Link';
import './PhoneCardContent.css';


function PhoneCardContent({filteredPhones, position, bottom, marginLeft }) {
    const { matches } = useContext(MainContext);
    return (
        <>
            <div
                className='phone-card-content'
                style={{
                    position: matches ? position : null,
                    bottom: matches ? bottom : null,
                    marginLeft: matches ? marginLeft : null,
                }}
            >
                {filteredPhones?.map((phone, idx) => (
                    <div key={idx}>
                        <Card
                            banner={
                                phone.banner.length > 0 ? (
                                    <div className='phone-banner'>{phone.banner.toUpperCase()}</div>
                                ) : (
                                    <div style={{ marginTop: '30px' }}>
                                        {phone.banner.toUpperCase()}
                                    </div>
                                )
                            }
                            subTitle={
                                <h1 className='sub-title' style={{ fontSize: '1.0rem' }}>
                                    {phone.name}
                                </h1>
                            }
                            discountPrice={
                                <>
                                    <span className='discount-price-line-through'>
                                        {phone.properties.cost.reducedPrice}
                                    </span>
                                    <span
                                        className='discount-price'
                                        style={{
                                            color: '#d22000',
                                        }}
                                    >
                                        {phone.properties.cost.reducedDiscount}
                                    </span>
                                    <span className='discount-price'>
                                        {phone.properties.cost.reduced}
                                    </span>
                                </>
                            }
                            subTitleFontSize='1.0rem'
                            image={
                                <div className='phone-image-container'>
                                    <img className='phone-image' src={phone.image} alt='' />
                                </div>
                            }
                            price={phone.properties.cost.standard}
                            priceSign={phone.properties.cost.priceSign}
                            zero={phone.properties.cost.zero}
                            month={phone.properties.cost.down}
                            fullPrice={
                                <p className='phone-full-price'>Full Price: ${phone.fullPrice}</p>
                            }
                            taxes={
                                <div className='calculation-content'>
                                    {phone.taxes.map((data, idx) => (
                                        <Fragment key={idx}>
                                            <p>{data} |</p>
                                        </Fragment>
                                    ))}
                                </div>
                            }
                            certifiedPreOwned={
                                <p className='certified-pre-owned'>{phone.certifiedPreOwned}</p>
                            }
                            content={
                                phone.content.length > 0 ? (
                                    <p className='phone-bottom-content'>{phone.content}</p>
                                ) : null
                            }
                            Link={
                                <Link href='/' title='VIEW DETAILS' icon={<ChevronRightIcon />} />
                            }
                            matches={matches}
                            height='100%'
                            marginTop='30px'
                            marginLeft='20px'
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default PhoneCardContent;
