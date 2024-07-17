const SubmitButton = ({
  isValid,
  isPending,
}: {
  isValid: boolean;
  isPending: boolean;
}) => (
  <button
    className={`btn ${!isPending && "btn-primary"} ${!isValid && "btn-disabled"}`}
    type="submit"
  >
    {isPending ? (
      <span className="loading loading-ring loading-lg"></span>
    ) : (
      "Submit"
    )}
  </button>
);

export default SubmitButton;
