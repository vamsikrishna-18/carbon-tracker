import { Hash } from "lucide-react";

function QuantityInput({
  quantity,
  unit,
  onQuantityChange,
}) {
  return (
    <div className="mb-6">
      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
        <Hash size={18} className="text-green-600" />
        Quantity
      </label>

      <div className="flex rounded-xl overflow-hidden border shadow-sm focus-within:ring-2 focus-within:ring-green-500">
        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) =>
            onQuantityChange(e.target.value)
          }
          className="flex-1 p-4 outline-none"
        />

        <div className="bg-green-100 text-green-700 font-semibold px-5 flex items-center justify-center min-w-[90px]">
          {unit || "-"}
        </div>
      </div>
    </div>
  );
}

export default QuantityInput;