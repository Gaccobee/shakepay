import React, { useEffect, useState } from "react";

import "./App.css";

import { Row, Dialog } from "./components";

import {
  LogoAsset,
  CashinAsset,
  CashoutAsset,
  CurrencyBtcAsset,
  CurrencyCadAsset,
  CurrencyEthAsset,
  ExchangeAsset,
} from "./assets";

import transactionHistory from "./transactionHistory";

import { formatDate, calculateBalanceForCurrency } from "./utils";

const ratesApiUrl = "https://api.shakepay.co/rates";
const transactionsApiUrl =
  "https://shakepay.github.io/programming-exercise/web/transaction_history.json";

const currencyToNameMap = {
  CAD: "Dollars",
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USD: "US Dollars"
};

const ratesApiResponse = {
  CAD_BTC: 0.00001648,
  BTC_CAD: 60658.67,
  CAD_ETH: 0.000222411216932249,
  ETH_CAD: 4496.17,
  USD_BTC: 0.00002082,
  BTC_USD: 48021.75,
  USD_ETH: 0.000280938728667971,
  ETH_USD: 3559.49,
  BTC_ETH: 13.490725126475548,
  ETH_BTC: 0.074125,
  CAD_USD: 0.79,
  USD_CAD: 1.26,
};

const getCurrencyFullName = (currencyToNameMap, currentlySelectedCurrency) => {
  if (currencyToNameMap.hasOwnProperty(currentlySelectedCurrency)) {
    return currencyToNameMap[currentlySelectedCurrency]
  }
  return 'N/A';
}

const App = () => {
  const [responseFromRatesApi, setResponseFromRatesApi] = useState({});
  const [showWalletScreen, setShowWalletScreen] = useState(false);
  const [responseFromTransactionsApi, setResponseFromTransactionsApi] =
    useState([]);
  const [currentlySelectedCurrency, setCurrentlySelectedCurrency] =
    useState(null);

  const [showDialog, setShowDialog] = useState(false);

  const toggleWalletScreen = () =>
    setShowWalletScreen((previousValue) => !previousValue);

  const toggleDialog = () => setShowDialog((previousValue) => !previousValue);

  const handleRowOnClick = (currency) => () => {
    setCurrentlySelectedCurrency(currency);
    toggleWalletScreen();
  };

  // Fetch balances and transactions on first render
  useEffect(() => {
    setResponseFromRatesApi(ratesApiResponse);
    fetch(ratesApiUrl).then((response) => {
      // Note to Shakepay team: I am currently receiving a CORS error when I try to fetch the URL. 
      // I am hardcoding the response for the time being but this is how the fetch
      // call and syntax would look like.
      setResponseFromRatesApi(ratesApiResponse);
    });

    setResponseFromTransactionsApi(transactionHistory);
    fetch(transactionsApiUrl).then((response) => {
      // Note to Shakepay team: I am currently receiving a CORS error when I try to fetch the URL. 
      // I am hardcoding the response for the time being but this is how the fetch
      // call and syntax would look like.
      setResponseFromTransactionsApi(transactionHistory);
    });
  }, []);

  const currenciesToDisplay = [
    { name: "Dollars", asset: CurrencyCadAsset, currency: "CAD" },
    { name: "US Dollars", asset: CurrencyCadAsset, currency: "USD" },
    { name: "Bitcoin", asset: CurrencyBtcAsset, currency: "BTC" },
    { name: "Ethereum", asset: CurrencyEthAsset, currency: "ETH" },
  ];

  const formatTransactionRow = (transaction) => {
    const defaultTransactionObject = { label: "", value: "0", asset: null, valueClassName: "black" };
    if (!transaction) return  defaultTransactionObject;

    if (
      (transaction.type === "peer" ||
        transaction.type === "external account") &&
      transaction.direction === "debit"
    ) {
      return {
        label: "Sent",
        value: `-${transaction.amount}`,
        asset: CashoutAsset,
        valueClassName: "black"
      };
    }

    if (
      (transaction.type === "peer" ||
        transaction.type === "external account") &&
      transaction.direction === "credit"
    ) {
      return {
        label: "Received",
        value: transaction.amount,
        asset: CashinAsset,
        valueClassName: "green"
      };
    }

    if (transaction.type === "conversion") {
      return {
        label: `Exchanged to ${transaction.to.currency}`,
        value: `-${transaction.amount}`,
        asset: ExchangeAsset,
        valueClassName: "black"
      };
    }

    return defaultTransactionObject;
  };

  return (
    <>
      <div className="App">
        <header>
          {showWalletScreen ? (
            <>
              <div className="walletHeaderContainer">
                <div className="walletHeader">
                  <p className="backArrow" onClick={toggleWalletScreen}>
                    Back
                  </p>
                  <h3>{getCurrencyFullName(currencyToNameMap, currentlySelectedCurrency)}</h3>
                </div>

                <div className="balanceHeader">
                  <h4>Balance</h4>
                  {calculateBalanceForCurrency(
                    responseFromTransactionsApi.filter(
                      (transaction) =>
                        transaction.currency === currentlySelectedCurrency
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <div>
              <img src={LogoAsset} alt="Shakepay logo" />
              <h4>$</h4>
            </div>
          )}
        </header>

        <hr />

        {showWalletScreen ? (
          <>
          <div className="overviewContainer">
            <h2 className="leftAlignedText">Transactions</h2>

            {responseFromTransactionsApi
              .filter(
                (transaction) =>
                  transaction.currency === currentlySelectedCurrency
              )
              .map((transaction) => {
                const transactionRowObject = formatTransactionRow(transaction);
                const { asset, label, value, valueClassName } = transactionRowObject;
                return (
                  <Row
                    onClick={toggleDialog}
                    asset={asset}
                    label={label}
                    subtitle={formatDate(transaction.createdAt)}
                    value={value}
                    valueClassName={valueClassName}
                  />
                );
              })}
          </div>
          {showDialog && <Dialog title={"Title"} />}
          </>
        ) : (
          <div className="overviewContainer">
            {currenciesToDisplay.map((item) => {
              console.log('item: ', responseFromRatesApi['BTC_CAD']);
              return (
              <Row
                onClick={handleRowOnClick(item.currency)}
                asset={item.asset}
                label={item.name}
                value={responseFromRatesApi[`CAD_${item.currency}`]}
                subtitle={responseFromRatesApi[`${item.currency}_CAD`]}
              />
            )})}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
