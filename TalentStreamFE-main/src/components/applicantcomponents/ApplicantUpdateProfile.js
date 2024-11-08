import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiUrl } from '../../services/ApplicantAPIService';
import { useUserContext } from '../common/UserProvider';
 
function ApplicantUpdateProfile() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user1 = useUserContext();
  const user=user1.user;
 
  const [formData, setFormData] = useState({
    declaration1: false,
    declaration2: false,
  });
  const [errors, setErrors] = useState({
    basicDetails: {},
    xClassDetails: {},
    intermediateDetails: {},
    graduationDetails: {},
    skillsRequired: [],
    experienceDetails: [],
  });

  const validateForm = (fielname) => {
    const newErrors = {
      basicDetails: {},
      xClassDetails: {},
      intermediateDetails: {},
      graduationDetails: {},
      skillsRequired: [],
      experienceDetails: [],
    };
const currentDate = new Date();
const maxAllowedAge = 18;

if(fielname === "" || fielname === "dateOfBirth")
{
if (!/^\d{4}-\d{2}-\d{2}$/.test(basicDetails.dateOfBirth)){
 newErrors.basicDetails.dateOfBirth = 'Date of birth is required';
} else {
  const selectedDate = new Date(basicDetails.dateOfBirth);

  if (selectedDate > new Date(currentDate.getFullYear() - maxAllowedAge, currentDate.getMonth(), currentDate.getDate())) {
    newErrors.basicDetails.dateOfBirth = 'The Date of Birth should be at least 18 years ago.';
  }
}
}

if(fielname === "" || fielname === "city")
{
    if (!basicDetails.city) {
      newErrors.basicDetails.city = 'City is required';
    } else {
      if (/\d/.test(basicDetails.city.trim())) {
        newErrors.basicDetails.city = 'City should not be number';
      }
    }
  }
  if(fielname==="" || fielname === "address")
  {
    if (!basicDetails.address.trim()) {
      newErrors.basicDetails.address = 'Address is required';
    }
  }
  
    if(fielname === "" || fielname === "pincode")
{
    if (!basicDetails.pincode.trim()) {
      newErrors.basicDetails.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(basicDetails.pincode.trim())) {
      newErrors.basicDetails.pincode = 'Pincode should be 6 digits and contain only numbers';
    }
  }
   
    if(fielname === "" || fielname === "state")
{
    if (!basicDetails.state) {
      newErrors.basicDetails.state = 'State is required';
    } else {
      if (/\d/.test(basicDetails.state.trim())) {
        newErrors.basicDetails.state = 'State should contain text only';
      }
    }
  }
    if(fielname === "" || fielname === "xschoolName")
    {
    if (!xClassDetails.xschoolName) {
      newErrors.xClassDetails.xschoolName = 'School name is required';
    } else {
      if (!/^[a-zA-Z\s]+$/.test(xClassDetails.xschoolName.trim())) {
        newErrors.xClassDetails.xschoolName = 'School name should not be number';
      }
    }}
   
    if(fielname === "" || fielname === "xboard")
    {
    if (!xClassDetails.xboard) {
      newErrors.xClassDetails.xboard = 'Board is required';
    } else {
      if (!/^[a-zA-Z\s]+$/.test(xClassDetails.xboard.trim())) {
        newErrors.xClassDetails.xboard = 'Board should not be number';
      }
    }
  }
   
    if(fielname === "" || fielname === "xpercentage")
{
    if (!xClassDetails.xpercentage.trim()) {
      newErrors.xClassDetails.xpercentage = 'Percentage is required';
    } else {
      const percentageValue = xClassDetails.xpercentage.trim();
      const validPercentageRegex = /^\d+(\.\d+)?$/;
      if (!validPercentageRegex.test(percentageValue) || parseFloat(percentageValue) < 0 || parseFloat(percentageValue) > 100) {
        newErrors.xClassDetails.xpercentage = 'Enter a valid percentage between 0 and 100 (only digits and period(.) are allowed)';
      }
    }
  }
   
    if(fielname === "" || fielname === "xPincode")
    {
    if (!xClassDetails.xPincode.trim()) {
      newErrors.xClassDetails.xPincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(xClassDetails.xPincode.trim())) {
      newErrors.xClassDetails.xPincode = 'Pincode should be 6 digits and contain only numbers';
    }
  }
   if(fielname === "" || fielname === "xyearOfPassing")
{
if (!xClassDetails.xyearOfPassing) {
  newErrors.xClassDetails.xyearOfPassing = 'Year of passing is required';
} else {
  if (!/^\d{4}$/.test(xClassDetails.xyearOfPassing.trim())) {
    newErrors.xClassDetails.xyearOfPassing = 'Year of passing should be a 4-digit number';
  } else {
    if (!/^\d+$/.test(xClassDetails.xyearOfPassing.trim())) {
      newErrors.xClassDetails.xyearOfPassing = 'Year of passing should contain only digits';
    }
  }
}
}
    if(fielname === "" || fielname === "xCity")
{
if (!xClassDetails.xCity) {
  newErrors.xClassDetails.xCity = 'City is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(xClassDetails.xCity.trim())) {
    newErrors.xClassDetails.xCity = 'City should not be number';
  }
}
}
if(fielname === "" || fielname === "xState")
{
if (!xClassDetails.xState) {
  newErrors.xClassDetails.xState = 'State is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(xClassDetails.xState.trim())) {
    newErrors.xClassDetails.xState = 'State should not be number';
  }
}
}
   if(fielname === "" || fielname === "icollegeName")
{
if (!intermediateDetails.icollegeName) {
  newErrors.intermediateDetails.icollegeName = 'College name is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(intermediateDetails.icollegeName.trim())) {
    newErrors.intermediateDetails.icollegeName = 'College name should not be number';
  }
}
}
if(fielname === "" || fielname === "iboard")
{
if (!intermediateDetails.iboard) {
  newErrors.intermediateDetails.iboard = 'Board name is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(intermediateDetails.iboard.trim())) {
    newErrors.intermediateDetails.iboard = 'Board name should not be number only';
  }
}
}
if(fielname === "" || fielname === "iprogram")
{
if (!intermediateDetails.iprogram) {
  newErrors.intermediateDetails.iprogram = 'Program is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(intermediateDetails.iprogram.trim())) {
    newErrors.intermediateDetails.iprogram = 'Program should contain text only';
  }
}
}  
    if(fielname === "" || fielname === "ipercentage")
{
    if (!intermediateDetails.ipercentage.trim()) {
      newErrors.intermediateDetails.ipercentage = 'Percentage is required';
    } else {
      const percentageValue = intermediateDetails.ipercentage.trim();
      const validPercentageRegex = /^\d+(\.\d+)?$/;
      if (!validPercentageRegex.test(percentageValue) || parseFloat(percentageValue) < 0 || parseFloat(percentageValue) > 100) {
        newErrors.intermediateDetails.ipercentage = 'Enter a valid percentage between 0 (only digits and period(.) are allowed)';
      }
    }
  }

    if(fielname === "" || fielname === "iyearOdPassing")
{
    if (!intermediateDetails.iyearOfPassing) {
      newErrors.intermediateDetails.iyearOfPassing = 'Year of passing is required';
    } else {
      if (!/^\d{4}$/.test(intermediateDetails.iyearOfPassing.trim())) {
        newErrors.intermediateDetails.iyearOfPassing = 'Year of passing should be a 4-digit number';
      } else {
        if (!/^\d+$/.test(intermediateDetails.iyearOfPassing.trim())) {
          newErrors.intermediateDetails.iyearOfPassing = 'Year of passing should contain only digits';
        }
      }
    }
  }
