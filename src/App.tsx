import AddTxForm from "./AddTxForm";
import TxList from "./TxList";
import PersonBalancesList from "./PersonBalancesList";
import "./App.css";

function App() {
  return (
    <main className="mx-auto max-w-xl">
      <AddTxForm />
      <TxList></TxList>
      <PersonBalancesList />
    </main>
  );
}

export default App;
