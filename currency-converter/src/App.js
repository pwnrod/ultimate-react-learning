// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react';

export default function App() {
    const [startingCurrency, setStartingCurrency] = useState('USD');
    const [newCurrency, setNewCurrency] = useState('USD');
    const [amount, setAmount] = useState('');
    const [output, setOutput] = useState('');

    useEffect(
        function () {
            if (!amount.length || startingCurrency === newCurrency) return;

            async function fetchData() {
                try {
                    const res = await fetch(
                        `https://api.frankfurter.app/latest?amount=${Number(amount)}&from=${startingCurrency}&to=${newCurrency}`,
                    );
                    const data = await res.json();
                    setOutput(data.rates[newCurrency].toFixed(2));
                } catch (err) {
                    console.log(err);
                }
            }

            fetchData();
        },
        [amount, startingCurrency, newCurrency],
    );

    return (
        <div className='App'>
            <input
                type='text'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select
                value={startingCurrency}
                onChange={(e) => setStartingCurrency(e.target.value)}
            >
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='CAD'>CAD</option>
                <option value='INR'>INR</option>
            </select>
            <select
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value)}
            >
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='CAD'>CAD</option>
                <option value='INR'>INR</option>
            </select>
            <p>{amount.length > 0 && output}</p>
        </div>
    );
}
