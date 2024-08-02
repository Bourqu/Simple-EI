import React from "react";
import { useForm } from "react-hook-form";

const QualifyingPeriod = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    

    const calculatePeriod = (data) => {
        const { appDate } = data;
        const applicationDate = new Date(appDate);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - applicationDate);
        const diffhours = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffhours
        
    };

    const onSubmit = (data) => {
        const result = calculatePeriod(data);
        //now compare the total possible time fromt he start of qualifying period to insurable hours
        
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Have you applied for EI within the last 52 weeks? 
                    <input
                        type="date"
                        name="appDate"
                        {...register("appDate")}
                    />
                    {errors.appDate && <p>{errors.appDate.message}</p>}
                </label>
                <button type="submit">Check Eligibility</button>
            </form>
        </div>
    );
};

export default QualifyingPeriod;
