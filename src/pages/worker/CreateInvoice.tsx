import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // Changed from default import to named import

interface Employer {
  id: number;
  name: string;
  company: string;
}

// Sample employers data - in a real app, this would come from an API
const employers: Employer[] = [
  { id: 1, name: "John Smith", company: "Tech Corp" },
  { id: 2, name: "Sarah Johnson", company: "Digital Solutions" },
  { id: 3, name: "Mike Wilson", company: "Innovation Labs" },
];

interface InvoiceFormData {
  employerId: number;
  description: string;
  hours: number;
  rate: number;
  date: string;
  additionalNotes?: string;
}

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "review">("form");
  const [formData, setFormData] = useState<InvoiceFormData>({
    employerId: 0,
    description: "",
    hours: 0,
    rate: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("review");
  };

  const handleConfirm = async () => {
    // Here you would typically send the data to your backend
    // For now, we'll just simulate success and redirect
    navigate("/dashboard");
  };

  const selectedEmployer = employers.find(
    (emp) => emp.id === formData.employerId
  );
  const totalAmount = formData.hours * formData.rate;

  if (step === "review") {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Review Invoice
            </h3>

            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Employer
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {selectedEmployer?.company}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formData.description}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Hours
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formData.hours}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Rate
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    ${formData.rate}/hr
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Total Amount
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    ${totalAmount.toLocaleString()}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Date
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formData.date}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6">
              <div className="flex justify-center">
                <QRCodeSVG
                  value={JSON.stringify({
                    invoiceId: Date.now(),
                    employer: selectedEmployer?.company,
                    amount: totalAmount,
                    date: formData.date,
                  })}
                  size={200}
                  level="H"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 text-center">
                This QR code contains your invoice details and will be used for
                payment verification
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => setStep("form")}
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Submit Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <form onSubmit={handleSubmit} className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Create New Invoice
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="employer"
                className="block text-sm font-medium text-gray-700"
              >
                Employer
              </label>
              <select
                id="employer"
                name="employer"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.employerId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employerId: Number(e.target.value),
                  })
                }
                required
              >
                <option value="">Select an employer</option>
                {employers.map((employer) => (
                  <option key={employer.id} value={employer.id}>
                    {employer.company}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="hours"
                className="block text-sm font-medium text-gray-700"
              >
                Hours Worked
              </label>
              <input
                type="number"
                name="hours"
                id="hours"
                min="0"
                step="0.5"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.hours}
                onChange={(e) =>
                  setFormData({ ...formData, hours: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="rate"
                className="block text-sm font-medium text-gray-700"
              >
                Hourly Rate ($)
              </label>
              <input
                type="number"
                name="rate"
                id="rate"
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.rate}
                onChange={(e) =>
                  setFormData({ ...formData, rate: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Invoice Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.additionalNotes}
                onChange={(e) =>
                  setFormData({ ...formData, additionalNotes: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Review Invoice
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
