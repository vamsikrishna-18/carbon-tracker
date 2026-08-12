import CategoryTabs from "./CategoryTabs";
import ActivityDropdown from "./ActivityDropdown";
import QuantityInput from "./QuantityInput";
import QuickLogCarousel from "./QuickLogCarousel";

function ActivityForm({
  form,
  setForm,
  handleSubmit,
  activityOptions,
  units,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <QuickLogCarousel
        onSelect={(item) =>
          setForm({
            ...form,
            category: item.category,
            activityType: item.activity,
            quantity: item.quantity,
          })
        }
      />

      <CategoryTabs
        selectedCategory={form.category}
        onCategoryChange={(category) =>
          setForm({
            ...form,
            category,
            activityType: "",
            quantity: "",
          })
        }
      />

      <ActivityDropdown
        category={form.category}
        activityType={form.activityType}
        activityOptions={activityOptions}
        onActivityChange={(activity) =>
          setForm({
            ...form,
            activityType: activity,
          })
        }
      />

      <QuantityInput
        quantity={form.quantity}
        unit={units[form.activityType]}
        onQuantityChange={(value) =>
          setForm({
            ...form,
            quantity: value,
          })
        }
      />

      {/* Date */}

      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Date
        </label>

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
          className="w-full rounded-xl border p-4 shadow-sm focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Notes */}

      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Notes
        </label>

        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
          placeholder="Add any notes..."
          className="w-full rounded-xl border p-4 shadow-sm focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white py-4 font-semibold transition-all"
      >
        Save Activity
      </button>

    </form>
  );
}

export default ActivityForm;