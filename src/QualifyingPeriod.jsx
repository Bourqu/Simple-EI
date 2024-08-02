import React from "react";
import { useForm } from "react-hook-form";

const QualifyingPeriod = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const calculatePeriod = (data) => {
        const { appDate } = data;
        const applicationDate = new Date(appDate);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - applicationDate);
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));

        if (diffWeeks <= 52) {
            return 'Not eligible for EI because you have applied in the last 52 weeks.';
        } else {
            return 'You are eligible to apply for EI.';
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
                    Application Date:
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
