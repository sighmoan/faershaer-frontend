import AddTxForm from "./AddTxForm";
import TxList from "./TxList";
import PersonBalancesList from "./PersonBalancesList";
import Header from "./Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl">
        <TxList></TxList>
        <AddTxForm />
        <PersonBalancesList />
      </main>
    </>
  );
}

export default App;