if(fielname === "" || fielname === "iCity")
{
if (!intermediateDetails.iCity) {
  newErrors.intermediateDetails.iCity = 'City is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(intermediateDetails.iCity.trim())) {
    newErrors.intermediateDetails.iCity = 'City should contain text only';
  }
}
}
    if(fielname === "" || fielname === "iState")
{
if (!intermediateDetails.iState) {
  newErrors.intermediateDetails.iState = 'State is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(intermediateDetails.iState.trim())) {
    newErrors.intermediateDetails.iState = 'State should contain text only';
  }
}
}
    if(fielname === "" || fielname === "gcollegeName")
{
if (!graduationDetails.gcollegeName) {
  newErrors.graduationDetails.gcollegeName = 'College name is required';
} else {
  if (!/^[^\d]+$/.test(graduationDetails.gcollegeName.trim())) {
    newErrors.graduationDetails.gcollegeName = 'College name should contain text only';
  }
}
}
    if(fielname === "" || fielname === "gboard")
{
if (!graduationDetails.gboard) {
  newErrors.graduationDetails.gboard = 'Board name is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(graduationDetails.gboard.trim())) {
    newErrors.graduationDetails.gboard = 'Board name should contain text only';
  }
}
}
    if(fielname === "" || fielname === "gprogram")
{
if (!graduationDetails.gprogram) {
  newErrors.graduationDetails.gprogram = 'Program is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(graduationDetails.gprogram.trim())) {
    newErrors.graduationDetails.gprogram = 'Program should contain text only';
  }
}
}
      if(fielname === "" || fielname === "gpercentage")
{
    if (!graduationDetails.gpercentage.trim()) {
      newErrors.graduationDetails.gpercentage = 'Percentage is required';
    } else {
      const percentageValue = graduationDetails.gpercentage.trim();
      const validPercentageRegex = /^\d+(\.\d+)?$/;
      if (!validPercentageRegex.test(percentageValue) || parseFloat(percentageValue) < 0 || parseFloat(percentageValue) > 100) {
        newErrors.graduationDetails.gpercentage = 'Enter a valid percentage between 0 and 100 (only digits and period(.) are allowed)';
      }
    }
  }
   
    if(fielname === "" || fielname === "gyearOfPassing")
{
    if (!graduationDetails.gyearOfPassing) {
      newErrors.graduationDetails.gyearOfPassing = 'Year of passing is required';
    } else {
      if (!/^\d{4}$/.test(graduationDetails.gyearOfPassing.trim())) {
        newErrors.graduationDetails.gyearOfPassing = 'Year of passing should be a 4-digit number';
      } else {
        if (!/^\d+$/.test(graduationDetails.gyearOfPassing.trim())) {
          newErrors.graduationDetails.gyearOfPassing = 'Year of passing should contain only digits';
        }
      }
    }
  }
    if(fielname === "" || fielname === "gCity")
{
if (!graduationDetails.gCity) {
  newErrors.graduationDetails.gCity = 'City is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(graduationDetails.gCity.trim())) {
    newErrors.graduationDetails.gCity = 'City should contain text only';
  }
}
}
if(fielname === "" || fielname === "gState")
{
if (!graduationDetails.gState) {
  newErrors.graduationDetails.gState = 'State is required';
} else {
  if (!/^[a-zA-Z\s]+$/.test(graduationDetails.gState.trim())) {
    newErrors.graduationDetails.gState = 'State should contain text only';
  }
}
}
    skillsRequired.forEach((skill, index) => {
      if(fielname === "" || fielname === "skillName")
{
      if (skill==undefined || !skill.skillName) {     
        if(newErrors.skillsRequired[index]===undefined)
        newErrors.skillsRequired[index] =  {skillName:'',experience:''};
        newErrors.skillsRequired[index].skillName='Skill name is required';
      } else if (/^\d+$/.test(skill.skillName)) {
        if(newErrors.skillsRequired[index]===undefined)
  newErrors.skillsRequired[index] =  {skillName:'',experience:''};
          newErrors.skillsRequired[index].skillName='Skill name should not be a numeric'; 
      }
    }
      if(fielname === "" || fielname === "experience")
{
      if (!skill.experience) {
        if(newErrors.skillsRequired[index]===undefined)
  newErrors.skillsRequired[index] =  {skillName:'',experience:''};
        newErrors.skillsRequired[index].experience='Experience is required';
      } 
      else if (!/^\d+$/.test(skill.experience)) {
        if(newErrors.skillsRequired[index]===undefined)
  newErrors.skillsRequired[index] =  {skillName:'',experience:''};
        newErrors.skillsRequired[index].experience='Experience should be numeric' ;
      }
    }
    });
    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).every(key => Object.keys(newErrors[key]).length === 0);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const [basicDetails, setBasicDetails] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    alternatePhoneNumber: "",
  });
  const [xClassDetails, setXClassDetails] = useState({
    xschoolName: "",
    xboard: "",
    xpercentage: "",
    xyearOfPassing: "",
    xCity: "",
    xState: "",
    xPincode: "",
  });
  const [intermediateDetails, setIntermediateDetails] = useState({
    icollegeName: "",
    iboard: "",
    iprogram: "",
    ipercentage: "",
    iyearOfPassing: "",
    iCity: "",
    iState: "",
  });
 const [graduationDetails, setGraduationDetails] = useState({
    gcollegeName: "",
    gboard: "",
    gprogram: "",
    gpercentage: "",
    gyearOfPassing: "",
    gCity: "",
    gState: "",
  });
  const [skillsRequired, setSkillsRequired] = useState([
    { skillName: "", experience: "" },
 
  ]);
  const [experienceDetails, setExperienceDetails] = useState([
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [resumeFile, setResumeFile] = useState(null);
  const [photoFile,setPhotoFile]=useState(null);
  const handleSkillChange = (e, index, field) => {
    const updatedSkillsRequired = [...skillsRequired];
        updatedSkillsRequired[index][field] = e.target.value;
 console.log('After Update:', updatedSkillsRequired);
    setSkillsRequired(updatedSkillsRequired);
  }; 
  const addSkills = () => {
    setSkillsRequired([...skillsRequired, { skillName: "", experience: "" }]);
  };
  const removeSkills = () => {
    if (skillsRequired.length > 1) {
      const updatedSkills = [...skillsRequired.slice(0, -1)];
      setSkillsRequired(updatedSkills);
    }
  }; 
 const handleExperienceChange = (e, index, field) => {
    const newExperienceDetails = [...experienceDetails];
    newExperienceDetails[index][field] = e.target.value;
    setExperienceDetails(newExperienceDetails);
  };
  const addExperience = () => {
    setExperienceDetails([
      ...experienceDetails,
      { company: "", position: "", startDate: "", endDate: "" }
    ]);
  };

  const removeExperience = (index) => {
    if(experienceDetails.length>1){
      const updatedExperienceDetails = [...experienceDetails];
      updatedExperienceDetails.splice(index, 1);
      setExperienceDetails(updatedExperienceDetails);
    }
   
  };
   
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm("");
    if (!isFormValid) {
      return;
    }
    if (!formData.declaration1 || !formData.declaration2) {
      window.alert("Please check checkboxes before submitting.");
      return;
    }
    const userData = {
      basicDetails,
      xClassDetails,
      intermediateDetails,
      graduationDetails,
      skillsRequired,
      experienceDetails,
      user,
    };
 
   try {
    const jwtToken = localStorage.getItem('jwtToken');
     console.log('jwt token new',jwtToken);
    const response = await axios.post(`${apiUrl}/applicantprofile/createprofile/${user.id}`, userData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response.status === 201) {
      if (response.data === 'profile saved sucessfully') {
        console.log(response.body);
        window.alert('Profile saved successfully!');
        navigate('/applicanthome');
      }  else {
        console.error('An unexpected success response:', response.body);
      }  
    }
    else {
      console.error('An error occurred:', response.status, response.body);
    } 
  } catch (error) {
      window.alert("Your profile has already been updated.");
      navigate('/applicanthome');
     console.error('An error occurred:', error);
  }
};  
const handleFileSelect = (e) => {
  const file = e.target.files[0];
  setPhotoFile(file);
};
const uploadPhoto = async () => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const formData = new FormData();
    formData.append('photo', photoFile); 
    const response = await axios.post(
      `${apiUrl}/applicant-image/${user.id}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    console.log(response.data);
    window.alert(response.data);
    window.location.reload();
  } catch (error) {
    console.error('Error uploading photo:', error);
    window.alert('error in uploading Profile ');
  }
};
const handleResumeSelect = (e) => {
  const file = e.target.files[0];
  setResumeFile(file);
};
const handleResumeUpload = async () => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const formData = new FormData();
    formData.append('resume', resumeFile);
    const response = await axios.post(
      `${apiUrl}/applicant-pdf/${user.id}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    console.log(response.data);
    window.alert(response.data);
    window.location.reload();
  } catch (error) {
    console.error('Error uploading resume:', error);
    window.alert('Error uploading resume. Please try again.');
  }
};
  return (
    <div>
       {loading ? null : (
      <form className="profile-form-container" onSubmit={handleSubmit}>
<div className="dashboard__content">
  <section className="page-title-dashboard">
    <div className="themes-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ">
          <div className="title-dashboard">
            <div className="title-dash flex2">Profile Setting</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="flat-dashboard-setting flat-dashboard-setting2">
    <div className="themes-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ">
          <div className="profile-setting bg-white">
          <div class="author-profile flex2 border-bt">
          <div class="wrap-img flex2">
  <div id="upload-profile">
    <h5 class="fw-6">Upload your profile picture: </h5>
    <h6>JPG or PNG</h6>
    <input
      class="up-file"
      id="tf-upload-img"
      type="file"
      name="profile"
      required=""
      onChange={handleFileSelect}
    />
    <button
      type="button"
      onClick={uploadPhoto}
      className="btn-3"
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft:'5px',
        marginTop:'5px'
      }}
    >
      Upload Photo
    </button>
  </div>
</div>&nbsp;&nbsp;&nbsp;
<div class="wrap-img flex2">
  <div id="upload-profile">
    <h5 class="fw-6">Upload your resume: </h5>
    <h6>PDF only</h6>
    <input
      class="up-file"
      id="tf-upload-img"
      type="file"
      name="profile"
      required=""
      onChange={handleResumeSelect}
    />  
    <button
  type="button"
  onClick={handleResumeUpload}
  className="btn-3"
  style={{
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft:'5px',
    marginTop:'5px'
  }}
>
  Upload Resume
</button>
  </div>
</div>
<div>
  </div>
</div>
            <div className="flat-dashboard-post form-infor-profile">        
             <div className="row">
              <div className="col-lg-12 col-md-12 ">  
              <h3 className="title-info">Information</h3>
              </div>
                  <div className="col-lg-6 col-md-12">
                    <div className=" dropdown titles-dropdown info-wd">
                  <label class="title-user fw-7">Date of Birth <span className="color-red">*</span></label>
                     <input
                             type="date"
                             placeholder="Date of Birth"
                             id="dateOfBirth"
                             className="input-form"
                             style={{ color: basicDetails.dateOfBirth==="dd-mm-yyyy"||basicDetails.dateOfBirth===""? 'lightgrey': 'black' }}
                             value={basicDetails.dateOfBirth}
                             onChange={(e) =>{
                            console.log(e.target.value);
                             setBasicDetails({...basicDetails,dateOfBirth: e.target.value,})}}
                             onBlur={() => validateForm("dateOfBirth")}                             
                       /> 
                       {errors.basicDetails.dateOfBirth && (
              <div className="error-message">{errors.basicDetails.dateOfBirth}</div>
            )}
              </div>
              </div>
              <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
                  <label class="title-user fw-7">Address <span className="color-red">*</span></label>
                    <input
                            type="text"
                            placeholder="Address"
                            className="input-form"                            
                            value={basicDetails.address}
                            onChange={(e) =>
                            setBasicDetails({ ...basicDetails, address: e.target.value })}
                            onBlur={() => validateForm("address")}
                     />
                      {errors.basicDetails.address && (
              <div className="error-message">{errors.basicDetails.address}</div>
            )}
                  </div>
                 
                  <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
                  <label class="title-user fw-7">City <span className="color-red">*</span></label>
                    <input type="text"
                           placeholder="City"
                           className="input-form"
                           value={basicDetails.city}
                           onChange={(e) =>
                           setBasicDetails({ ...basicDetails, city: e.target.value })}
                           onBlur={() => validateForm("city")}
                  />
                   {errors.basicDetails.city && (
              <div className="error-message">{errors.basicDetails.city}</div>
            )}
                  </div>
                  <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
                  <label class="title-user fw-7">State <span className="color-red">*</span></label>
                    <input
                        type="text"
                        placeholder="State"
                        className="input-form"
                        value={basicDetails.state}
                        onChange={(e) =>
                        setBasicDetails({ ...basicDetails, state: e.target.value })}
                        onBlur={() => validateForm("state")}
                   />
                    {errors.basicDetails.state && (
              <div className="error-message">{errors.basicDetails.state}</div>
            )}
                  </div>
                  <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
                  <label class="title-user fw-7">Pin Code <span className="color-red">*</span></label>
                    <input
                            type="text"
                            placeholder="Pin Code"
                            className="input-form"
                            maxLength="6"
                            value={basicDetails.pincode}
                            onChange={(e) =>
                            setBasicDetails({ ...basicDetails, pincode: e.target.value })}
                            onBlur={() => validateForm("pincode")}
                    />
                     {errors.basicDetails.pincode && (
              <div className="error-message">{errors.basicDetails.pincode}</div>
            )}
                </div>
                <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
                <label class="title-user fw-7">Alternate Phone Number</label>
                    <input
                             type="text"
                             placeholder="Alternate Phone Number"
                             className="input-form"
                             value={basicDetails.alternatePhoneNumber}
                             onChange={(e) =>
                             setBasicDetails({...basicDetails,alternatePhoneNumber: e.target.value,})}
                    />
                    </div>
                  </div>                              
            <div className="flat-dashboard-post form-infor-profile">        
             <div className="row">
              <div className="col-lg-12 col-md-12 ">  
              <h3 className="title-info">Education- X Class</h3>
              </div>
                  <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">     
                  <label class="title-user fw-7">School Name<span className="color-red">*</span></label>        
                    <input
                         type="text"
                          placeholder="School Name"
                          className="input-form"
                          value={xClassDetails.xschoolName}
                          onChange={(e) =>
                           setXClassDetails({...xClassDetails,xschoolName: e.target.value,})}
                           onBlur={() => validateForm("xschoolName")}
                  />
                  <div className="validation-errors">
            {errors.xClassDetails.xschoolName && (
              <div className="error-message">{errors.xClassDetails.xschoolName}</div>
            )}
          </div>
          </div> 
                <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
                <label class="title-user fw-7">Board<span className="color-red">*</span></label>
                    <input
                           type="text"
                           placeholder="Board"
                           className="input-form"
                           value={xClassDetails.xboard}
                           onChange={(e) =>
                           setXClassDetails({ ...xClassDetails, xboard: e.target.value })}
                           onBlur={() => validateForm("xboard")}
              />
              <div className="validation-errors">
            {errors.xClassDetails.xboard && (
              <div className="error-message">{errors.xClassDetails.xboard}</div>
            )}
              </div>
              </div> 
              <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">Percentage<span className="color-red">*</span></label>
                    <input type="text"
                          placeholder="Percentage"
                          className="input-form"
                          value={xClassDetails.xpercentage}
                          onChange={(e) =>setXClassDetails({...xClassDetails,xpercentage: e.target.value,})}
                          onBlur={() => validateForm("xpercentage")}
                   />
                   <div className="validation-errors">
            {errors.xClassDetails.xpercentage && (
              <div className="error-message">{errors.xClassDetails.xpercentage}</div>
            )}
          </div>
          </div> 
            <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">Year Of Passing<span className="color-red">*</span></label>
                    <input
                           type="text"
                           placeholder="Year of passing"
                           className="input-form"
                           maxLength={4}
                           value={xClassDetails.xyearOfPassing}
                           onChange={(e) =>
                           setXClassDetails({...xClassDetails,xyearOfPassing: e.target.value,})}
                           onBlur={() => validateForm("xyearOfPassing")}
                  />
                   <div className="validation-errors">
            {errors.xClassDetails.xyearOfPassing && (
              <div className="error-message">{errors.xClassDetails.xyearOfPassing}</div>
            )}
            </div>
            </div> 
            <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">City<span className="color-red">*</span></label>
                  <input  type="text"
                          placeholder="City"
                          className="input-form"
                          value={xClassDetails.xCity}
                          onChange={(e) =>
                          setXClassDetails({ ...xClassDetails, xCity: e.target.value })}
                          onBlur={() => validateForm("xCity")}
                  />
                  <div className="validation-errors">
            {errors.xClassDetails.xCity && (
              <div className="error-message">{errors.xClassDetails.xCity}</div>
            )}
            </div>
            </div> 
            <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">State<span className="color-red">*</span></label>
            <input  type="text"
                          placeholder="State"
                          className="input-form"
                          value={xClassDetails.xState}
                          onChange={(e) =>
                          setXClassDetails({ ...xClassDetails, xState: e.target.value })}
                          onBlur={() => validateForm("xState")}
                   />
                   <div className="validation-errors">
            {errors.xClassDetails.xState && (
              <div className="error-message">{errors.xClassDetails.xState}</div>
            )} 
            </div> 
            </div> 

            <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
            <label class="title-user fw-7">Pincode<span className="color-red">*</span></label> 
            <input
                         type="text"
                         placeholder="Pincode"
                         className="input-form"
                         maxLength={6}
                         value={xClassDetails.xPincode}
                         onChange={(e) =>setXClassDetails({...xClassDetails,xPincode: e.target.value,})}
                         onBlur={() => validateForm("xPincode")}
                  />
                   <div className="validation-errors">
            {errors.xClassDetails.xPincode && (
              <div className="error-message">{errors.xClassDetails.xPincode}</div>
            )}
            </div>                        
              </div>
              </div>
              </div> 
            <div className="flat-dashboard-post form-infor-profile">        
             <div className="row">
              <div className="col-lg-12 col-md-12 ">  
              <h3 className="title-info">Education- Inter/Diploma Details</h3>
              </div>
                  <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">     
                  <label class="title-user fw-7">Name Of College<span className="color-red">*</span></label>        
                  <input 
                    type="text"
                    placeholder="Name of college"
                    className="input-form"
                    value={intermediateDetails.icollegeName}
                    onChange={(e) =>
                    setIntermediateDetails({
                    ...intermediateDetails,
                    icollegeName: e.target.value,})} 
                    onBlur={() => validateForm("icollegeName")}
                  />
              <div className="validation-errors">
              {errors.intermediateDetails.icollegeName && (
              <div className="error-message">{errors.intermediateDetails.icollegeName}</div>
                  )}
          </div>
          </div> 
                <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
                <label class="title-user fw-7">Board<span className="color-red">*</span></label>
                <input
                           type="text"
                           placeholder="Board"
                           className="input-form"
                           value={intermediateDetails.iboard}
                           onChange={(e) =>
                             setIntermediateDetails({...intermediateDetails,iboard: e.target.value,})}
                             onBlur={() => validateForm("iboard")}
                    />
                    <div className="validation-errors">
            {errors.intermediateDetails.iboard && (
              <div className="error-message">{errors.intermediateDetails.iboard}</div>
            )}
          </div>
              </div> 
              <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">Program<span className="color-red">*</span></label>
              <input type="text"
                          placeholder="Program"
                          className="input-form"
                          value={intermediateDetails.iprogram}
                          onChange={(e) =>
                            setIntermediateDetails({...intermediateDetails,iprogram: e.target.value,})
                            
                          }   
                          onBlur={() => validateForm("iprogram")}
                   />
                   <div className="validation-errors">
            {errors.intermediateDetails.iprogram && (
              <div className="error-message">{errors.intermediateDetails.iprogram}</div>
            )}
          </div>
          </div> 
            <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">Year Of Passing<span className="color-red">*</span></label>
              <input
                           type="text"
                           placeholder="Year of passing"
                           className="input-form"
                           maxLength={4}
                           value={intermediateDetails.iyearOfPassing}
                           onChange={(e) =>
                            setIntermediateDetails({...intermediateDetails,iyearOfPassing: e.target.value,})}
                            onBlur={() => validateForm("iyearOfPassing")}
                  />
                  <div className="validation-errors">
            {errors.intermediateDetails.iyearOfPassing && (
              <div className="error-message">{errors.intermediateDetails.iyearOfPassing}</div>
            )}
          </div>
            </div> 
            <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
            <label class="title-user fw-7">Percentage<span className="color-red">*</span></label> 
            <input
                         type="text"
                         placeholder="Percentage"
                         className="input-form"
                         value={intermediateDetails.ipercentage}
                         onChange={(e) =>
                         setIntermediateDetails({...intermediateDetails,ipercentage: e.target.value,})}
                         onBlur={() => validateForm("ipercentage")}
                  />
                  <div className="validation-errors">
           {errors.intermediateDetails.ipercentage && (
             <div className="error-message">{errors.intermediateDetails.ipercentage}</div>
           )}
         </div>        
              </div>
            <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">City<span className="color-red">*</span></label>
              <input  type="text"
                          placeholder="City"
                          className="input-form"
                          value={intermediateDetails.iCity}
                          onChange={(e) =>
                            setIntermediateDetails({ ...intermediateDetails, iCity: e.target.value })}
                            onBlur={() => validateForm("iCity")}
                         
                  />
                  <div className="validation-errors">
            {errors.intermediateDetails.iCity && (
              <div className="error-message">{errors.intermediateDetails.iCity}</div>
            )}
          </div>
            </div> 
            <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">State<span className="color-red">*</span></label>
              <input  type="text"
                          placeholder="State"
                          className="input-form"
                          value={intermediateDetails.iState}
                          onChange={(e) =>
                            setIntermediateDetails({ ...intermediateDetails, iState: e.target.value })}
                            onBlur={() => validateForm("iState")}
                   />
                   <div className="validation-errors">
            {errors.intermediateDetails.iState && (
              <div className="error-message">{errors.intermediateDetails.iState}</div>
            )}
          </div>
            </div>             
              </div>
              </div>
            <div className="flat-dashboard-post form-infor-profile">        
             <div className="row">
             <div className="col-lg-12 col-md-12 "> 
              <h3 className="title-info">Education- Graduation Details</h3>
              </div>
              <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">Name Of College<span className="color-red">*</span></label>
                  <input
                           type="text"
                           placeholder="Name of college"
                           className="input-form"
                           value={graduationDetails.gcollegeName}
                           onChange={(e) =>setGraduationDetails({...graduationDetails,gcollegeName: e.target.value,})}
                           onBlur={() => validateForm("gcollegeName")}
                  />
                   <div className="validation-errors">
            {errors.graduationDetails.gcollegeName && (
              <div className="error-message">{errors.graduationDetails.gcollegeName}</div>
            )}
          </div>
          </div>
          <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">University<span className="color-red">*</span></label>
                    <input
                           type="text"
                           placeholder="University"
                           className="input-form"
                           value={graduationDetails.gboard}
                           onChange={(e) =>setGraduationDetails({...graduationDetails,gboard: e.target.value,})}
                           onBlur={() => validateForm("gboard")}
                    />
                    <div className="validation-errors">
            {errors.graduationDetails.gboard && (
              <div className="error-message">{errors.graduationDetails.gboard}</div>
            )}
          </div>
          </div>
                 
          <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">Program<span className="color-red">*</span></label>
                    <input type="text"
                          placeholder="Program"
                          className="input-form"
                          value={graduationDetails.gprogram}
                          onChange={(e) =>setGraduationDetails({
                              ...graduationDetails,
                              gprogram: e.target.value,
                            })
                          }
                          onBlur={() => validateForm("gprogram")}
                   />
                   <div className="validation-errors">
            {errors.graduationDetails.gprogram && (
              <div className="error-message">{errors.graduationDetails.gprogram}</div>
            )}
          </div>
            </div>
            <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">Percentage<span className="color-red">*</span></label>
                  <input
                          type="text"
                          placeholder="Percentage"
                          className="input-form"
                          value={graduationDetails.gpercentage}
                onChange={(e) =>setGraduationDetails({
                    ...graduationDetails,gpercentage: e.target.value,})}
                    onBlur={() => validateForm("gpercentage")}
                   />
                   <div className="validation-errors">
            {errors.graduationDetails.gpercentage && (
              <div className="error-message">{errors.graduationDetails.gpercentage}</div>
            )}
          </div>
              </div>
              <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">Year Of Passing<span className="color-red">*</span></label>
                    <input
                           type="text"
                           placeholder="Year of passing"
                           className="input-form"
                           value={graduationDetails.gyearOfPassing}
                           onChange={(e) =>setGraduationDetails({...graduationDetails,gyearOfPassing: e.target.value,})}
                           onBlur={() => validateForm("gyearOfPassing")}
                  />
                  <div className="validation-errors">
            {errors.graduationDetails.gyearOfPassing && (
              <div className="error-message">{errors.graduationDetails.gyearOfPassing}</div>
            )}
          </div>
              </div>
              <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">City<span className="color-red">*</span></label>
                  <input  type="text"
                          placeholder="City"
                          className="input-form"
                          value={graduationDetails.gCity}
                          onChange={(e) =>
                            setGraduationDetails({...graduationDetails,gCity: e.target.value,})}
                            onBlur={() => validateForm("gCity")}
                  />
                  <div className="validation-errors">
            {errors.graduationDetails.gCity && (
              <div className="error-message">{errors.graduationDetails.gCity}</div>
            )}
          </div>
              </div>
              <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
              <label class="title-user fw-7">State<span className="color-red">*</span></label>
                  <input  type="text"
                          placeholder="State"
                          className="input-form"
                          value={graduationDetails.gState}
                          onChange={(e) =>setGraduationDetails({...graduationDetails,gState: e.target.value,})}
                          onBlur={() => validateForm("gState")}
                   />
                   <div className="validation-errors">
            {errors.graduationDetails.gState && (
              <div className="error-message">{errors.graduationDetails.gState}</div>
            )}
          </div>
          </div>                             
          </div>
          </div>
           
  <div className="flat-dashboard-post form-infor-profile">        
  <div className="row">
    <div className="col-lg-12 col-md-12"> 
      <h3 className="title-info">Experience</h3>
    </div>        
    
    {experienceDetails.map((experience, index) => (
      <div key={index} className="row">
        <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">           
          <label className="title-user color-1 fw-7">Company Name</label>
          <input
            type="text"
            className="input-form"
            placeholder="ABC Pvt Ltd"
            value={experience.company}
            onChange={(e) => handleExperienceChange(e, index, "company")}
          />
        </div>
        
        <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd"> 
          <label className="title-user color-1 fw-7">Position</label>
          <input
            type="text"
            className="input-form"
            placeholder="Java Developer"
            value={experience.position}
            onChange={(e) => handleExperienceChange(e, index, "position")}
          />
        </div>
        
        <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
          <label className="title-user color-1 fw-7" htmlFor={`startDate-${index}`}>Start Date</label>
          <input
            type="date"
            style={{ color: experience.startDate==="dd-mm-yyyy"||experience.startDate===""? 'lightgrey': 'black' }}
            className="input-form"
            id={`startDate-${index}`}
            value={experience.startDate}
            onChange={(e) => handleExperienceChange(e, index, "startDate")}
          />
        </div>
        
        <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
          <label className="title-user color-1 fw-7" htmlFor={`endDate-${index}`}>End Date</label>
          <input
            type="date"
            style={{ color: experience.endDate==="dd-mm-yyyy"||experience.endDate===""? 'lightgrey': 'black' }}
            className="input-form"
            id={`endDate-${index}`}
            value={experience.endDate}
            onChange={(e) => handleExperienceChange(e, index, "endDate")}
          />
        </div>
      </div>
    ))}
    </div>
    <button type="button" onClick={addExperience} style={{'color':'#FFFFFF','backgroundColor':'#1967d2'}}>
      +
    </button>
    
    {experienceDetails.length > 0 && (
      <button type="button" onClick={() => removeExperience(experienceDetails.length - 1)} style={{'color':'#FFFFFF','backgroundColor':'#FF0000'}}>
        -
      </button>
    )}  
</div>
<br/>
<div className="flat-dashboard-post form-infor-profile">        
  <div className="row">
    <div className="col-lg-12 col-md-12"> 
      <h3 className="title-info">Skills</h3>
    </div>

    {skillsRequired.map((skill, index) => (
      <div>
      <div key={index} className="row">
        <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
          <label className="title-user fw-7">Your Skill<span className="color-red">*</span></label>
          <input
            type="text"
            placeholder="Java"
            className="input-form"
            value={skill.skillName}
            onChange={(e) => handleSkillChange(e, index, "skillName")}
            onBlur={() => validateForm("skillName")}
          />
          {errors.skillsRequired[index]?.skillName && (
            <div className="error-message">{errors.skillsRequired[index].skillName}</div>
          )}
        </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 dropdown titles-dropdown info-wd">
            <label className="title-user fw-7">Your Experience<span className="color-red">*</span></label>
            <input
              type="text"
              placeholder="5"
              className="input-form"
              value={skill.experience}
              onChange={(e) => handleSkillChange(e, index, "experience")}
              onBlur={() => validateForm("experience")}
            />
            {errors.skillsRequired[index]?.experience && (
              <div className="error-message">{errors.skillsRequired[index].experience}</div>
            )}
          </div>
        </div>
<div className="row">
        <div className="col-lg-12 col-md-12">
          {index === skillsRequired.length - 1 && (
            <div className="btn-group">
              <button type="button" onClick={addSkills} className="btn-3" style={{ 'color': '#FFFFFF', 'backgroundColor': '#1967d2' }}>
                +
              </button>
              <button type="button" onClick={removeSkills} style={{ 'color': '#FFFFFF', 'backgroundColor': '#FF0000' }}>
                -
              </button>
            </div>
          )}
        </div>
        </div>
        </div>
      
    ))}
  </div>
</div>
</div>
    <br/>   
    <div className="checkbox-group">
<label>
<input
      type="checkbox"
      name="declaration1"
      checked={formData.declaration1}
      onChange={() => setFormData({ ...formData, declaration1: !formData.declaration1 })}
    />
<strong>&nbsp;&nbsp;I hereby declare that the information given above is true.</strong>
</label>
<br></br>
<label>
<input
      type="checkbox"
      name="declaration2"
      checked={formData.declaration2}
      onChange={() => setFormData({ ...formData, declaration2: !formData.declaration2 })}
    />
<strong>&nbsp;&nbsp;I hereby declare that I agree to the terms and conditions.</strong>
</label>
</div>
<br/>       
               <div className="tt-button button-style">
              </div>
                <div>
                  <button type="submit" className='button-status'>Save Profile</button>
</div>
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
    </form>
   
    )
  }
    </div>
                 
 
  )
}

export default ApplicantUpdateProfile;