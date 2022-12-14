import Title from '../Atoms/Title/Title';
import BreadCrumbsContent from '../Organisms/BreadCrumbsContent/BreadCrumbsContent';
import { MainContext } from '../../Context/MainContext';
import { Fragment, useContext, useState } from 'react';
import { breadCrumbsLabelsForPlans } from '../../Utils/NavbarLabel';
import ListDivider from '../Organisms/ListDivider/ListDivider';
import { dividerLabelItems } from '../../Utils/DividerLabels';
import Tabs from '../Molecules/Tabs/Tabs';
import Button from '../Atoms/Button/Button';
import { tabSwitcherLabels } from '../../Utils/DividerLabels';
import data from '../../Data/phone-data-options.json';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { tabSwitcherLabelsAddOns } from '../../Utils/DividerLabels';
import CheckoutInfo from '../Molecules/CheckoutInfo/CheckoutInfo';
import { checkOutInfo } from '../../Utils/DividerLabels';
import { checkoutLabels } from '../../Utils/DividerLabels';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { oneTimeFeesLabels } from '../../Utils/DividerLabels';
import DataPlanCard from '../Molecules/DataPlanCard/DataPlanCard';
import dataAddons from '../../Data/Phone-data-addons.json';

function BuildAPlanPage() {
    const { matches } = useContext(MainContext);
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(true);
    const [openAddons, setOpenAddons] = useState(false);
    const [openCheckout, setOpenCheckout] = useState(false);
    const [selectedView, setSelectedView] = useState('Data,Talk & Text');
    const [selected, setSelected] = useState(3);
    const [cartItems, setCartItems] = useState([]);
    const [showTalkOptions, setShowTalkOptions] = useState(false);

    // data
    const dataOptions = data.data;
    const dataForAddons = dataAddons.data;

    // select a plan and add to shopping cart
    const selectPlan = () => {
        const findItem = dataOptions.filter((x) => x.id === selected);
        if (findItem) {
            setCartItems([...findItem]);
        }
    };

    // stepper to move divider
    const nextStep = () => {
        if (activeStep === 0) {
            setOpen(false);
            setOpenAddons(true);
            selectPlan();
            setShowTalkOptions(true);
            setSelectedView('Device Protection');
        } else if (activeStep === 1) {
            setOpenAddons(false);
        }
        if (activeStep < 2) {
            setActiveStep((currentStep) => currentStep + 1);
        }
    };

    const openHandler = () => {
        setOpen(true);
        setActiveStep(0);
        setSelectedView('Data,Talk & Text');
        setOpenAddons(false);
    };

    // open and close the checkout dropdowns same time
    const setCheckoutOpenAndClose = () => {
        setOpenCheckout(!openCheckout);
    };

    // selecting each card and adding border based on click
    const handleClick = (id) => {
        setSelected(id !== selected ? id : '');
    };

    // sum up the total after taxes
    const sumUpAfterTaxes = cartItems.reduce((prev, current) => {
        return (
            prev +
            current.dataPlanTypeCost +
            0.05 * current.dataPlanTypeCost +
            0.08 * current.dataPlanTypeCost
        );
    }, 0);

    /// to show cards based on selecting a data option
    const renderSelectedView = (view) => {
        switch (view) {
            case 'Data,Talk & Text':
                return dataOptions.filter((phoneItem) => phoneItem.title === view)
                    .map((item, i) => (
                        <DataPlanCard
                            key={i}
                            item={item.id}
                            dataPlanType={item.dataPlanType}
                            dataAmount={item.dataAmount}
                            dataPlanTypeCost={item.dataPlanTypeCost}
                            onClick={handleClick}
                            selected={selected}
                        />
                    ));

            case 'Talk & Text':
                return dataOptions.filter((phoneItem) => phoneItem.title === view)
                    .map((item, i) => (
                        <DataPlanCard
                            key={i}
                            item={item.id}
                            dataPlanType={item.dataPlanType}
                            dataAmount={item.dataAmount}
                            dataPlanTypeCost={item.dataPlanTypeCost}
                            onClick={handleClick}
                            selected={selected}
                        />
                    ));

            case 'Basic':
                return dataOptions.filter((phoneItem) => phoneItem.title === view)
                    .map((item, i) => (
                        <DataPlanCard
                            key={i}
                            item={item.id}
                            dataPlanType={item.dataPlanType}
                            dataAmount={item.dataAmount}
                            dataPlanTypeCost={item.dataPlanTypeCost}
                            onClick={handleClick}
                            selected={selected}
                        />
                    ));

            case 'Device Protection':
                return dataOptions.filter((phoneItem) => phoneItem.title === view)
                    .map((item, i) => (
                        <DataPlanCard
                            key={i}
                            item={item.id}
                            dataPlanType={item.dataPlanType}
                            dataAmount={item.dataAmount}
                            dataPlanTypeCost={item.dataPlanTypeCost}
                            onClick={handleClick}
                            selected={selected}
                        />
                    ));

            default:
                return dataForAddons.filter((phoneItem) => phoneItem.title === view)
                    .map((item, i) => (
                        <DataPlanCard
                            key={i}
                            item={item.id}
                            dataPlanType={item.dataPlanType}
                            dataAmount={item.dataAmount}
                            dataPlanTypeCost={item.dataPlanTypeCost}
                            onClick={handleClick}
                            selected={selected}
                        />
                    ));
        }
    };

    /// to show the dropdown in the lis item
    const showDropDown = (subTitle, idx) => {
        if (subTitle === 'Select DATA Option') {
            const selectDataOption = open && (
                <div className='list-divider-subtitle'>
                    {' '}
                    <p style={{ fontWeight: '600' }}>
                        {idx + 1}. {subTitle}
                    </p>
                    <Tabs
                        tabSwitcherLabels={tabSwitcherLabels}
                        selectedView={selectedView}
                        setSelectedView={setSelectedView}
                    />
                    {renderSelectedView(selectedView)}
                    <Button
                        title='Continue'
                        backgroundColor='rgb(255, 230, 0)'
                        border='1px solid black'
                        onClick={nextStep}
                    />
                </div>
            );
            return selectDataOption;
        } else if (subTitle === 'Addons') {
            const selectAddons = openAddons && (
                <div className='list-divider-subtitle'>
                    <p style={{ fontWeight: '600' }}>
                        {idx + 1}. {subTitle}
                    </p>
                    <Tabs
                        tabSwitcherLabels={tabSwitcherLabelsAddOns}
                        selectedView={selectedView}
                        setSelectedView={setSelectedView}
                    />
                    {renderSelectedView(selectedView)}
                    <Button
                        title='Continue'
                        backgroundColor='rgb(255, 230, 0)'
                        border='1px solid black'
                        onClick={nextStep}
                    />
                </div>
            );
            return selectAddons;
        } else if (subTitle === 'Total') {
            const total = openCheckout && (
                <div className='list-divider-subtitle'>
                    <div className='align-cart-labels'>
                        <p
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                fontWeight: '600',
                            }}
                        >
                            {cartItems.map((item, id) => {
                                return (
                                    <Fragment key={id}>
                                        <span>{item.title}</span>
                                        <span>{item.dataPlanType}</span>
                                        <span>{item.dataAmount}</span>
                                        <span>${item.dataPlanTypeCost}/mo</span>
                                    </Fragment>
                                );
                            })}
                        </p>
                    </div>
                    <p>
                        Total: after taxes
                        <span style={{ fontWeight: '600', fontSize: '1.5rem' }}>
                            {' '}
                            ${sumUpAfterTaxes}/mon.
                        </span>
                    </p>
                </div>
            );
            return total;
        } else if (subTitle === 'Cost') {
            const cost = openCheckout && (
                <div className='list-divider-subtitle'>
                    <div className='align-cart-labels'>
                        <div style={{ width: '100%' }}>
                            {oneTimeFeesLabels.map((item, id) => {
                                return (
                                    <Fragment key={id}>
                                        <p
                                            style={{
                                                borderBottom: '1px solid #ccc',
                                                paddingBottom: '10px',
                                            }}
                                        >
                                            {item.title}{' '}
                                            {item.subTitle ? (
                                                <span
                                                    style={{
                                                        position: 'absolute',
                                                        right: '0px',
                                                        textDecoration:
                                                            item.subTitle === '50.00'
                                                                ? 'line-through'
                                                                : null,
                                                    }}
                                                >
                                                    {item.subTitle}
                                                </span>
                                            ) : null}
                                        </p>
                                    </Fragment>
                                );
                            })}{' '}
                        </div>
                    </div>
                </div>
            );
            return cost;
        }
    };

    return (
        <>
            <BreadCrumbsContent data={breadCrumbsLabelsForPlans} />
            <div className='build-plan-container'>
                <Title
                    title='BUILD YOUR PLAN'
                    fontSize='2.4rem'
                    fontWeight='900'
                    textTransform='uppercase'
                    marginTop='50px'
                    marginLeft={!matches ? '20px' : null}
                />
                <div
                    className='parent-divider-container'
                    style={{
                        flexDirection: matches ? 'row' : 'column',
                        maxWidth: matches ? '1200px' : null,
                    }}
                >
                    <ListDivider
                        minWidth={matches ? '650px' : '450px'}
                        listItems={dividerLabelItems}
                        activeStep={activeStep}
                        open={open}
                        showDropDown={showDropDown}
                        showTalkOptions={showTalkOptions}
                        cartItems={cartItems}
                        openHandler={
                            <Button
                                onClick={openHandler}
                                title='Edit'
                                backgroundColor='white'
                                border='1px solid #035d67'
                                color='#035d67'
                                position='absolute'
                                right='8px'
                                top='0px'
                            />
                        }
                    />
                    <ListDivider
                        minWidth='450px'
                        height={openCheckout ? '715px' : '470px'}
                        title='Cart Summary'
                        listItems={checkoutLabels}
                        shoppingIcon={
                            <span style={{ color: 'teal' }}>
                                <ShoppingCartOutlinedIcon />
                            </span>
                        }
                        showDropDown={showDropDown}
                        onClick={setCheckoutOpenAndClose}
                        openCheckout={openCheckout}
                        arrowUp={<KeyboardArrowUpOutlinedIcon />}
                        arrowDown={<KeyboardArrowDownOutlinedIcon />}
                        CheckoutInfo={
                            <CheckoutInfo
                                checkOutInfo={checkOutInfo}
                                mainTitle='Your Purchase Includes:'
                                content='Discounts will be reflected in full during order review'
                            />
                        }
                    />
                </div>
            </div>
        </>
    );
}

export default BuildAPlanPage;
