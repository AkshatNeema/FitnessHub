// import React, { useState } from "react";

// const BMICalculator = () => {
//   const [weight, setWeight] = useState("");
//   const [height, setHeight] = useState("");
//   const [bmi, setBmi] = useState(null);
//   const [category, setCategory] = useState("");

//   const calculateBMI = () => {
//     if (!weight || !height) return;
//     const heightInMeters = height / 100;
//     const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
//     setBmi(bmiValue);

//     if (bmiValue < 18.5) setCategory("Underweight");
//     else if (bmiValue < 24.9) setCategory("Normal");
//     else if (bmiValue < 29.9) setCategory("Overweight");
//     else setCategory("Obese");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-green-700 mb-6">BMI Calculator</h2>
        
//         <div className="mb-4">
//           <label className="block mb-1 text-gray-700">Weight (kg):</label>
//           <input
//             type="number"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 text-gray-700">Height (cm):</label>
//           <input
//             type="number"
//             value={height}
//             onChange={(e) => setHeight(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>

//         <button
//           onClick={calculateBMI}
//           className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
//         >
//           Calculate
//         </button>

//         {bmi && (
//           <div className="mt-6 text-center">
//             <p className="text-xl">Your BMI is: <span className="font-semibold">{bmi}</span></p>
//             <p className="text-lg text-green-700">{category}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BMICalculator;

import React, { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [heightCm, setHeightCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    let heightInMeters;

    if (heightUnit === "cm") {
      heightInMeters = heightCm / 100;
    } else {
      const totalInches = Number(feet) * 12 + Number(inches);
      heightInMeters = totalInches * 0.0254;
    }

    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 24.9) setCategory("Normal");
    else if (bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          BMI Calculator
        </h2>

        {/* Weight Input */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Height Unit Toggle */}
        <div className="mb-4 flex gap-4 items-center">
        <span className="text-gray-800 font-medium">Height Unit:</span>
            <label className="inline-flex items-center text-gray-700">
            <input
              type="radio"
              value="cm"
              checked={heightUnit === "cm"}
              onChange={() => setHeightUnit("cm")}
              className="mr-1"
            />
            cm
          </label>
            <label className="inline-flex items-center text-gray-700">
            <input
              type="radio"
              value="ft"
              checked={heightUnit === "ft"}
              onChange={() => setHeightUnit("ft")}
              className="mr-1"
            />
            ft/in
          </label>
        </div>

        {/* Height Input Based on Unit */}
        {heightUnit === "cm" ? (
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Height (cm):</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ) : (
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-gray-700">Feet:</label>
              <input
                type="number"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-gray-700">Inches:</label>
              <input
                type="number"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={calculateBMI}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Calculate
        </button>

        {/* Result */}
        {bmi && (
          <div className="mt-6 text-center">
            <p className="text-xl">
              Your BMI is: <span className="font-semibold">{bmi}</span>
            </p>
            <p className="text-lg text-green-700">{category}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;

