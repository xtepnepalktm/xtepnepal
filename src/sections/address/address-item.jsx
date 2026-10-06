import { Label } from "@/components/label";

export function AddressItem({
  addressItem,
  selectedAddress,
  action,
  className = "",
  ...other
}) {
  const { address_id, address, district, state } = addressItem;

  const isSelected = selectedAddress === address_id;

  return (
    <div
      className={[
        "relative flex flex-col gap-2",
        "md:flex-row md:items-end",
        "p-4 border border-red-200 bg-white",
        className,
      ].join(" ")}
      {...other}
    >
      {/* Left content */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <p className="text-sm font-semibold text-gray-900">
            {address}, {district?.district_name}
          </p>

          {isSelected && (
            <span className="ml-2">
              <Label color="info">Selected</Label>
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500">
          {state?.state_name}
        </p>
      </div>

      {/* Action slot */}
      {action && <div>{action}</div>}
    </div>
  );
}