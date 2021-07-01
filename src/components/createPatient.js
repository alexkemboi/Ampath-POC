import '../styles/createpatient.css'
import * as React from 'react';
import { Button, TextInput, RadioButton, RadioButtonGroup, Select,SelectItem } from 'carbon-components-react';
import { useState } from 'react';
import axios from 'axios';
import urlApi from '../components/resource.js'
function CreatePatient() {
  const [givenName, setgivenName] = useState();
  const [familyName, setfamilyName] = useState();
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();
  const [city, setCity] = useState();
  const [village, setVillage] = useState();
  const [address, setAddress] = useState();
  const [postalcode, setPostalcode] = useState();
  const [country, setCountry] = useState();
  const [identifier, setIdentifier] = useState();
  const [identifierType, setIdentifierType] = useState();
  const [location, setLocation] = useState();
  const [setPrefered] = useState();
  const session_id = sessionStorage.getItem("userDetails");
  const [person_uuid, setPersonUuid] = useState("");


  const handleSubmit = async (e) => {
   
    e.preventDefault();

    if (givenName !== "" && familyName !== "" && gender !== "" && city !== "" && postalcode !== ""
      && address !== "" && village !== "" && country !== "" && dob !== "") {
      let personData = JSON.stringify({
        names: [{
          givenName: givenName,
          familyName: familyName
        }],
        gender: gender,
        birthdate: dob,
        addresses: [{
          address1: address,
          cityVillage: village,
          country: country,
          postalCode: postalcode
        }]
      });




      try {
        const result = await axios(`${urlApi}person`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${session_id}`,
          },
          data: personData
        }).then(resp => {
          return resp.data.uuid;
        }
        )
        setPersonUuid(result);
        alert("Successfully created a person,proceed to create a patient");
      } catch (error) {
        alert(error.message)
      }

    }
    else {
      alert("Kindly all filleds are required");
    }
  }

 


  const create_patient = async (e) => {
    e.preventDefault();
    let patientData = JSON.stringify({
      person: person_uuid,
      identifiers: [{
        identifier: identifier,
        identifierType: identifierType,
        location: location,
        preferred: false
      }]
    });
    console.log(person_uuid)

    try {
      await axios(`${urlApi}patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${session_id}`
        },
        data: patientData
      })
      alert("Successfully created a patient");
    }
    catch {
      alert("Unsuccessfully");
    }

  }
  return (
    <div className="POC"><div><label className="title">CREATE PATIENT</label></div> 
    <div className="divcreate1">
      
      <div className="left">
        <span>< TextInput className='txt' labelText="GivenName"
          name="givenName"
          id="giveName"
          onChange={(e) => setgivenName(e.target.value)}
        />
          < TextInput labelText="FamilyName"
            name="familyName"
            id="familyName"
            onChange={(e) => setfamilyName(e.target.value)}
          />
        </span>
        <TextInput type="date" id="dob" placeholder="DOB" labelText="Birth date"
          name="dob"
          onChange={(e) => setDob(e.target.value)}
        ></TextInput>
        <RadioButtonGroup
          legend="Group Legend"
          name="gender"
          id="gender"
          onChange={(e) => setGender(e)}
          legendText="Gender"
        >
          <RadioButton
            labelText="Male"
            value="M"

          />
          <RadioButton
            labelText="Female"
            value="F"
          />
        </RadioButtonGroup>
        < TextInput labelText="Village"
          name="village"
          id="village"
          onChange={(e) => setVillage(e.target.value)}
        />
        < TextInput labelText="Address"
          name="address"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
        />
        < TextInput labelText="City"
          name="city"
          id="city"
          onChange={(e) => setCity(e.target.value)}
        />
        < TextInput labelText="PostalCode"
          name="postalcode"
          id="postalcode"
          onChange={(e) => setPostalcode(e.target.value)}
        />
        < TextInput labelText="Country"
          name="country"
          id="country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button className="buttonlablecreate" onClick={handleSubmit}>Generate Person</Button>
      </div>
      <div className="right"
      >
        <form>
          < TextInput labelText="Identifier"
            name="identifier"
            id="identifier"
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <Select
            defaultValue="placeholder-item"
            helperText="Optional helper text"
            id="select-1"
            invalidText="A valid value is required"
            labelText="Identifier Type"
            
          >
            <SelectItem
              text="Choose an option"
              value="placeholder-item"
            />
            
          </Select>

          < TextInput labelText="Identifier Type"
            name="identifierType"
            id="identifierType"
            onChange={(e) => setIdentifierType(e.target.value)}
          />
          < TextInput labelText="Location"
            name="location"
            id="location"
            onChange={(e) => setLocation(e.target.value)}
          />
          < TextInput labelText="Preffered"
            name="preferred"
            id="preferred"
            onChange={(e) => setPrefered(e.target.value)}
          />
          <Button className="buttonlablecreate" onClick={create_patient}>Create Patient</Button>
        </form>
      </div>
    </div></div>
  );
}

export default CreatePatient;