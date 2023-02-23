import { useState, useEffect } from "react";
import axios from "axios";
import Select, { clearValue, clear, InputActionMeta } from "react-select";

export default function Filterprojects({ setProjects }) {
  const [keyword, setKeyword] = useState("");
  const [locationHelper, setLocationHelper] = useState("remote");
  const [location, setLocation] = useState("");
  const [startDateHelper, setStartDateHelper] = useState("open");
  const [start_date, setStartDate] = useState("");
  const [tech_stack, setTechStack] = useState("");
  const [categories, setCategory] = useState([]);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  const [sortCriteriaCreatedAt, setSortCriteriaCreatedAt] = useState("");
  const [sortCriteriaStartDate, setSortCriteriaStartDate] = useState("");

  // SORTING

  const handleOnChangeSortCriteria = (e) => {
    console.log(e.target.value);
    if (e.target.value === "createdAt: 1") {
      setSortCriteriaCreatedAt(1);
      setSortCriteriaStartDate("");
    }
    if (e.target.value === "createdAt: -1") {
      setSortCriteriaCreatedAt(-1);
      setSortCriteriaStartDate("");
    }
    if (e.target.value === "start_date: 1") {
      setSortCriteriaStartDate(1);
      setSortCriteriaCreatedAt("");
    }
    if (e.target.value === "start_date: -1") {
      setSortCriteriaStartDate(-1);
      setSortCriteriaCreatedAt("");
    }
  };

  const onSubmitSort = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:8080/projects/sort?start_date=${sortCriteriaStartDate}&createdAt=${sortCriteriaCreatedAt}`
      )
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetSort = () => {
    document.getElementById("sortform").reset();
    setSortCriteriaCreatedAt("");
    setSortCriteriaStartDate("");
    window.location.reload();
  };

  // FILTERING

  const handleOnChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleOnChangeLocationHelper = (e) => {
    setLocationHelper(e.target.value);
    setLocation(e.target.value);
  };

  const fetchPlace = async (text) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
      );
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "Unable to retrieve places" };
    }
  };

  const handleCityChange = async (e) => {
    setLocation(e.target.value);
    if (!location) return;

    const res = await fetchPlace(location);
    !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  const handleOnChangeStartDate = (e) => {
    setStartDateHelper(e.target.value);
    setStartDate(e.target.value);
    if (start_date.length > 1 && startDateHelper === "specific date") {
      setStartDate("open");
    } else {
    }
  };

  const handleOnChangeSpecificDate = (e) => {
    setStartDate(`${e.target.value}T00:42:15.714Z`);
  };

  const options = [
    { value: "Games", label: "Games" },
    { value: "Sports", label: "Sports" },
    { value: "Business", label: "Business" },
    { value: "Community", label: "Community" },
    { value: "Social", label: "Social" },
    { value: "Education", label: "Education" },
    { value: "Culture", label: "Culture" },
    { value: "Media", label: "Media" },
    { value: "Nature", label: "Nature" },
    { value: "Technology", label: "Technology" },
  ];

  const onSelectedOptionsChange = (options) => {
    setCategory([].slice.call(options).map((option) => option.value));
  };

  const customStyles = {
    option: (base, state) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
    }),
    menuList: (base, state) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
      borderRadius: "5px",
    }),
    valueContainer: (base, state) => ({
      ...base,
      backgroundColor: "#f8f9fa",
    }),
    menu: (base, state) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      borderRadius: "5px",
    }),
    input: (base, state) => ({
      ...base,
      backgroundColor: "#f8f9fa",
    }),
    clearIndicator: (base, state) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
    }),
    control: (base, state) => ({
      ...base,
      borderRadius: "5px",
    }),
    select: (base, state) => ({
      ...base,
      borderRadius: "5px",
    }),
    indicatorsContainer: (base, state) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
    }),
  };

  const tech_stack_options = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Databases", label: "Databases" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "ExpressJS", label: "ExpressJS" },
    { value: "ReactJS", label: "ReactJS" },
  ];
  const handleOnChangeTechStack = (tech_stack_options) => {
    setTechStack(
      [].slice
        .call(tech_stack_options)
        .map((tech_stack_option) => tech_stack_option.value)
    );
    console.log(tech_stack);
  };

  const resetAllFilter = () => {
    document.getElementById("searchcriteria").reset();
    setKeyword("");
    setLocationHelper("");
    setStartDate("");
    setLocation("");
    setStartDateHelper("");
    setCategory([]);
    setSortCriteriaCreatedAt("");
    setSortCriteriaStartDate("");
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:8080/projects/search?keyword=${keyword}&location=${location}&start_date=${start_date}&categories=${categories}&tech_stack=${tech_stack}`,
        {
          keyword,
          categories,
          location,
          start_date,
          tech_stack,
        }
      )
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSortFiltered = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:8080/projects/search/sort?keyword=${keyword}&location=${location}&start_dateF=${start_date}&categories=${categories}&tech_stack=${tech_stack}&start_date=${sortCriteriaStartDate}&createdAt=${sortCriteriaCreatedAt}`,
        {
          keyword,
          categories,
          location,
          start_date,
          tech_stack,
          sortCriteriaCreatedAt,
          sortCriteriaStartDate,
        }
      )
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>

      <div className="allprojectsfilter">
        <div className="sort bg-light shadow-sm">
          <div className="bg-light d-sm-flex justify-content-between">
            <h5 className="bg-light fw-bold">SORT</h5>
            <button
              className="btn bg-light clear_filter_btn"
              onClick={resetSort}
            >
              Clear
            </button>
          </div>
          <form
            className="sortform bg-light"
            id="sortform"
            onSubmit={onSubmitSort}
          >
            
            <div className="bg-light d-flex m-2 mb-3 column-gap-3">
              <select
                className="form-control bg-light sortcriteria"
                type="select"
                aria-label="sort"
                onChange={handleOnChangeSortCriteria}
              >
                <option value="" className="optionPlaceholder">
                  Sort Projects
                </option>
                <option value="createdAt: 1" className="option">
                  creation date {String.fromCharCode(8593)}
                </option>
                <option value="createdAt: -1" className="option">
                  creation date {String.fromCharCode(8595)}
                </option>
                <option value="start_date: 1" className="option">
                  start date {String.fromCharCode(8593)}
                </option>
                <option value="start_date: -1" className="option">
                start date {String.fromCharCode(8595)}
                </option>
              </select>
              <button className="btn icon_submitbutton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-filter-circle sorticon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className="filter bg-light shadow-sm">
          <div className="bg-light d-sm-flex justify-content-between">
            <h5 className="bg-light fw-bold">FILTER</h5>
            <button
              className=" btn bg-light clear_filter_btn"
              onClick={resetAllFilter}
            >
              Clear
            </button>
          </div>
          <div className="bg-light mt-3">
            <form
              className="filterform bg-light"
              role="search"
              id="searchcriteria"
              onSubmit={handleSubmit}
            >
              Keyword
              <div className="bg-light d-flex m-2 mb-4">
                <input
                  className="form-control bg-light filtercriteria"
                  type="search"
                  placeholder=" Keyword"
                  aria-label="keyword"
                  onChange={handleOnChangeKeyword}
                ></input>
              </div>
              Location
              <div className="bg-light m-2 mb-4 ">
                <select
                  className="form-control bg-light filtercriteria"
                  type="select"
                  placeholder=""
                  aria-label="remote"
                  onChange={handleOnChangeLocationHelper}
                >
                  <option value="" className="option">
                    All
                  </option>
                  <option value="remote" className="option">
                    Remote
                  </option>
                  <option value="onsite" className="option">
                    Onsite
                  </option>
                </select>

                {locationHelper === "onsite" && (
                  <div className="d-flex bg-light mt-2">
                    {autocompleteErr && (
                      <span className="inputError">{autocompleteErr}</span>
                    )}
                    <input
                      className="form-control bg-light filtercriteria"
                      list="places"
                      type="text"
                      name="city"
                      onChange={handleCityChange}
                      pattern={autocompleteCities.join("|")}
                      autoComplete="off"
                      placeholder="City"
                      aria-label="location"
                      required
                    ></input>
                    <datalist id="places">
                      {autocompleteCities.map((city, i) => (
                        <option key={i}>{city}</option>
                      ))}
                    </datalist>
                  </div>
                )}
              </div>
              Start Date
              <div className="bg-light m-2 mb-4 ">
                <select
                  className="form-control bg-light filtercriteria"
                  type="open"
                  aria-label="open"
                  onChange={handleOnChangeStartDate}
                >
                  <option value="" className="option">
                    All
                  </option>
                  <option value="open" className="option">
                    Open
                  </option>
                  <option value="specific date" className="option">
                    Specific Date
                  </option>
                </select>
                {startDateHelper === "specific date" && (
                  <div className="d-flex bg-light mt-2">
                    <input
                      className="form-control bg-light filtercriteria"
                      type="date"
                      placeholder="Start Date"
                      aria-label="start_date"
                      onChange={handleOnChangeSpecificDate}
                      required
                    ></input>
                  </div>
                )}
              </div>
              Category
              <Select
                options={options}
                isMulti
                name="categories"
                className="basic-multi-select m-2 mb-4"
                classNamePrefix="filter_select"
                onChange={onSelectedOptionsChange}
                styles={customStyles}
                isClearable
                isSearchable
                clearValue
              />
              Tech Stack
              <Select
                options={tech_stack_options}
                isMulti
                name="tech_stack"
                className="basic-multi-select m-2 mb-4"
                classNamePrefix="filter_select"
                onChange={handleOnChangeTechStack}
                styles={customStyles}
                isClearable
                isSearchable
                clearValue
              />
              <div className="bg-light d-flex justify-content-between filtercriteria pe-3 ms-2 ">
                <button className="btn submitbutton" type="submit">
                  Filter
                </button>
              </div>
              <div className="bg-light d-flex m-2 mb-4 mt-4 column-gap-3">
                <select
                  className="form-control bg-light filtercriteria"
                  type="select"
                  aria-label="sort"
                  onChange={handleOnChangeSortCriteria}
                >
                  <option value="" className="optionPlaceholder">
                    Sort Search Results
                  </option>
                  <option value="createdAt: 1" className="option">
                    creation date {String.fromCharCode(8593)}
                  </option>
                  <option value="createdAt: -1" className="option">
                    creation date {String.fromCharCode(8595)}
                  </option>
                  <option value="start_date: 1" className="option">
                  start date {String.fromCharCode(8593)}
                  </option>
                  <option value="start_date: -1" className="option">
                  start date {String.fromCharCode(8595)}
                  </option>
                </select>
                <button
                  className="btn icon_submitbutton"
                  onClick={handleSortFiltered}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-filter-circle sorticon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
