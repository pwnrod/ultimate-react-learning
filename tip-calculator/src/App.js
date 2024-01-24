import { useState } from 'react';

export default function App() {
    const [billAmount, setBillAmount] = useState('');
    const [tipPercentage1, setTipPercentage1] = useState(0);
    const [tipPercentage2, setTipPercentage2] = useState(0);

    const averageTipPercentage = (tipPercentage1 + tipPercentage2) / 2;
    const tipAmount = Number(billAmount) * (averageTipPercentage / 100);

    function handleReset() {
        setBillAmount('');
        setTipPercentage1(0);
        setTipPercentage2(0);
    }

    return (
        <div className='App'>
            <BillInput billAmount={billAmount} setBillAmount={setBillAmount} />
            <ServicePercentage
                tipPercentage={tipPercentage1}
                setTipPercentage={setTipPercentage1}
            >
                How did you like the service?
            </ServicePercentage>
            <ServicePercentage
                tipPercentage={tipPercentage2}
                setTipPercentage={setTipPercentage2}
            >
                How did your friend like the service?
            </ServicePercentage>
            {billAmount > 0 && (
                <>
                    <TipCalculator
                        billAmount={Number(billAmount)}
                        tipAmount={Number(tipAmount)}
                    />
                    <ResetButton onReset={handleReset} />
                </>
            )}
        </div>
    );
}

function BillInput({ billAmount, setBillAmount }) {
    return (
        <div>
            <span>How much was the bill? </span>
            <input
                type='text'
                placeholder='Bill amount'
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
            />
        </div>
    );
}

function ServicePercentage({ tipPercentage, setTipPercentage, children }) {
    return (
        <div>
            <span>{children}</span>{' '}
            <select
                value={tipPercentage}
                onChange={(e) => setTipPercentage(Number(e.target.value))}
            >
                <option value='0'>Dissatisfied (0%)</option>
                <option value='5'>It was okay (5%)</option>
                <option value='10'>It was good (10%)</option>
                <option value='20'>Absolutely amazing! (20%)</option>
            </select>
        </div>
    );
}

function TipCalculator({ billAmount, tipAmount }) {
    return (
        <h3>
            You pay {billAmount + tipAmount} (${billAmount} + ${tipAmount} tip)
        </h3>
    );
}

function ResetButton({ onReset }) {
    return <button onClick={onReset}>Reset</button>;
}
