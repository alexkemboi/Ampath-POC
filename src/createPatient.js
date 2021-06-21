import './createpatient.css'
import * as React from 'react';
import { Button, TextInput, RadioButton, RadioButtonGroup, FormGroup } from 'carbon-components-react';

function CreatePatient() {
  return (
    <div className="divcreate1">
      <label className="title">CREATE PATIENT</label>
      <div className="ttl">< TextInput labelText="PATIENT NUMBER" />
        <Button className="buttonlablecreate">GENERATE</Button></div>
      <div className="divcreate2">
            < TextInput labelText="FirstName" />
          < TextInput labelText="MiddleName" />
          < TextInput labelText="LastName" />
       
          < TextInput labelText="Age" />
          < TextInput labelText="City" />
          <TextInput type="date" id="dob" placeholder="DOB" labelText="Date Of Birth"></TextInput>
          <FormGroup
            legendText="Gender"
          > 
          

            <RadioButtonGroup
              defaultSelected="default-selected"
              legend="Group Legend"
              name="radio-button-group"
              valueSelected="default-selected"
            >
              <RadioButton
                id="radio-1"
                labelText="Male"
                value="standard"
              />
              <RadioButton
                id="radio-2"
                labelText="Female"
                value="default-selected"
              />
            </RadioButtonGroup>
          </FormGroup>
        
      </div>
      <div><Button className="buttonlablecreate">SUBMIT</Button></div>
    </div>
  );
}
export default CreatePatient;