import { Person } from "./Types";

const PersonBalance = (p: Person) => {
  return (
    <div>
      <h3>{p.name}</h3>
      <h4>{p.balance}</h4>
    </div>
  );
};

export default PersonBalance;
