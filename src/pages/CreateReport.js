import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles for react-datepicker
import "./CreateReport.css";

const CreateReport = () => {
  const [language, setLanguage] = useState("language"); // State for language
  const [startDate, setStartDate] = useState(null); // Start Date state
  const [endDate, setEndDate] = useState(null); // End Date state
  const [operation, setOperation] = useState("operation"); // State for frequency
  const [name, setName] = useState(""); // State for report name
  const [selectedKPIs, setSelectedKPIs] = useState([]); // State for selected KPIs
  const [loadingKPIs, setLoadingKPIs] = useState(false); // State for loading status KPIS
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error messages
  const [kpis, setKpis] = useState([]); // State for KPIs options to show to user

  // Fetch KPIs data from API
  useEffect(() => {
    const fetchKPIs = async () => {
      setLoadingKPIs(true);
      setError(null);

      try {
        const myHeaders = new Headers();
        //After Bearer put user token
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiRkZNIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NtYXJ0YXBwLTlmMjg3IiwiYXVkIjoic21hcnRhcHAtOWYyODciLCJhdXRoX3RpbWUiOjE3MzM1MDczNjgsInVzZXJfaWQiOiJ4TTJrZWE4YWthT0t2WXRhMjZOTUZCeThZbkozIiwic3ViIjoieE0ya2VhOGFrYU9Ldll0YTI2Tk1GQnk4WW5KMyIsImlhdCI6MTczMzUwNzM2OCwiZXhwIjoxNzMzNTEwOTY4LCJlbWFpbCI6ImZmbUBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJmZm1AZXhhbXBsZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.urqTWnDQsLCwcTBc2NhmVtEquZ0NouQ_h-bpZeL2ra002a4sgw1Jkw5HZW9YsnqhbmfRakq34oeXqsdQJqu-CCPH3buEA5t1qcxxWVAVamSo38Qs_H-r5sFc1HFsc6-Jizh_MwFIYSiaP0rOMRk9hxJB8py0uWxsxaIfHHo9VkgSMrG_FAyS4tMUXgGzWYzxamkW4GXUj7nos990Koxp6UwKzehDsdmNxt5KulX1XjYbyeBwF8sXSiveslBO0zFtYcfok90deaxMo1kjR5kxphCNZrlJ7I7uX97WgQiB0iDya88c121QOXewqnJujxewq1JQKYNdsoDl7gteoc8TTg");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          "https://api-656930476914.europe-west1.run.app/api/v1.0/kpi/?site=1",
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Failed to fetch KPIs");
        }

        const data = await response.json();
        setKpis(data.data); // the .data is an array of objects
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingKPIs(false);
      }
    };

    fetchKPIs();
  }, []);

  // Handle name input change
  const handleNameChange = (newName) => {
    setName(newName);
  };

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Handle operation change
  const handleOperationChange = (newOperation) => {
    setOperation(newOperation);
  };

  // Handle KPIs selection change (multi-select)
  const handleKPIChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedKPIs(selectedValues);
  };

  // Handle download button click
  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const myHeaders = new Headers();
      //After Bearer put user token
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiRkZNIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NtYXJ0YXBwLTlmMjg3IiwiYXVkIjoic21hcnRhcHAtOWYyODciLCJhdXRoX3RpbWUiOjE3MzM1MDczNjgsInVzZXJfaWQiOiJ4TTJrZWE4YWthT0t2WXRhMjZOTUZCeThZbkozIiwic3ViIjoieE0ya2VhOGFrYU9Ldll0YTI2Tk1GQnk4WW5KMyIsImlhdCI6MTczMzUwNzM2OCwiZXhwIjoxNzMzNTEwOTY4LCJlbWFpbCI6ImZmbUBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJmZm1AZXhhbXBsZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.urqTWnDQsLCwcTBc2NhmVtEquZ0NouQ_h-bpZeL2ra002a4sgw1Jkw5HZW9YsnqhbmfRakq34oeXqsdQJqu-CCPH3buEA5t1qcxxWVAVamSo38Qs_H-r5sFc1HFsc6-Jizh_MwFIYSiaP0rOMRk9hxJB8py0uWxsxaIfHHo9VkgSMrG_FAyS4tMUXgGzWYzxamkW4GXUj7nos990Koxp6UwKzehDsdmNxt5KulX1XjYbyeBwF8sXSiveslBO0zFtYcfok90deaxMo1kjR5kxphCNZrlJ7I7uX97WgQiB0iDya88c121QOXewqnJujxewq1JQKYNdsoDl7gteoc8TTg");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        "https://api-656930476914.europe-west1.run.app/api/v1.0/report/?name=bla&site=1&start_date=2024-09-30%2000%3A00%3A00&end_date=2024-10-14%2000%3A00%3A00&operation=avg",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to create");
      }

      const data = await response.json();

      if (data?.data) {
        const link = document.createElement("a");
        link.href = data.data;
        link.download = name || "report"; // If user doesn't provide a name, default to report
        console.log(data.data);
        link.click();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-report-container">
      {/* Name Input */}
      <div className="name-input-container">
        <label htmlFor="report-name" className="name-label">
          Name
        </label>
        <input
          id="report-name"
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Enter report name"
          className="name-input"
        />
      </div>

      {/* Language Dropdown */}
      <div className="dropdown-container">
        <label htmlFor="language" className="dropdown-label">
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="dropdown-select"
        >
          <option value="" disabled>
            Select Language
          </option>
          <option value="ita">Italian</option>
          <option value="eng">English</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* Date Pickers */}
      <div className="date-picker-container">
        <label htmlFor="start-date" className="date-label">
          Start Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy/MM/dd"
          className="date-picker"
          placeholderText="Select Start Date"
        />
      </div>

      <div className="date-picker-container">
        <label htmlFor="end-date" className="date-label">
          End Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy/MM/dd"
          className="date-picker"
          placeholderText="Select End Date"
        />
      </div>

      {/* Operation Dropdown */}
      <div className="dropdown-container">
        <label htmlFor="operation" className="dropdown-label">
          Aggregation Operation
        </label>
        <select
          id="operation"
          value={operation}
          onChange={(e) => handleOperationChange(e.target.value)}
          className="dropdown-select"
        >
          <option value="" disabled>
            Select Operation
          </option>
          <option value="avg">Average</option>
          <option value="min">Min</option>
          <option value="max">Max</option>
          <option value="sum">Summary</option>
        </select>
      </div>

      {/* Select KPIs Dropdown (Multi-choice) */}
      <div className="dropdown-container">
        <label htmlFor="kpis" className="dropdown-label">
          Select KPIs
        </label>
        <select
          id="kpis"
          multiple
          value={selectedKPIs}
          onChange={handleKPIChange}
          className="dropdown-select"
        >
          {loadingKPIs && <option>Loading KPIs...</option>} {/* Loading state */}
          {error && <option>Error loading KPIs</option>} {/* Error state */}
          {!loadingKPIs &&
            !error &&
            kpis.map((kpi) => (
              <option key={kpi.id} value={kpi.id}>
                {kpi.name}
              </option>
            ))}
        </select>
        <small>Press ctrl to select multiple</small>
      </div>

      {/* Download Button */}
      <div className="button-container">
        <button
          onClick={handleDownload}
          disabled={loading}
          className="generate-report-button"
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default CreateReport;
