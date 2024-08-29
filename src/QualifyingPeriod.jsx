import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const YesNoWithDate = ({...props}) =>{
    const [showDate, setShowDate]=useState(false)

    const handleOptionChange = (e) => {
        const value = e.target.value==='yes'
        setShowDate(value);}
        


    return (
    <div>
      <label>
        <input
          type="radio"
          name="yesNoOption"
          value="yes"
          onChange={handleOptionChange}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="yesNoOption"
          value="no"
          onChange={handleOptionChange}
        />
        No
      </label>

      {showDate && <QualifyingPeriod {...props}/>
        
      }
    </div>
  );


}



//this need ot be correct to jsut block the user from adding a > 1yr date in the form
//as we did with react forms on the Emp page.

const QualifyingPeriod = ({ ...props }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const calculatePeriod = (data) => {
        const { appDate } = data;
        const applicationDate = new Date(appDate);
          props.setEarliestDate(applicationDate);
      
        }

    const onSubmit = (data) => {
        const result = calculatePeriod(data);
        alert(result);
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Have you applied for EI in the last 52 weeks?
                    <input
                        type="date"
                        name="appDate"
                        {...register("appDate", {
                            required: 'App date is required.',
                            valueAsDate: true,
                            validate: Math.ceil(Math.abs(new Date - value))/(1000*60*60*24*7)<=52  || 'Only include EI applciations within the last 52 weeks'
                        })}
                    />
                    {errors.appDate && <p>{errors.appDate.message}</p>}
                </label>
                <button type="submit">Check Eligibility</button>
            </form>
        </div>
    );
};

export default YesNoWithDate;
