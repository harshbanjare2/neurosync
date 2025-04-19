"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AssessmentData,
  Gender,
  DietaryHabit,
  StressLevel,
  YesNoAnswer,
} from "@/types/assessment";

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<AssessmentData>>({
    gender: undefined,
    age: undefined,
    workPressure: undefined,
    jobSatisfaction: 5,
    sleepDuration: 7,
    dietaryHabits: undefined,
    workHoursPerDay: 8,
    financialStressLevel: undefined,
    suicidalThoughts: undefined,
    familyMentalHealthHistory: undefined,
    additionalNotes: "",
  });

  const totalSteps = 4;

  const handleInputChange = (field: keyof AssessmentData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof AssessmentData
  ) => {
    const value = parseInt(e.target.value);
    handleInputChange(field, value);
  };

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof AssessmentData
  ) => {
    const value = e.target.value;
    handleInputChange(field, value);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof AssessmentData
  ) => {
    const value = e.target.value;
    handleInputChange(field, value);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, this would call an API to submit the assessment data
      // For this demo, we'll just simulate a delay and redirect to results
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Save to localStorage for demonstration purposes
      const mockResult = {
        id: String(Date.now()),
        userId: "1",
        date: new Date().toISOString(),
        data: formData as AssessmentData,
        analysis: {
          overallScore: 68,
          stressScore: 72,
          wellbeingScore: 65,
          riskLevel: "moderate" as const,
          keyInsights: [
            "Your work pressure and financial stress are contributing factors to your overall stress level.",
            "Your sleep duration is adequate but could be improved for better mental health.",
            "Job satisfaction is moderate, which is positive for mental well-being.",
          ],
          recommendations: [
            "Consider stress management techniques such as mindfulness or meditation.",
            "Try to maintain regular sleep schedule of 7-8 hours per night.",
            "Seek financial planning resources to help reduce financial stress.",
            "Take regular breaks during work hours to prevent burnout.",
          ],
        },
      };

      const existingResults = JSON.parse(
        localStorage.getItem("assessmentResults") || "[]"
      );
      localStorage.setItem(
        "assessmentResults",
        JSON.stringify([...existingResults, mockResult])
      );

      // Redirect to results page
      router.push(`/dashboard/results/${mockResult.id}`);
    } catch (error) {
      console.error("Error submitting assessment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Mental Health Assessment
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          Complete this assessment to receive personalized insights about your
          mental health
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="neu-flat dark:neu-flat-dark rounded-xl p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "non-binary", label: "Non-binary" },
                      {
                        value: "prefer-not-to-say",
                        label: "Prefer not to say",
                      },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="neu-flat dark:neu-flat-dark rounded-lg"
                      >
                        <label
                          className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
                            formData.gender === option.value
                              ? "neu-pressed dark:neu-pressed-dark"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={option.value}
                            checked={formData.gender === option.value}
                            onChange={(e) => handleRadioChange(e, "gender")}
                            className="sr-only"
                          />
                          <span>{option.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium mb-2"
                  >
                    Age
                  </label>
                  <div className="neu-pressed dark:neu-pressed-dark rounded-lg">
                    <input
                      id="age"
                      type="number"
                      min="1"
                      max="120"
                      value={formData.age || ""}
                      onChange={(e) =>
                        handleInputChange("age", parseInt(e.target.value))
                      }
                      className="w-full p-3 bg-transparent border-none focus:ring-0"
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Work-related info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Work Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Work Pressure Level
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {[
                      { value: "none", label: "None" },
                      { value: "low", label: "Low" },
                      { value: "moderate", label: "Moderate" },
                      { value: "high", label: "High" },
                      { value: "extreme", label: "Extreme" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="neu-flat dark:neu-flat-dark rounded-lg"
                      >
                        <label
                          className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
                            formData.workPressure === option.value
                              ? "neu-pressed dark:neu-pressed-dark"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="workPressure"
                            value={option.value}
                            checked={formData.workPressure === option.value}
                            onChange={(e) =>
                              handleRadioChange(e, "workPressure")
                            }
                            className="sr-only"
                          />
                          <span>{option.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Satisfaction (1-10)
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Low</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.jobSatisfaction || 5}
                      onChange={(e) => handleSliderChange(e, "jobSatisfaction")}
                      className="flex-1 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none"
                    />
                    <span className="text-sm">High</span>
                    <span className="w-8 text-center font-medium">
                      {formData.jobSatisfaction}
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="workHours"
                    className="block text-sm font-medium mb-2"
                  >
                    Work Hours Per Day
                  </label>
                  <div className="neu-pressed dark:neu-pressed-dark rounded-lg">
                    <input
                      id="workHours"
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      value={formData.workHoursPerDay || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "workHoursPerDay",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full p-3 bg-transparent border-none focus:ring-0"
                      placeholder="Hours per day"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Lifestyle */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">
                Lifestyle Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="sleepDuration"
                    className="block text-sm font-medium mb-2"
                  >
                    Average Sleep Duration (hours per night)
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">4h</span>
                    <input
                      type="range"
                      min="4"
                      max="12"
                      step="0.5"
                      value={formData.sleepDuration || 7}
                      onChange={(e) => handleSliderChange(e, "sleepDuration")}
                      className="flex-1 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none"
                    />
                    <span className="text-sm">12h</span>
                    <span className="w-8 text-center font-medium">
                      {formData.sleepDuration}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Dietary Habits
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: "very-healthy", label: "Very Healthy" },
                      { value: "mostly-healthy", label: "Mostly Healthy" },
                      { value: "average", label: "Average" },
                      { value: "unhealthy", label: "Unhealthy" },
                      { value: "very-unhealthy", label: "Very Unhealthy" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="neu-flat dark:neu-flat-dark rounded-lg"
                      >
                        <label
                          className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
                            formData.dietaryHabits === option.value
                              ? "neu-pressed dark:neu-pressed-dark"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="dietaryHabits"
                            value={option.value}
                            checked={formData.dietaryHabits === option.value}
                            onChange={(e) =>
                              handleRadioChange(e, "dietaryHabits")
                            }
                            className="sr-only"
                          />
                          <span>{option.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Financial Stress Level
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {[
                      { value: "none", label: "None" },
                      { value: "low", label: "Low" },
                      { value: "moderate", label: "Moderate" },
                      { value: "high", label: "High" },
                      { value: "extreme", label: "Extreme" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="neu-flat dark:neu-flat-dark rounded-lg"
                      >
                        <label
                          className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
                            formData.financialStressLevel === option.value
                              ? "neu-pressed dark:neu-pressed-dark"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="financialStressLevel"
                            value={option.value}
                            checked={
                              formData.financialStressLevel === option.value
                            }
                            onChange={(e) =>
                              handleRadioChange(e, "financialStressLevel")
                            }
                            className="sr-only"
                          />
                          <span>{option.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Mental Health History */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">
                Mental Health Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-4">
                    Have you ever had suicidal thoughts?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      {
                        value: "prefer-not-to-say",
                        label: "Prefer not to say",
                      },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="neu-flat dark:neu-flat-dark rounded-lg"
                      >
                        <label
                          className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
                            formData.suicidalThoughts === option.value
                              ? "neu-pressed dark:neu-pressed-dark"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="suicidalThoughts"
                            value={option.value}
                            checked={formData.suicidalThoughts === option.value}
                            onChange={(e) =>
                              handleRadioChange(e, "suicidalThoughts")
                            }
                            className="sr-only"
                          />
                          <span>{option.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">
                    This information is kept strictly confidential and is used
                    only for assessment purposes.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4">
                    Is there a family history of mental illness?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      {
                        value: "prefer-not-to-say",
                        label: "Prefer not to say",
                      },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="neu-flat dark:neu-flat-dark rounded-lg"
                      >
                        <label
                          className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
                            formData.familyMentalHealthHistory === option.value
                              ? "neu-pressed dark:neu-pressed-dark"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="familyMentalHealthHistory"
                            value={option.value}
                            checked={
                              formData.familyMentalHealthHistory ===
                              option.value
                            }
                            onChange={(e) =>
                              handleRadioChange(e, "familyMentalHealthHistory")
                            }
                            className="sr-only"
                          />
                          <span>{option.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="additionalNotes"
                    className="block text-sm font-medium mb-2"
                  >
                    Additional Notes (Optional)
                  </label>
                  <div className="neu-pressed dark:neu-pressed-dark rounded-lg">
                    <textarea
                      id="additionalNotes"
                      value={formData.additionalNotes || ""}
                      onChange={(e) => handleTextChange(e, "additionalNotes")}
                      className="w-full p-3 bg-transparent border-none focus:ring-0 min-h-[100px]"
                      placeholder="Share any additional information that might be relevant..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="skeu-btn dark:skeu-btn-dark px-6 py-3 rounded-lg text-neutral-700 dark:text-neutral-200 disabled:opacity-50"
            >
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="skeu-btn dark:skeu-btn-dark px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="skeu-btn dark:skeu-btn-dark px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-70"
              >
                {loading ? "Processing..." : "Submit Assessment"}
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-8 text-sm text-neutral-500 text-center">
        <p>
          Need help? If you&apos;re in crisis, please call the National Suicide
          Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis
          Text Line.
        </p>
      </div>
    </div>
  );
}
