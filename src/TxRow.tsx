import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "./Types";
import { UseFSQueries } from "./api/Queries";
import { PlaceholderAvatar } from "./components/PlaceholderAvatar";

const TxRow = (t: Transaction) => {
  const Queries = UseFSQueries();

  const client = useQueryClient();
  const deleteTx = useMutation({
    mutationFn: () => Queries.deleteTransaction(t.txId!),
    onSettled: () => client.invalidateQueries({ queryKey: ["txData"] }),
  });
  return (
    <tr>
      <td className="flex content-center">
        {t.portraitUrl ? (
          <div className="w-14 mask mask-squircle ">
            <img src={t.portraitUrl} />
          </div>
        ) : (
          <div className="avatar placeholder">
            <div className="w-14 bg-neutral mask mask-squircle  justify-center ">
              <span className="text-neutral-content text-center">
                <PlaceholderAvatar personName={t.payer} />
              </span>
            </div>
          </div>
        )}
        <p className="ml-3 content-center">{t.payer}</p>
      </td>
      <td>{t.expense}</td>
      <td>{t.sum}kr</td>
      <td>
        <button className="btn" onClick={() => deleteTx.mutate()}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default TxRow;
