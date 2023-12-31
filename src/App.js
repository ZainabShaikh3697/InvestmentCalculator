import { useState } from 'react';
import Header from './assets/Header/Header';
import ResultsTable from './assets/ResultsTable/ResultsTable';
import UserInput from './assets/UserInput/UserInput';

function App() {
  const [userInput, setUserInput] = useState(null);
  const calculateHandler = (item) => {
    setUserInput(item)
  }
  // Should be triggered when form is submitted

  const yearlyData = []; // per-year results
  if (userInput) {

    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler} />
      {!userInput && <p className='msg'>No Investment calculated yet.</p>}
      {userInput && <ResultsTable data={yearlyData} initialInvestment={userInput['current-savings']} />}


    </div >
  );
}

export default App;
