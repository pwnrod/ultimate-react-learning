export default function Stats({ items }) {
    if (!items.length)
        return (
            <p className='stats'>
                <em>Start adding some items to your packing list!</em>
            </p>
        );

    const totalItems = items.length;
    const totalPackedItems = items.reduce((count, item) => {
        return count + (item.packed ? 1 : 0);
    }, 0);
    const percentageOfItemsPacked = Math.round(
        (totalPackedItems / totalItems) * 100,
    );
    return (
        <footer className='stats'>
            <em>
                {percentageOfItemsPacked === 100
                    ? 'You got everything ready to go!'
                    : `You have ${totalItems} items on your list, and you already packed 
                ${totalPackedItems} (${percentageOfItemsPacked}%)`}
            </em>
        </footer>
    );
}
