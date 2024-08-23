import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const YesNoWithDate = ({...props}) =>{
    const [showDate, setShowDate]=useState(false)
    const [selectedDate, setSelectedDate] = useState(false)

    const handleOptionChange = (e) => {
        const value = e.target.value==='yes'
        setShowDate(value);
        if(!value) setSelectedDate('')
    };


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





const QualifyingPeriod = ({ ...props }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const calculatePeriod = (data) => {
        const { appDate } = data;
        const applicationDate = new Date(appDate);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - applicationDate);
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24*7));

        if (diffWeeks <= 52) {
            props.setEarliestDate(applicationDate);

            //we jsut need to set this as the ealriest date and not 52 weeks here.
            console.log(props.earliestDate)

            return ` Window begins at ${props.earliestDate}.`;
        } 
        
        
        
        else {
            props.setEarliestDate(currentDate.setFullYear(currentDate.getFullYear()-1));
            console.log(props.earliestDate)
            return `Window begins at ${props.earliestDate};`
        }
    };

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
                        {...register("appDate", { required: 'Application date is required.' })}
                    />
                    {errors.appDate && <p>{errors.appDate.message}</p>}
                </label>
                <button type="submit">Check Eligibility</button>
            </form>
        </div>
    );
};

export default YesNoWithDate;
