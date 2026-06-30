export default function Stepper({ steps, activeStep }) {
  return (
    <div className="w-48 flex flex-col gap-2 pt-10">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        return (
          <div key={step.id} className="flex gap-3 space-y-14">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0
                ${isCompleted ? "bg-green-500 text-white" : ""}
                ${isActive ? "bg-brand text-white" : ""}
                ${!isCompleted && !isActive ? "bg-gray-100 text-gray-400" : ""}
              `}
            >
              {isCompleted ? "✓" : step.id}
            </div>

            <span
              className={`text-sm mt-1.5 ${
                isActive ? "text-brand font-medium" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
