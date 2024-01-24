import { useState } from 'react';

function App() {
    return (
        <div className='app'>
            <Counter />
        </div>
    );
}

function Counter() {
    const [stepValue, setStepValue] = useState(1);
    const [count, setCount] = useState(0);

    const date = new Date();
    date.setDate(date.getDate() + count);

    function handleReset() {
        setCount(0);
        setStepValue(1);
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Steps stepValue={stepValue} setStepValue={setStepValue} />
            <Count count={count} stepValue={stepValue} setCount={setCount} />
            <p>
                {count == 0 && <span>Today's date is</span>}
                {count > 0 && <span>{count} days from today is</span>}
                {count < 0 && <span>{Math.abs(count)} days ago was</span>}
                {` ${date.toDateString()}`}
            </p>
            {(count !== 0 || stepValue !== 1) && (
                <button onClick={handleReset}>Reset</button>
            )}
        </div>
    );
}

function Steps({ stepValue, setStepValue }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type='range'
                min='1'
                max='9'
                value={stepValue}
                onChange={(e) => setStepValue(Number(e.target.value))}
            />
            <span>{stepValue}</span>
        </div>
    );
}

function Count({ count, setCount, stepValue }) {
    return (
        <div>
            <button
                onClick={() =>
                    setCount(
                        (prevCount) => Number(prevCount) - Number(stepValue),
                    )
                }
            >
                -
            </button>
            <input
                type='text'
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
            />
            <button
                onClick={() =>
                    setCount(
                        (prevCount) => Number(prevCount) + Number(stepValue),
                    )
                }
            >
                +
            </button>
        </div>
    );
}

export default App;
