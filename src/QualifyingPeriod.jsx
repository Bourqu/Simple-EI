import React from 'react';
import { useForm } from 'react-hook-form';

const QualifyingPeriod = ({ setEarliestDate }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const calculatePeriod = (data) => {
        const { appDate } = data;
        const applicationDate = new Date(appDate);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - applicationDate);
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24*7));

        if (diffWeeks <= 52) {
            setEarliestDate(applicationDate);
            return `Not eligible for EI yet because you have applied ${diffWeeks} weeks ago. You need to accumulate more hours since ${appDate}.`;
        } else {
            setEarliestDate(currentDate);
            return 'You are eligible to apply for EI. You have 52 weeks to accumulate the required hours.';
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

export default QualifyingPeriod;
