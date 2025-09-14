import React from "react";
import { useForm } from "react-hook-form";
import { Edit3, User, Mail, Phone } from "lucide-react"; // assuming you're using lucide-react icons

function UserInformation({ isEditing, setIsEditing, handleSavePersonalInfo, personalInfo }) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: personalInfo, // populate with initial values
  });

  // Sync RHF with external personalInfo when toggling edit
  React.useEffect(() => {
    reset(personalInfo);
  }, [personalInfo, reset, isEditing]);

  const onSubmit = (data) => {
    handleSavePersonalInfo(data);
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif font-light text-[#2c2c2c] mb-2">
            Personal Information
          </h2>
          <p className="text-gray-500">
            Update your personal details and preferences
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#8b5a2b] to-[#a63f3f] text-white rounded-full hover:shadow-lg transition-all duration-200"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-full border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-gradient-to-r from-[#8b5a2b] to-[#a63f3f] text-white rounded-full hover:shadow-lg transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#2c2c2c] mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Basic Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    {...register("firstName")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 focus:border-[#8b5a2b] transition-all"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-[#2c2c2c]">{personalInfo?.firstName}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    {...register("lastName")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 focus:border-[#8b5a2b] transition-all"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-[#2c2c2c]">{personalInfo?.lastName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-1" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 focus:border-[#8b5a2b] transition-all"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="text-[#2c2c2c]">{personalInfo.email}</p>
                </div>
              )}
            </div> */}

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-1" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 focus:border-[#8b5a2b] transition-all"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="text-[#2c2c2c]">{personalInfo.phone}</p>
                </div>
              )}
            </div> */}

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  {...register("birthDate")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 focus:border-[#8b5a2b] transition-all"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="text-[#2c2c2c]">
                    {personalInfo.birthDate
                      ? new Date(personalInfo.birthDate).toLocaleDateString()
                      : ""}
                  </p>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserInformation;
