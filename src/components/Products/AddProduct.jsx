"use client";

import { useEffect, useState } from "react";
import Stepper from "./Stepper";
import Overview from "./Overview";
import Pricing from "./Pricing";
import ProductTag from "./ProductTag";
import BasicInfo from "./BasicInfo";

const STEPS = [
  { id: 1, label: "Basic Info", component: BasicInfo },
  { id: 2, label: "Product Tags", component: ProductTag },
  { id: 3, label: "Pricing", component: Pricing },
  { id: 4, label: "Overview", component: Overview },
];

export default function AddProduct({ productDetails, isLoading }) {
  const isEditMode = !!productDetails?.id;

  const [activeStep, setActiveStep] = useState(0);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    setProductData(productDetails);
  }, [productDetails]);

  const updateProductData = (newData) => {
    setProductData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = (stepData) => {
    updateProductData(stepData);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  if (isEditMode && isLoading) {
    return (
      <div className="p-10 text-center">Loading from add product data...</div>
    );
  }

  const ActiveComponent = STEPS[activeStep].component;

  return (
    <>
      <div className="flex gap-6">
        <Stepper steps={STEPS} activeStep={activeStep} />

        <div className="flex-1">
          <ActiveComponent
            defaultValues={productData}
            onNext={handleNext}
            onBack={activeStep > 0 ? handleBack : null}
            isLastStep={activeStep === STEPS.length - 1}
            allData={productData}
            isEditMode={isEditMode}
            productId={productDetails?.id}
          />
        </div>
      </div>
    </>
  );
}
