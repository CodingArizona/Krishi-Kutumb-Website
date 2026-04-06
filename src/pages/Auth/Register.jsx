import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Phone, MapPin, Loader2, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routeConfig";
import { validateForm } from "../../utils/validators";
import {
  getStateDistrictList,
  getVillageList,
} from "../../services/api/authApi";
import Header from "../../components/Common/Header";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobileNumber || "";

  const { register, isLoading, error, clearError } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: mobile,
    state: "",
    district: "",
    tehsil: "",
    village: "",
    latitude: "",
    longitude: "",
  });
  const [errors, setErrors] = useState({});

  const [stateDistrictList, setStateDistrictList] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const [loadingSD, setLoadingSD] = useState(false);
  const [loadingVillage, setLoadingVillage] = useState(false);

  const stateOptions = [
    ...new Set(stateDistrictList.map((i) => i.state)),
  ].filter(Boolean);
  const districtOptions = stateDistrictList
    .filter((i) => i.state === form.state)
    .map((i) => i.district)
    .filter(Boolean);
  const tehsilOptions = [...new Set(villageList.map((i) => i.tehsil))].filter(
    Boolean,
  );
  const villageOptions = villageList.filter((i) => i.tehsil === form.tehsil);

  useEffect(() => {
    setLoadingSD(true);
    getStateDistrictList()
      .then((data) => setStateDistrictList(data))
      .catch(() => {})
      .finally(() => setLoadingSD(false));
  }, []);

  useEffect(() => {
    if (!form.state || !form.district) return;
    setVillageList([]);
    setForm((p) => ({
      ...p,
      tehsil: "",
      village: "",
      latitude: "",
      longitude: "",
    }));
    setLoadingVillage(true);
    getVillageList(form.state, form.district)
      .then((data) => setVillageList(data))
      .catch(() => {})
      .finally(() => setLoadingVillage(false));
  }, [form.state, form.district]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
    if (error) clearError();
  };

  const handleStateSelect = (state) => {
    setVillageList([]);
    setForm((p) => ({
      ...p,
      state,
      district: "",
      tehsil: "",
      village: "",
      latitude: "",
      longitude: "",
    }));
  };

  const handleDistrictSelect = (district) => {
    setForm((p) => ({
      ...p,
      district,
      tehsil: "",
      village: "",
      latitude: "",
      longitude: "",
    }));
  };

  const handleTehsilSelect = (tehsil) => {
    setForm((p) => ({
      ...p,
      tehsil,
      village: "",
      latitude: "",
      longitude: "",
    }));
  };

  const handleVillageSelect = (villageName) => {
    const found = villageList.find((v) => v.village === villageName);
    if (!found) return;
    setForm((p) => ({
      ...p,
      village: found.village,
      tehsil: found.tehsil,
      latitude: found.latitude,
      longitude: found.longitude,
    }));
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "");
    handleChange("firstName", value.charAt(0).toUpperCase() + value.slice(1));
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "");
    handleChange("lastName", value.charAt(0).toUpperCase() + value.slice(1));
  };

  const handleSubmit = async () => {
    const { errors: formErrors, isValid } = validateForm({
      firstName: form.firstName,
      lastName: form.lastName,
    });
    if (!isValid) {
      setErrors(formErrors);
      return;
    }
    await register({ ...form, mobileNumber: mobile });
  };

  // ── Fixed LocationField ───────────────────────────────────────────────────
  const LocationField = ({
    label,
    field,
    value,
    onSelect,
    options,
    disabled,
    loading,
    placeholder,
  }) => {
    const [search, setSearch] = useState("");
    const [showDrop, setShowDrop] = useState(false);

    // Jab bahar se value set ho (select), input mein reflect karo
    useEffect(() => {
      setSearch(value || "");
    }, [value]);

    const filtered = search
      ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
      : options;

    const handleSelect = (opt) => {
      onSelect(opt);
      setSearch(opt);
      setShowDrop(false);
    };

    const handleClear = () => {
      onSelect("");
      setSearch("");
    };

    return (
      <div className="relative">
        <label className="text-sm font-semibold text-gray-700 block mb-1.5">
          {label}
        </label>
        <div className="relative">
          <div
            className={`flex gap-2 border-2 rounded-xl overflow-hidden transition-colors
            ${disabled ? "border-gray-200 bg-gray-50" : "border-gray-200 focus-within:border-green-500"}`}
          >
            <div className="flex items-center bg-gray-50 px-3 py-2.5 border-r border-gray-200">
              {loading ? (
                <Loader2 className="w-4 h-4 text-green-400 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 text-green-400" />
              )}
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDrop(true);
              }}
              onFocus={() => setShowDrop(true)}
              onBlur={() =>
                setTimeout(() => setShowDrop(false), 150)
              }
              placeholder={loading ? "Loading..." : placeholder}
              disabled={disabled || loading}
              className="flex-1 px-3 py-2.5 outline-none text-sm font-semibold text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed bg-transparent"
            />
            {value && !disabled && (
              <button
                onClick={handleClear}
                className="pr-3 flex items-center"
              >
                <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          {showDrop && filtered.length > 0 && !disabled && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-green-200 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
              {filtered.map((opt) => (
                <button
                  key={opt}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(opt);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-green-50 text-sm text-gray-700 border-b last:border-b-0"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors[field] && (
          <p className="text-red-400 text-xs font-semibold mt-1">
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-hidden px-4 pb-5 pt-3">
        <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col max-w-lg mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 pt-4 pb-4 flex-shrink-0 rounded-t-2xl">
            <h2 className="text-base font-bold text-white text-center w-full">
              Complete Your Profile
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                First Name <span className="text-red-400">*</span>
              </label>
              <div
                className={`flex gap-2 border-2 rounded-xl overflow-hidden focus-within:border-green-500 transition-colors ${errors.firstName ? "border-red-400" : "border-gray-200"}`}
              >
                <div className="flex items-center bg-gray-50 px-4 py-2.5 border-r border-gray-200">
                  <User className="w-4 h-4 text-green-400" />
                </div>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={handleFirstNameChange}
                  placeholder="Ramesh"
                  className="flex-1 px-4 py-2.5 outline-none text-base font-semibold text-gray-800 placeholder-gray-400"
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                Last Name <span className="text-red-400">*</span>
              </label>
              <div
                className={`flex gap-2 border-2 rounded-xl overflow-hidden focus-within:border-green-500 transition-colors ${errors.lastName ? "border-red-400" : "border-gray-200"}`}
              >
                <div className="flex items-center bg-gray-50 px-4 py-2.5 border-r border-gray-200">
                  <User className="w-4 h-4 text-green-400" />
                </div>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={handleLastNameChange}
                  placeholder="Sharma"
                  className="flex-1 px-4 py-2.5 outline-none text-base font-semibold text-gray-800 placeholder-gray-400"
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                Mobile Number
              </label>
              <div className="flex gap-2 border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                <div className="flex items-center bg-gray-200 px-4 py-2.5 border-r border-gray-200">
                  <Phone className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={`+91 ${mobile}`}
                  readOnly
                  className="flex-1 px-4 py-2.5 outline-none text-base font-semibold text-gray-400 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <MapPin className="w-4 h-4 text-green-500" />
              <h3 className="text-base font-bold text-gray-800">
                Location Details
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <LocationField
                label="State"
                field="state"
                value={form.state}
                onSelect={handleStateSelect}
                options={stateOptions}
                loading={loadingSD}
                placeholder="Select State"
              />
              <LocationField
                label="District"
                field="district"
                value={form.district}
                onSelect={handleDistrictSelect}
                options={districtOptions}
                disabled={!form.state}
                placeholder="Select District"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <LocationField
                label="Tehsil"
                field="tehsil"
                value={form.tehsil}
                onSelect={handleTehsilSelect}
                options={tehsilOptions}
                disabled={!form.district}
                loading={loadingVillage}
                placeholder="Select Tehsil"
              />
              <LocationField
                label="Village"
                field="village"
                value={form.village}
                onSelect={handleVillageSelect}
                options={villageOptions.map((v) => v.village)}
                disabled={!form.tehsil}
                placeholder="Select Village"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading || !form.firstName || !form.lastName}
              className="w-full py-3 rounded-xl font-bold text-white text-base transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Create Profile"
              )}
            </button>
            <div className="h-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;