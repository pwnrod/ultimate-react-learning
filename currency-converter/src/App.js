// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react';

export default function App() {
    const [startingCurrency, setStartingCurrency] = useState('USD');
    const [newCurrency, setNewCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState('');

    useEffect(
        function () {
            async function fetchData() {
                setIsLoading(true);
                const res = await fetch(
                    `https://api.frankfurter.app/latest?amount=${Number(amount)}&from=${startingCurrency}&to=${newCurrency}`,
                );
                const data = await res.json();
                setOutput(data.rates[newCurrency]);
                setIsLoading(false);
            }

            if (startingCurrency === newCurrency || amount.length === 0) {
                return setOutput(amount);
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
                disabled={isLoading}
            />
            <select
                value={startingCurrency}
                onChange={(e) => setStartingCurrency(e.target.value)}
                disabled={isLoading}
            >
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='CAD'>CAD</option>
                <option value='INR'>INR</option>
            </select>
            <select
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value)}
                disabled={isLoading}
            >
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='CAD'>CAD</option>
                <option value='INR'>INR</option>
            </select>
            <p>
                {output} {newCurrency}
            </p>
        </div>
    );
}
