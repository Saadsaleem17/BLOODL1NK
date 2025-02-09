import React, { useEffect, useState } from "react";
import axios from "axios";

export function FindDonor() {
  type Donor = {
  _id: string;
  firstName: string;
  lastName: string;
  bloodGroup: string;
  city: string;
  age: number;
  phone: string;
};

const [donors, setDonors] = useState<Donor[]>([]);


  const [filters, setFilters] = useState({ bloodGroup: "" });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/donors", {
      params: { bloodGroup: filters.bloodGroup } // Only sending blood group
    });
    setDonors(response.data);
  } catch (error) {
    console.error("Error fetching donors:", error);
  }
};

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredDonors = donors.filter((donor) => {
    return (
      (filters.bloodGroup === "" || donor.bloodGroup === filters.bloodGroup)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Find a Donor</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          name="bloodGroup"
          className="p-2 border rounded"
          value={filters.bloodGroup}
          onChange={handleFilterChange}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      {/* Donor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{donor.firstName} {donor.lastName}</h3>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>City:</strong> {donor.city}</p>
              <p><strong>Age:</strong> {donor.age}</p>
              <p><strong>Phone:</strong> {donor.phone}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No matching donors found.</p>
        )}
      </div>
    </div>
  );
}
