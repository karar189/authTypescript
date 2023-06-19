import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [multiFiles, setMultiFiles] = useState<File[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform validation checks for each step before proceeding to the next step or submitting the form

    if (step === 1) {
      if (!name || !email || !phone) {
        // Handle validation error for Step 1
        return;
      }
    }

    if (step === 2) {
      if (
        !addressLine1 ||
        !addressLine2 ||
        !city ||
        !state ||
        !pincode ||
        !country
      ) {
        // Handle validation error for Step 2
        return;
      }
    }

    if (step === 3) {
      if (!file) {
        // Handle validation error for Step 3
        return;
      }
    }

    if (step === 4) {
      if (multiFiles.length === 0 || !geolocationStatus) {
        // Handle validation error for Step 4
        return;
      }
    }

    if (step === 5) {
      setIsFormSubmitted(true);
      alert("YAYYYY FORM SUBMITTED !!");

      navigate("/");
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const [geolocationStatus, setGeolocationStatus] = useState("");
  const [locationAddress, setLocationAddress] = useState("");

  useEffect(() => {
    // Function to handle geolocation success
    const handleGeolocationSuccess = async (position: {
      coords: { latitude: any; longitude: any };
    }) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      setGeolocationStatus("Geolocation successful.");

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
            import.meta.env.MAP_API_KEY
          }`
        );
        const data = await response.json();
        console.log(data);

        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setLocationAddress(address);
        } else {
          setLocationAddress("not found");
        }
      } catch (error) {
        setLocationAddress("Error retrieving address.");
        console.error(error);
      }
    };

    // Function to handle geolocation error
    const handleGeolocationError = (error: { message: string }) => {
      setGeolocationStatus("Geolocation error: " + error.message);
    };

    // Check for geolocation support
    if ("geolocation" in navigator) {
      // Request geolocation access
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    } else {
      setGeolocationStatus("Geolocation not supported.");
    }
  }, []);

  return (
    <div className="container mx-auto ">
      <div className="max-w-md mx-auto mt-8 p-4 bg-transparent shadow bg-white bg-opacity-40 rounded-2xl">
        <div className="flex items-center mb-2">
          <ul className="steps mb-6">
            <li className={`step ${step >= 1 ? "step-primary" : ""}`}>
              Basic Details
            </li>
            <li className={`step ${step >= 2 ? "step-primary" : ""}`}>
              Address
            </li>
            <li className={`step ${step >= 3 ? "step-primary" : ""}`}>
              File Upload
            </li>
            <li className={`step ${step >= 4 ? "step-primary" : ""}`}>
              Multi File Upload
            </li>
            <li className={`step ${step >= 5 ? "step-primary" : ""}`}>
              Status
            </li>
          </ul>
        </div>
        {isFormSubmitted ? (
          <p className="text-green-500 text-center">
            Form submitted successfully!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <h2 className="text-lg font-bold mb-4">
                  Step 1: Basic Details
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium "
                  >
                    Phone
                  </label>

                  <PhoneInput
                    type="tel"
                    id="phone"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter phone number"
                    required
                    value={phone}
                    onChange={(value) => setPhone(value ? value : "")}
                    style={{
                      height: "100%",
                      backgroundColor: "white",
                      outline: "transparent",
                    }}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-lg font-bold mb-4">Step 2: Address</h2>

                <div className="mb-4">
                  <label
                    htmlFor="addressLine1"
                    className="block mb-2 text-sm font-medium "
                  >
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    className="w-full p-2 border rounded-md"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="addressLine2"
                    className="block mb-2 text-sm font-medium "
                  >
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    className="w-full p-2 border rounded-md"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  {" "}
                  <div className="mb-4">
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium "
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-[96%] p-2 border rounded-md"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="state"
                      className="block mb-2 text-sm font-medium "
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full p-2 border rounded-md"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="mb-4">
                    <label
                      htmlFor="pincode"
                      className="block mb-2 text-sm font-medium "
                    >
                      Pincode
                    </label>
                    <input
                      type="number"
                      id="pincode"
                      className="w-[96%] p-2 border rounded-md"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="country"
                      className="block mb-2 text-sm font-medium "
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="w-full p-2 border rounded-md"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-lg font-bold mb-4">Step 3: File Upload</h2>
                <div className="mb-4">
                  <label
                    htmlFor="file"
                    className="block mb-2 text-sm font-medium "
                  >
                    File (PNG or PDF)
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept=".png,.pdf"
                    onChange={(e) => {
                      const selectedFile = e.target.files && e.target.files[0];
                      if (selectedFile && selectedFile.size <= 1024 * 1024) {
                        setFile(selectedFile);
                      } else {
                        setFile(null);
                        toast("Please select a file of maximum size 1 MB.");
                      }
                    }}
                    required
                  />
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                  />

                  <ToastContainer />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-lg font-bold mb-4">
                  Step 4: Multi File Upload
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="multiFiles"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Files (PNG or PDF, max 5 files)
                  </label>
                  <input
                    type="file"
                    id="multiFiles"
                    accept=".png,.pdf"
                    multiple
                    onChange={(e) => {
                      const selectedFiles = e.target.files;
                      if (selectedFiles && selectedFiles.length > 5) {
                        e.target.value = ""; // Clear the selected files
                        setMultiFiles([]);
                        toast.error("Please select a maximum of 5 files.");
                      } else {
                        setMultiFiles(
                          selectedFiles ? Array.from(selectedFiles) : []
                        );
                      }
                    }}
                    required
                  />

                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  {/* Same as */}
                  <ToastContainer />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="geolocationStatus"
                    className="block mb-2 text-sm font-medium"
                  >
                    Geolocation Status
                  </label>
                  <p>{geolocationStatus}</p>
                  {locationAddress && (
                    <p className="text-sm text-gray-500 mt-2">
                      Location Address: {locationAddress}
                    </p>
                  )}
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h2 className="text-lg font-bold mb-4">Step 5: Status</h2>
                <p className="text-center">
                  {isFormSubmitted
                    ? "Form submitted successfully! 🎉"
                    : "Form not submitted yet."}
                </p>
              </>
            )}

            <div className="flex justify-between mt-8">
              {step !== 1 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}
              {step < 5 ? (
                <button type="submit" className="btn btn-primary">
                  Next
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
