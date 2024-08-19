### Issues and Inefficiencies

1. **Filtering and Sorting Inside `useMemo`**: 
   - The code filters and sorts `balances` inside the `useMemo` hook. This can be inefficient because `useMemo` should be used for memoizing expensive computations, but the filtering and sorting logic is not very expensive and could be done separately for clarity and better performance.

2. **Incorrect Usage of `lhsPriority`**:
   - The variable `lhsPriority` is used but not declared, which will cause a runtime error.

3. **Inefficient Sorting Logic**:
   - The sorting logic re-calculates priorities multiple times. The code calculates the priority for each balance twice (once in `filter` and again in `sort`), which is redundant.

4. **Improper Return Values**:
   - The `filter` logic is inverted. It returns `true` if `balance.amount <= 0` but only if the priority is greater than -99. This logic should be clarified and potentially reversed.

5. **Unnecessary State Dependency**:
   - `prices` is included in the dependency array of `useMemo`, but it is not used within the memoized function. This can cause unnecessary re-renders.

### Refactored Code

Here is a refactored version of the code that addresses these issues:

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;  // I assume this should be a property of WalletBalance.
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const CHAIN_PRIORITIES: { [key: string]: number } = {
    'Osmosis': 100,
    'Ethereum': 50,
    'Arbitrum': 30,
    'Zilliqa': 20,
    'Neo': 20
  };

  const getPriority = (blockchain: string): number => {
    return CHAIN_PRIORITIES[blockchain] || -99;
  };

  const filterBalances = (balances: WalletBalance[]): WalletBalance[] => {
    return balances.filter(balance => {
      const priority = getPriority(balance.blockchain);
      return priority > -99 && balance.amount > 0;
    });
  };

  const sortBalances = (balances: WalletBalance[]): WalletBalance[] => {
    return balances.sort((lhs, rhs) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      return rightPriority - leftPriority;
    });
  };

  const sortedBalances = useMemo(() => {
    const filteredBalances = filterBalances(balances);
    return sortBalances(filteredBalances);
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(balance => ({
    ...balance,
    formatted: balance.amount.toFixed()
  }));

  const rows = formattedBalances.map((balance, index) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};
```

### Improvements

1. **Separation of Concerns**:
   - The filtering and sorting logic is now separated into individual functions (`filterBalances` and `sortBalances`), making the code more readable and easier to maintain.

2. **Correct Variable Usage**:
   - Fixed the undeclared `lhsPriority` variable by ensuring priorities are correctly calculated and compared.

3. **Efficient Dependency Management**:
   - Removed unnecessary `prices` dependency from the `useMemo` hook, ensuring it only re-computes when `balances` change.

4. **Improved Logic**:
   - Clarified the filtering logic to ensure only balances with a valid priority and positive amount are considered.
  
5. **Enhanced Type Safety**
   - Updated `FormattedWalletBalance` type to ensure each element in formattedBalances conforms to the expected structure.
  
6. **Efficient Priority Lookup**
   - By using a dictionary (CHAIN_PRIORITIES) for blockchain priorities, the getPriority function now performs constant-time lookups, which is more efficient than using a switch statement.