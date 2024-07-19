import { Reimbursement } from "./Types";
import { PlaceholderAvatar } from "./components/PlaceholderAvatar";

const AvatarBox = ({
  perName,
  portraitUrl,
}: {
  perName: string;
  portraitUrl: string;
}) => {
  return portraitUrl ? (
    <div className="avatar aspect-square rounded basis-1/4">
      <img src={portraitUrl} />
    </div>
  ) : (
    <div className="avatar placeholder aspect-square bg-neutral rounded basis-1/4">
      <div className="placeholder">
        <span className="text-3xl text-neutral-content">
          <PlaceholderAvatar personName={perName} />
        </span>
      </div>
    </div>
  );
};

const ReimbursementBox = (rb: Reimbursement) => {
  return (
    <div className="card card-bordered flex flex-row my-10 max-h-34 justify-between">
      <AvatarBox perName={rb.debtor} portraitUrl={rb.debtorPortraitUrl ?? ""} />
      <div className="py-6 basis-2/4">
        <p className="text-center">
          {rb.debtor} should pay {rb.creditor}
        </p>
        <h4 className="italic text-center mt-4 font-black text-2xl">
          {Math.round(rb.amount)}kr.
        </h4>
      </div>
      <AvatarBox
        perName={rb.creditor}
        portraitUrl={rb.creditorPortraitUrl ?? ""}
      />
    </div>
  );
};

export default ReimbursementBox;
